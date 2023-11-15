// React Functions
import { useEffect, useState } from "react";
import { connect } from "react-redux";

// Components
import PageUser from "../../hocs/layouts/PageUser";
import SideBar from "../../components/users/sidebar";
// Images
import { utp_maps } from "../../helpers/users_helpers";
import PageHeading from "../../components/heros/pageHeading";
import { getUTPSubjects } from '../../api/axiosSubject';
import EditSubject from '../../components/forms/edit/editSubject';
import Portal from "../../components/core/Portal";
import CreateSubject from '../../components/forms/createSubject';
import { desactivateASubject } from '../../components/forms/delete/deleteSubject';
import { activateASubject } from '../../components/forms/activate/activateSubject';
import { PaginationWhite } from '../../components/users/pagination';


const SubjectUTP = ({ user }) => {
    const [userData, setUserData] = useState('');
    const [subjects, setSubjects] = useState([]);
    
    const [currentSubject, setCurrentSubject] = useState(null);
    const [isEditModalOpen, setEditModalOpen] = useState(false);

    const [isCreateModalOpen, setCreateModalOpen] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const subjectsPerPage = 8;

    const [searchTerm, setSearchTerm] = useState('');



  
    useEffect(() => {
        if (user) {
            setUserData(user);
            getUTPSubjects().then(response => {
                if (response.data && Array.isArray(response.data.results)) {
                    const sortedSubjects = response.data.results.sort((a, b) => b.is_active - a.is_active);
                    setSubjects(sortedSubjects);
                }
            });
        }
    }, [user]);

    const openModalEdit = (subject) => {
        setCurrentSubject(subject);
        setEditModalOpen(true);
    };
    
    const closeModalEdit = () => {
        setEditModalOpen(false);
        setCurrentSubject(null);
    };

    const openModalCreate = () => {
        setCreateModalOpen(true);
    };
    
    const closeModalCreate = () => {
        setCreateModalOpen(false);
    };

    const handleSubjectStatus = async (subject) => {
        if (subject.is_active) {
           
            const result = await desactivateASubject(subject.id_subject); 
            if (result) {
                reloadSubjects();
            }
        } else {
            
            const result = await activateASubject(subject.id_subject); 
            if (result) {
                reloadSubjects();
            }
        }
    }

    const reloadSubjects = async () => {
        try {
            const response = await getUTPSubjects();
            if (response && response.data && Array.isArray(response.data.results)) {
                const sortedSubjects = response.data.results.sort((a, b) => b.is_active - a.is_active);
                setSubjects(sortedSubjects);
            }
        } catch (error) {
            console.error('Error al obtener las asignaturas:', error);
        }
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
      };

    const filteredSubjects = subjects.filter((subject) =>
      subject.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const indexOfLastSubject = currentPage * subjectsPerPage;
    const indexOfFirstSubject = indexOfLastSubject - subjectsPerPage;
    const currentSubjects = filteredSubjects.slice(indexOfFirstSubject, indexOfLastSubject);
    const maxPages = Math.ceil(filteredSubjects.length / subjectsPerPage);
  
    return (
        <PageUser color={'bg-white text-blue'} colorInput={'bg-white text-blue'}>
    
            <SideBar color={'bg-blue'} userData={userData} useRol="UTP" mapeo={utp_maps}>
                {/* Parte Central */}
                <div className="w-full md:w-4/5 bg-fondo p-4 h-full shadow-md">
                    <div className="mx-auto max-w-7xl mt-4">
                        <PageHeading colorText={'text-grey text-center md:text-left'} colorButton={'invisible bg-admin-black'} border={'border-admin-green'} title='Asignaturas UTP' button='Activo' />

                        <div className="flex justify-end mb-4">
                            <button 
                                className="px-4 py-2 bg-blue text-white rounded transform transition-transform duration-300 hover:scale-105 hover:bg-blue-600"
                                onClick={openModalCreate}
                            >
                                Crear Asignatura
                            </button>
                        </div>
                        {/* Listado de Asignaturas */}
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
                                        <th className="px-4 py-2">Nombre de la Asignatura</th>
                                        <th className="px-4 py-2 text-center">Estado</th>
                                        <th className="px-4 py-2">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {currentSubjects.map((subject, index) => (
                                        <tr className={`border-b border-gray-300 ${index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"}`}>
                                            <td className="px-4 py-2 text-blue font-semibold">{subject.name}</td>
                                            <td className="px-4 py-2 text-blue font-semibold text-center">{subject.is_active ? "Activo" : "Inactivo"}</td>
                                            <td className="px-4 py-2">
                                                <div className="flex justify-center space-x-2">
                                                    <button 
                                                        className="px-3 py-1 bg-blue text-white rounded hover:bg-blue-600"
                                                        onClick={() => openModalEdit(subject)}
                                                    >
                                                        Editar
                                                    </button>
                                                    <button 
                                                        className={`px-3 py-1 text-white rounded ${subject.is_active ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`}
                                                        onClick={() => handleSubjectStatus(subject)}
                                                        style={{ minWidth: '75px' }}
                                                    >
                                                        {subject.is_active ? 'Desactivar' : 'Activar'}
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
                <p className="text-blue text-xl font-bold text-center">Editar Asignatura</p>
                </div>
                <EditSubject 
                    onClose={closeModalEdit} 
                    subjectData={currentSubject} 
                    subject={currentSubject}      
                    reloadSubjects={reloadSubjects}  
                />
            </div>
            </Portal>
            <Portal open={isCreateModalOpen} onClose={closeModalCreate}>
                <div className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle transition-all transform duration-300 ease-in-out">
                    <div className="w-full mb-3">
                        <p className="text-blue text-xl font-bold text-center">Crear Asignatura</p>
                    </div>
                    <CreateSubject 
                        onClose={closeModalCreate}     
                        reloadSubjects={reloadSubjects}
                        school={userData.school}  
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
  export default connect(mapStateToProps, {})(SubjectUTP);
