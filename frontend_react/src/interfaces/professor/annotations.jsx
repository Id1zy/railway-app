import { useEffect, useState } from "react";
import { ChevronUpIcon, ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { connect } from "react-redux";
import PageUser from "../../hocs/layouts/PageUser";
import SideBar from "../../components/users/sidebar";
import PageHeading from "../../components/heros/pageHeading";
import { Disclosure } from '@headlessui/react';
import { Card, Typography } from "@material-tailwind/react";
import { getObsFilteredBySection } from "../../api/axiosObservations";
import { profesor_maps } from "../../helpers/users_helpers";
import EditAnnotation from "../../components/forms/edit/editAnnotations";
import Portal from "../../components/core/Portal";
import { desactivateAnnotation } from "../../components/forms/delete/deleteAnnotations";
import CreateObservation from "../../components/forms/createObservation";
import { useParams } from "react-router-dom";
import { PaginationWhite } from "../../components/users/pagination";

const Annotations = ({ user }) => {
    const [observations, setObservations] = useState([]);
    const [isOpenEdit, setIsOpenEdit] = useState(false);
    const [currentObservation, setCurrentObservation] = useState(null);
    const [isOpenArray, setIsOpenArray] = useState([]);
    const [update, setUpdate] = useState(0);
    const [count, setCount] = useState(0);
    const [openDisclosures, setOpenDisclosures] = useState([]);
    const [isOpenCreate, setIsOpenCreate] = useState(false);
    const [selectedStudentData, setSelectedStudentData] = useState(null);
    const [color, setColor] = useState(
        window.localStorage.getItem("color"));

    // Pagination states
    const [page, setPage] = useState(1);
    const [forPage, setForPage] = useState(7);
    const max = observations.students?.map((item) => item).length / forPage;

    const params = useParams();


    

    const fetchObservations = async () => {
        try {
            const response = await getObsFilteredBySection(params.sid);
            if (response && response.data && Array.isArray(response.data)) {
                setObservations(response.data);
                setIsOpenArray(Array(response.data.length).fill(false));
            }
        } catch (error) {
            console.error('Error al obtener las observaciones:', error);
        }
    };

    useEffect(() => {
        fetchObservations();
    }, [update]);

    const reloadObservations = async () => {
        try {
            const response = await getObsFilteredBySection(params.sid);
            if (response && response.data && Array.isArray(response.data)) {
                setObservations(response.data);
                
            }
        } catch (error) {
            console.error('Error al obtener las observaciones:', error);
        }
    };

    
    const openModalEdit = (observation) => {
        console.log(observation);
        setCurrentObservation(observation);
        setIsOpenEdit(true);
    };

    const closeModalEdit = () => {
        setIsOpenEdit(false);
        fetchObservations();  
    };
  
    const closeModal = (index) => {
        const updatedIsOpenArray = [...isOpenArray];
        updatedIsOpenArray[index] = false;
        setIsOpenArray(updatedIsOpenArray);
    };

    const openModalCreate = (studentData, sectionName, sectionSchedule) => {
        setSelectedStudentData({
            ...studentData,
            sectionName: sectionName,
            sectionSchedule: sectionSchedule
        });
        setIsOpenCreate(true);
    };
    

    const toggleDisclosure = (studentRut) => {
        setOpenDisclosures(prev => {
            if (prev.includes(studentRut)) {
                return prev.filter(rut => rut !== studentRut);
            } else {
                return [...prev, studentRut];
            }
        });
    };
    
    const handleToggleAnnotation = async (id, index) => {
        try {
            await desactivateAnnotation(id);
            fetchObservations();  
        } catch (e) {
            console.error("Error al actualizar la anotación:", e);
        }
    };

    const handleStudentClick = (student, sectionName) => {
        setSelectedStudentData({
            ...student,
            sectionName: sectionName
        });
    }

    const Style = {
        colorSchool :  `bg-new-`+color,
        textSchool: `text-new-`+color,
        hoverSchool: `bg-new-h`+color,
        borderSchool: `border-new-`+color,
        buttonSchool: `bg-new-`+color+' hover:bg-new-h'+color,
      }

    return (
<>
<PageUser color={`bg-white text-new-${color}`} colorInput={`bg-white text-new-${color}`}>

<SideBar color={`${Style.colorSchool}`}  useRol="Profesor" mapeo={profesor_maps}>
        <div className={`w-full md:w-4/5 bg-fondo p-4 h-full shadow-md overflow-y-auto`}>
        <div className=''>
    <div className={`flex content-center items-center justify-between mx-2 my-6 border-b-4 pb-4 border-new-${color}`}>
    <div className="flex items-center">
        </div>
      <div className="min-w-0 flex-1">
        <h2 className={`text-xl2 sm:text-xl3 text-center font-bold leading-7 ${Style.textSchool} `}>
          Anotaciones
        </h2>
      </div>
    </div>
</div>
<ul>
        {observations.slice((page-1)*forPage, (page-1)*forPage+forPage).map((section) => (
            <li className={`p-2`}>
            {section.students.map(studentEntry => (
                <div key={studentEntry.student_rut} className={`mt-4`}>
                <Disclosure defaultOpen={openDisclosures.includes(studentEntry.student_rut)}>
                    {({ open }) => (
                        <>
                        <div className={`flex items-center justify-between`}>
                        <Disclosure.Button onClick={() => toggleDisclosure(studentEntry.student_rut)} className={`flex-grow w-full flex justify-between rounded-lg bg-white px-4 py-2 mt-2  shadow-tech-outer hover:cursor-pointer transition ease-in-out delay-150 ${Style.hoverSchool} hover:-translate-y-1 hover:scale-102 duration-300`}>
                            <div className={`flex flex-col p-2`}>
                                <div className={`bg-new-green rounded-md px-2 py-1 mb-2`}>
                                    <p className={`text-white font-bold text-left`}> Estudiante: {studentEntry.student_name} </p>
                                </div>
                                <div className={`bg-new-green rounded-md px-2  py-1`}>
                                    <p className={`text-white font-bold text-left`}> R.U.T: {studentEntry.student_rut} </p>
                                </div>
                            </div>
                                {open ? <ChevronUpIcon className={`h-5 w-5 ${Style.textSchool}`} /> : <ChevronDownIcon className={`h-5 w-5 ${Style.textSchool}`} />}
                                </Disclosure.Button>
                                <button 
                                    onClick={() => {
                                        openModalCreate(studentEntry, section.name, section.schedules);
                                    }}
                                    className={`ml-4 bg-new-green hover:bg-admin-green text-white font-medium px-4 py-2 rounded-lg transition duration-300`}>
                                    Crear
                                </button>
                            </div>
                                                    <Disclosure.Panel className={`mt-2 px-4 py-2 bg-white text-sm  rounded-md shadow-tech-outer w-full`}>
                                                        <Card className={`w-full text-white shadow-tech-outer rounded-full`}>
                                                            <table className={`w-full table-auto text-center rounded-full`}>
                                                                <thead className={`${Style.colorSchool} rounded-full`}>
                                                                    <tr>
                                                                        <th className={`border-b border-white p-4`}>
                                                                            <Typography variant={`small`} className={`leading-none text-white font-bold`}>Horario</Typography>
                                                                        </th>
                                                                        <th className={`border-b border-white p-4`}>
                                                                            <Typography variant={`small`} className={` leading-none text-white font-bold`}>Observación</Typography>
                                                                        </th>
                                                                        <th className={`border-b border-white p-4`}>
                                                                            <Typography variant={`small`} className={` leading-none text-white font-bold`}>Positivo/Negativo</Typography>
                                                                        </th>
                                                                        <th className={`border-b border-white p-4`}>
                                                                            <Typography variant={`small`} className={` leading-none text-white font-bold`}>Editar/Desactivar</Typography>
                                                                        </th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody className={`bg-white`}>
                                                                    {studentEntry.observations.map((observation, profesor) => (
                                                                        <tr key={profesor}>
                                                                            <td className={`p-4 border-b ${Style.borderSchool}`}>
                                                                                <Typography variant={`small`} color={`black`} className={`font-medium`}>
                                                                                    {observation.schedule_details.day_of_week} de {observation.schedule_details.start_time_block}-{observation.schedule_details.end_time_block}
                                                                                </Typography>
                                                                            </td>
                                                                            <td className={`p-4 border-b ${Style.borderSchool}`}>
                                                                                <Typography variant={`small`} color={`black`} className={`font-medium`}>
                                                                                    {observation.description}
                                                                                </Typography>
                                                                            </td>
                                                                            <td className={`p-4 border-b ${Style.borderSchool}`}>
                                                                                <Typography variant={`small`} color={`black`} className={`font-medium`}>
                                                                                    {observation.type_observation}
                                                                                </Typography>
                                                                            </td>
                                                                            <td className={`p-4 border-b ${Style.borderSchool}`}>
                                                                                <button className={`px-2 py-1 ${Style.hoverSchool} text-white rounded-lg hover:bg-indigo-500 focus:outline-none mr-2`} onClick={() => openModalEdit(observation)}>
                                                                                    Editar
                                                                                </button>
                                                                                <button 
                                                                                    className={`px-2 py-1 ${observation.is_active ? 'bg-red-500' : 'bg-green-500'} text-white rounded-lg hover:bg-red-600 focus:outline-none`} 
                                                                                    onClick={() => handleToggleAnnotation(observation.id_observation, profesor)}
                                                                                >
                                                                                    {observation.is_active ? 'Desactivar' : 'Activar'}
                                                                                </button>
                                                                            </td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                            </table>
                                                        </Card>
                                                    </Disclosure.Panel>
                                                </>
                                            )}
                                        </Disclosure>
                                    </div>
                                ))}
            </li>
        ))}
            </ul>
            <PaginationWhite page={page} setPage={(n) => setPage(n)} max={max}/>
        </div>

    </SideBar>
    <Portal open={isOpenEdit} onClose={closeModalEdit}>
        <div className={`w-full max-w-md  overflow-hidden rounded-2xl bg-white p-6 text-left align-middle transition-all transform duration-300 ease-in-out`}>
            <div className={`w-full mb-3`}>
                <p className={`${Style.textSchool} text-xl font-bold text-center`}>Editar Anotación</p>
            </div>
            <EditAnnotation 
                onClose={closeModalEdit} 
                observation={currentObservation}
                reloadObservations={reloadObservations}
            />
        </div>
    </Portal>
    <Portal open={isOpenCreate} onClose={() => setIsOpenCreate(false)}>
        <div className={`w-full max-w-md  overflow-hidden rounded-2xl bg-white p-6 text-left align-middle transition-all transform duration-300 ease-in-out`}>
            <div className={`w-full mb-3`}>
                <p className={`${Style.textSchool} text-xl font-bold text-center`}>Crear Anotación</p>
            </div>
            <CreateObservation 
                onClose={() => setIsOpenCreate(false)} 
                studentData={selectedStudentData}
                reloadObservations={reloadObservations}
            />
        </div>
    </Portal>
</PageUser>


</>
    );
}

const mapStateToProps = state => ({
    isAuthenticated: state.Auth.isAuthenticated,
    user: state.Auth.user
});

export default connect(mapStateToProps)(Annotations);
