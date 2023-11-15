// React's imports
import { useState, useEffect, createContext} from "react";
import { useParams } from "react-router-dom";
import React from "react";
// Redux's imports
import { connect } from "react-redux";
//Components
import PageUser from "../../hocs/layouts/PageUser";
import SideBar from "../../components/users/sidebar";
import PageHeading from "../../components/heros/pageHeading";
import CreateFormStudentGrade from "../../components/forms/create/createStudentGrade";
import AttendanceSummary from "./AttendanceSummary";
import ProfessorsSchedule from "./ProfessorsSchedule";
import { TabsCustomAnimationWhite } from "../../components/tabsWhite";
import { ProfessorRoutes } from "../../helpers/users_routes";
import { profesor_maps } from "../../helpers/users_helpers";
import { getDetailSection } from "../../api/axiosSection";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const AttendanceMain = () => {
    const [users, setUsers] = useState([]);
    const [section, setSection] = useState({});
    const [grades, setGrades] = useState([]);
    const [students, setStudents] = useState([]);
    const [update, setUpdate] = useState(0);

    const params = useParams();


  useEffect(() => {

    const detailsSection = async () => {
        try{
            const res = await getDetailSection(params.sid);
            setSection(res.data.results[0]);
        } catch(err){ 
            return err;
        }
    }
    detailsSection();
    return setUpdate(0);
  }, [update]);


    return(
      <>

        <PageUser color={'bg-white text-blue'} colorInput={'bg-fondo text-blue placeholder-blue'}>
          <SideBar  color={'bg-blue'} colorSecond={'deep-blue'} useRol={'Profesor'} mapeo={profesor_maps}>
            {/* Parte Central */}
            <div className="w-full md:w-4/5 bg-fondo p-4 h-full overflow-y-auto">    
            <div className="mx-auto max-w-7xl mt-4">
            <div className="gap-4 mb-5">


            <div className=''>
    <div className='flex content-center items-center justify-between mx-2 my-6 border-b-4 pb-4 border-blue'>
    <div className="flex items-center">
            <Link to={ProfessorRoutes.Subject}><ArrowLeftIcon className="h-6 w-6 text-blue hover:text-white hover:rounded-full hover:bg-blue"/></Link>

        </div>
      <div className="min-w-0 flex-1">
        <h2 className='text-xl2 sm:text-xl3 text-center font-bold leading-7 text-blue '>
        {section.name ? `Asistencia - Asignatura ${section.name}`  : <><span className="animate-pulse">Cargando...</span></>}
        </h2>
      </div>
      <div className="flex lg:ml-4 lg:mt-0">
        <span className="">
        </span>
      </div>
    </div>
    </div>
    
            <ProfessorsSchedule section={params.sid}/>
               
            </div>
            </div>
            </div>


          </SideBar>

   </PageUser>
   </>
    )
}


const mapStateToProps = state => ({
  });
  export default connect(mapStateToProps,{
  })(AttendanceMain);