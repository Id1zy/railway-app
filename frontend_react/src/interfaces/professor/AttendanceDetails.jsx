// React's imports
import { useState, useEffect, createContext} from "react";
import { useParams } from "react-router-dom";
import React from "react";

//Components
import PageUser from "../../hocs/layouts/PageUser";
import SideBar from "../../components/users/sidebar";
import PageHeading from "../../components/heros/pageHeading";
import AttendanceSummary from "./AttendanceSummary";
import AttendanceQuery from "./AttendanceQuery";
import CreateAttendance from "../../components/forms/create/createStudentAttendance";
import { Link } from "react-router-dom";
import { ProfessorRoutes } from "../../helpers/users_routes";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { TabsCustomAnimationWhite } from "../../components/tabsWhite";
import Portal from "../../components/core/Portal";

import { profesor_maps } from "../../helpers/users_helpers";
// Functionalities
import {getDetailSection} from "../../api/axiosSection";






export default function AttendanceDetails() {
    const [section, setSection] = useState({});
    const [update, setUpdate] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    
    const params = useParams();

    const openModal = () => {
      setIsOpen(true)
    };
  
    const closeModal = () => {
      setIsOpen(false)
    };


  useEffect(() => {
    const getSection = async () => {
      try{
        const res = await getDetailSection(params.sid);
        if(res.data && res.data.results){
          setSection(res.data.results[0])
        }
      } catch(err){
        return err;

      }    
    }

    getSection();
    return setUpdate(0);
  }, [update]);

  

    const data = [
        {
          label: "Resumen",
          value: "Read",
          desc:
          <>
             <AttendanceSummary section_id={params.sid} schedule_id={params.schid} update={() => setUpdate(update+1)}/>
          </>


        },
        {
          label: "Consultar asistencia",
          value: "Detail",
          desc: 
          <>
            <AttendanceQuery section_id={params.sid} schedule_id={params.schid} update={() => setUpdate(update+1)}/>
          </>,
        },
 
      ];

    return(
      <>

        <PageUser color={'bg-fondo text-blue'} colorInput={'bg-fondo text-blue placeholder-blue'}>
          <SideBar  color={'bg-blue'} colorSecond={'deep-blue'} useRol={'Profesor'} mapeo={profesor_maps}>
            {/* Parte Central */}
            <div className="w-full md:w-4/5 bg-fondo p-4 h-full overflow-y-auto">    
            <div className="mx-auto max-w-7xl mt-4">
            <div className="gap-4 mb-5">

    
            <div className=''>
    <div className='flex content-center items-center justify-between mx-2 my-6 border-b-4 pb-4 border-blue'>
    <div className="flex items-center">
            <Link to={ProfessorRoutes.Attendance.replace(":sid", params.sid)}><ArrowLeftIcon className="h-6 w-6 text-blue hover:text-white hover:rounded-full hover:bg-blue"/></Link>

        </div>
      <div className="min-w-0 flex-1">
        <h2 className='text-xl2 sm:text-xl3 text-center font-bold leading-7 text-blue '>
        {section.name ? `Detalles de Asistencia - ${section.name}`  : <><span className="animate-pulse">Cargando...</span></>}
        </h2>
      </div>
      <div className="flex lg:ml-4 lg:mt-0">
        <span className="">
        <button type="button" onClick={()=>{openModal()}} className='bg-blue button_tech_colorless hover:bg-light-blue'>
            Pasar Asistencia
          </button>
          
        </span>
      </div>
    </div>
    </div>

 

          <TabsCustomAnimationWhite data={data}/>
               
            </div>
            </div>
            </div>

            <Portal open={isOpen} onClose={() => closeModal()}>
            <CreateAttendance section_id={params.sid} schedule_id={params.schid} update={()=>setUpdate(update+1)} onClose={() => closeModal()}/>
          </Portal>


          </SideBar>

   </PageUser>
   </>
    )
}