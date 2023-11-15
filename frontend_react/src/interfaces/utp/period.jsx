import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getAcademicPeriods } from "../../api/axiosPeriod";

// Componentes y Funciones
import PageUser from "../../hocs/layouts/PageUser";
import SideBar from "../../components/users/sidebar";
import { utp_maps } from "../../helpers/users_helpers";
import { PaginationWhite } from "../../components/users/pagination";
import PageHeading from "../../components/heros/pageHeading";
import Portal from "../../components/core/Portal";
import CreateAcademicPeriod from "../../components/forms/createPeriod";
import EditAcademicPeriod from "../../components/forms/edit/editPeriod";
import DeleteAcademicPeriod from "../../components/forms/delete/deletePeriod";


const AcademicPeriodUTP = ({ user }) => {
    const [userData, setUserData] = useState('');
    const [periods, setPeriods] = useState([]);

    const [currentPeriod, setCurrentPeriod] = useState(null);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [isCreateModalOpen, setCreateModalOpen] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const periodsPerPage = 8;
    const [searchTerm, setSearchTerm] = useState('');
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

    useEffect(() => {
        if (user) {
            setUserData(user);
            getAcademicPeriods().then(response => {
                if (response.data && Array.isArray(response.data.results)) {
                    setPeriods(response.data.results);
                }
            });
        }
    }, [user]);

    const openModalEdit = (period) => {
        setCurrentPeriod(period);
        setEditModalOpen(true);
    };

    const closeModalEdit = () => {
        setEditModalOpen(false);
        setCurrentPeriod(null);
    };

    const openModalCreate = () => {
        setCreateModalOpen(true);
    };

    const closeModalCreate = () => {
        setCreateModalOpen(false);
    };

    const openModalDelete = (period) => {
        setCurrentPeriod(period);
        setDeleteModalOpen(true);
    };
    
    const closeModalDelete = () => {
        setDeleteModalOpen(false);
        setCurrentPeriod(null);
    };


    const reloadPeriods = async () => {
        try {
            const response = await getAcademicPeriods();
            if (response && response.data && Array.isArray(response.data.results)) {
                setPeriods(response.data.results);
            }
        } catch (error) {
            console.error('Error al obtener los periodos académicos:', error);
        }
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredPeriods = periods.filter((period) =>
        period.period_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const indexOfLastPeriod = currentPage * periodsPerPage;
    const indexOfFirstPeriod = indexOfLastPeriod - periodsPerPage;
    const currentPeriods = filteredPeriods.slice(indexOfFirstPeriod, indexOfLastPeriod);
    const maxPages = Math.ceil(filteredPeriods.length / periodsPerPage);

    return (
        <PageUser color={'bg-white text-blue'} colorInput={'bg-white text-blue'}>
            <SideBar color={'bg-blue'} userData={userData} useRol="UTP" mapeo={utp_maps}>
                <div className="w-full md:w-4/5 bg-fondo p-4 h-full shadow-md">
                    <div className="mx-auto max-w-7xl mt-4">
                        <PageHeading colorText={'text-grey text-center md:text-left'} colorButton={'invisible bg-admin-black'} border={'border-admin-green'} title='Periodos Académicos UTP' />

                        <div className="flex justify-end mb-4">
                            <button 
                                className="px-4 py-2 bg-blue text-white rounded transform transition-transform duration-300 hover:scale-105 hover:bg-blue-600"
                                onClick={openModalCreate}
                            >
                                Crear Periodo
                            </button>
                        </div>

                        <div className="bg-white border-l-[10px] border-blue rounded-[20px] p-3 shadow-md">
                            <div className="flex justify-center mb-4">
                                <input
                                    type="text"
                                    placeholder="Buscar por nombre"
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                    className="p-2 border-2 border-blue rounded-full focus:outline-none focus:ring-2 focus:ring-blue focus:border-transparent"
                                    style={{ maxWidth: "300px" }}
                                />
                                </div>
                                    <table className="w-full table-auto">
                                    <thead>
                                        <tr className="bg-blue text-white">
                                            <th className="px-4 py-2 text-center">ID</th>
                                            <th className="px-4 py-2 text-center">Nombre del Periodo</th>
                                            <th className="px-4 py-2 text-center">Fecha de Inicio</th>
                                            <th className="px-4 py-2 text-center">Fecha de Fin</th>
                                            <th className="px-4 py-2 text-center">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentPeriods.map((period, index) => (
                                            <tr className={`border-b border-gray-300 ${index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"}`}>
                                                <td className="px-4 py-2 text-center text-blue font-semibold">{period.id}</td>
                                                <td className="px-4 py-2 text-center text-blue font-semibold">{period.period_name}</td>
                                                <td className="px-4 py-2 text-center text-blue font-semibold">{period.start_time_period}</td>
                                                <td className="px-4 py-2 text-center text-blue font-semibold">{period.end_time_period}</td>
                                                <td className="px-4 py-2 text-center text-blue font-semibold">
                                                <div className="flex justify-center space-x-2">
                                                    <button 
                                                        className="px-3 py-1 bg-blue text-white rounded hover:bg-blue-600"
                                                        onClick={() => openModalEdit(period)}
                                                    >
                                                        Editar
                                                    </button>
                                                    <button 
                                                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                                        onClick={() => openModalDelete(period)}
                                                    >
                                                        Eliminar
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <PaginationWhite page={currentPage} setPage={setCurrentPage} max={maxPages} />
                        </div>
                    </div>
                </div>
            </SideBar>
            
            <Portal open={isEditModalOpen} onClose={closeModalEdit}>
            <div className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle transition-all transform duration-300 ease-in-out">
            <div className="w-full mb-3">
                <p className="text-blue text-xl font-bold text-center">Editar Periodo</p>
                </div>
                <EditAcademicPeriod 
                    onClose={closeModalEdit} 
                    periodData={currentPeriod}
                    reloadPeriods={reloadPeriods}  
                />
                </div>
            </Portal>
            <Portal open={isCreateModalOpen} onClose={closeModalCreate}>
            <div className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle transition-all transform duration-300 ease-in-out">
                    <div className="w-full mb-3">
                        <p className="text-blue text-xl font-bold text-center">Crear Periodo</p>
                    </div>
                <CreateAcademicPeriod 
                    onClose={closeModalCreate}     
                    reloadPeriods={reloadPeriods}
                />
                </div>
            </Portal>
            <Portal open={isDeleteModalOpen} onClose={closeModalDelete}>
                <div className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle transition-all transform duration-300 ease-in-out">
                    <div className="w-full mb-3">
                        <p className="text-blue text-xl font-bold text-center">Eliminar Periodo</p>
                    </div>
                    <DeleteAcademicPeriod 
                        onClose={closeModalDelete} 
                        periodToDelete={currentPeriod}
                        reloadPeriods={reloadPeriods}
                    />
                </div>
            </Portal>
        </PageUser>
    );
}

const mapStateToProps = state => ({
    isAuthenticated: state.Auth.isAuthenticated,
    user: state.Auth.user
});

export default connect(mapStateToProps, {})(AcademicPeriodUTP);
