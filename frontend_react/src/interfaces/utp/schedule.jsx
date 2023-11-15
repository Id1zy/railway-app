import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { utp_maps } from "../../helpers/users_helpers";
import { getSchedule, desactivateSchedule } from "../../api/axiosSchedule";
import PageUser from "../../hocs/layouts/PageUser";
import SideBar from "../../components/users/sidebar";
import EditScheduleForm from "../../components/heros/EditScheduleForm";
import CreateScheduleForm from "../../components/heros/scheduleCreateForm";
import DesactivateScheduleForm from "../../components/heros/DesactivateScheduleForm";
import { getListSection } from "../../api/axiosSchedule"
import { Disclosure } from '@headlessui/react'
import { Card } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import "./ScheduleList.css";
import { UTPRoutes } from "../../helpers/users_routes";
import { PaginationWhite } from "../../components/users/pagination";

const CreateSchedule = () => {
  const [schedules, setSchedules] = useState([]);
  const [activeSchedules, setActiveSchedules] = useState([]);
  const [inactiveSchedules, setInactiveSchedules] = useState([]);
  const [userData, setUserData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editedSchedule, setEditedSchedule] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [scheduleToDelete, setScheduleToDelete] = useState(null);
  const [section_, setSection] = useState([]);
  const [page, setPage] = useState(1);
  const [forPage, setForPage] = useState(6);
  const max = section_.length / forPage
  const [searchTerm, setSearchTerm] = useState('');

  const handleDesactivate = (schedule) => {
    setScheduleToDelete(schedule);
    setIsDeleteModalOpen(true);
  };

  const handleDesactivateComplete = (scheduleId) => {
    const updatedActiveSchedules = activeSchedules.filter(schedule => schedule.id !== scheduleId);
    const desactivatedSchedule = activeSchedules.find(schedule => schedule.id === scheduleId);
    setInactiveSchedules([...inactiveSchedules, desactivatedSchedule]);
    setActiveSchedules(updatedActiveSchedules);
  };

  const handleActivate = (scheduleId) => {
    const updatedInactiveSchedules = inactiveSchedules.filter(schedule => schedule.id !== scheduleId);
    const activatedSchedule = inactiveSchedules.find(schedule => schedule.id === scheduleId);
    setActiveSchedules([...activeSchedules, activatedSchedule]);
    setInactiveSchedules(updatedInactiveSchedules);
  };

  const handleDelete = async (scheduleId) => {
    try {
      await desactivateSchedule(scheduleId);
      console.log('Horario desactivado con éxito');

      setIsDeleteModalOpen(false);
      setRefresh(!refresh);
    } catch (error) {
      console.error('Error al desactivar el horario:', error);
    }
  };

  const handleEdit = (schedule) => {
    setEditModalOpen(true);
    setEditedSchedule(schedule);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
};

  useEffect(() => {
    loadSchedule();
    const loadSection = async () =>{
      try{
        const res = await getListSection();
        setSection(res.data);
      }catch(e){
        console.log(e);
      }
    }
    loadSection();
  }, [refresh]);

  const openModal = () => {
    setIsModalOpen(true);
    // Trigger refresh when the modal is opened
    setRefresh(!refresh);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    // Trigger refresh when the modal is closed
    setRefresh(!refresh);
  };

  useEffect(() => {
    openModal();
  }, []);

  const handleEditSubmit = async (editedData) => {
    // Perform your API edit here

    // After a successful edit, close modal and trigger refresh
    setEditModalOpen(false);
    setRefresh(!refresh);
  };

  const filteredSections = section_.filter((item) => 
    item.Course.nivel.toLowerCase().includes(searchTerm) ||
    item.Section.some(section => section.professor.toLowerCase().includes(searchTerm))
  );

  const loadSchedule = async () => {
    try {
      const response = await getSchedule();
      if (response && response.data && Array.isArray(response.data.results)) {
        const allSchedules = response.data.results;
        const activeSchedules = allSchedules.filter(schedule => schedule.is_active);
        const inactiveSchedules = allSchedules.filter(schedule => !schedule.is_active);

        setSchedules(allSchedules);
        setActiveSchedules(activeSchedules);
        setInactiveSchedules(inactiveSchedules);
      } else {
      }
    } catch (error) {
      console.error('Error al cargar los horarios:', error);
    }
  };

  const getSortedDays = () => ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

  const mapNumberToDay = (number) => {
    const dayMapping = {
      1: "Lunes",
      2: "Martes",
      3: "Miércoles",
      4: "Jueves",
      5: "Viernes",
      6: "Sábado",
      7: "Domingo",
    };
    return dayMapping[number];
  };

  return (
    <PageUser color={'bg-white text-blue'} colorInput={'bg-white text-blue'}>
      <SideBar color={'bg-blue'} userData={userData} useRol="UTP" mapeo={utp_maps}>
      <div className="w-full md:w-4/5 bg-fondo p-4 h-full shadow-md overflow-y-auto"> 
            <div className=''>
    <div className='flex content-center items-center justify-between mx-2 my-6 border-b-4 pb-4 border-admin-green'>            

      <div className="min-w-0 flex-1">
        <h2 className='text-xl2 sm:text-xl3 text-center font-bold leading-7 text-blue '>
          Horarios
        </h2>
      </div>
    </div>
    </div>

{filteredSections.length > 0 ?<></>:<>No Hay Horarios.</>}
<div className="flex justify-center mb-6">
                <input
                    type="text"
                    placeholder="Buscar por nombre o profesor"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="p-2 border-2 border-blue rounded-full focus:outline-none focus:ring-2 focus:ring-blue focus:border-transparent w-full sm:w-1/2 lg:w-1/6"
                    style={{ maxWidth: "300px" }}
                />
            </div>

{filteredSections.slice((page-1)*forPage, (page-1)*forPage+forPage).map((item) => (
  
<>

   <Disclosure>
   {({ open }) => (
     <>
     <Disclosure.Button className="w-full mb-2" >
     <div className='bg-white border-l-[10px] border-blue rounded-[20px] p-3 shadow-md sm:grid-cols-2'>
<div className="grid grid-cols-span-1 sm:grid-cols-2 gap-4 text-left">
<div className='flex text-left pl-1'>
<p className='text-xl text-blue font-bold'>{item.Course.nivel}</p>
</div>

</div>
</div>

     </Disclosure.Button>

       <Disclosure.Panel className="px-2 pt-2 pb-4 text-sm text-gray-500">
         <Card className="w-full p-3  border-l-[10px] border-blue "> 

           {item.Section.map((item)=>(

             <div
                 className="w-full flex flex-col md:flex-row space-y-5 md:space-y-0 rounded-xl shadow-lg  mx-auto border border-white bg-white">

                   <div className="w-full bg-white flex flex-col p-1">
                     <div className="flex justify-between item-center">
                     <div className="inline-flex gap-2">
                   
                         <div className="bg-new-green px-3 py-1 rounded-md font-bold ">
                         <p className="text-white">{item.subject}</p>
                         </div>
                     </div>
                       <div className="inline-flex gap-2">
                       
                      <div className="bg-new-green px-3 py-1 rounded-full text-xs font-medium">
                         <p className="text-white">{item.period}</p>
                         </div>
                         <div className="bg-new-green2 px-3 py-1 rounded-full text-xs font-medium ">
                         <p className="text-white">Activo</p>
                         </div>
                     </div>
                       </div>
             
                      <div>
                        <div className="flex justify-between mt-2 mb-1">
                          <div>
                            <div className="bg-blue  rounded-md px-3 py-1 mb-1">
                          <h3 className="font-black text-white md:text-3xl text-xl">Sección: {item.name}</h3>
                          </div>
                          <div className="bg-blue   rounded-md px-3 py-1">
                          <p className="md:text-lg text-white text-base">Profesor: {item.professor}</p>
                          </div>
                     
                          </div>
                          <div className=" flex items-end">           
    <Link to={UTPRoutes.CreateSchedule.replace(':uid', item.id)}
    class="inline-block bg-blue hover:bg-new-dark-blue  !rounded-md button_tech_colorless mr-2">Asignar Bloque</Link>
    <Link to={UTPRoutes.ViewSchedule.replace(':uid', item.id)}
    class="inline-block bg-new-green hover:bg-new-dark-green  !rounded-md  button_tech_colorless">Ver Bloques</Link>
  </div>
                        </div>
                      </div>
  
                     
                   </div>
                 </div>
        
           ))}

        
         </Card>
       </Disclosure.Panel>
       </>
    
   )}
 </Disclosure>
</>
))}

   <PaginationWhite page={page} setPage={(n)=>setPage(n)} max={max} />






    </div>
   
      </SideBar>
    </PageUser>
  );
};

const CalendarItem = ({ schedule, onEdit, onDesactivate, onActivate }) => (
  <div className="calendar-item">
    <div className="id">Id de Horario: {schedule.schedule_id} </div>
    <div className="time">Hora de Inicio: {`${schedule.start_time_block} - Hora de Término: ${schedule.end_time_block}`}</div>
    <div className="section">Sección: {schedule.section}</div>
    <div className="actions">
      <button className="edit-button" onClick={() => onEdit(schedule)}>Editar</button>
      {onDesactivate && <button className="delete-button" onClick={() => onDesactivate(schedule)}>Desactivar</button>}

    </div>
  </div>
);

export default CreateSchedule;
