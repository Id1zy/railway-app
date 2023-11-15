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
import StudentGrades from "./StudentGrades";
import { Link } from "react-router-dom";
import { ProfessorRoutes } from "../../helpers/users_routes";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Portal from "../../components/core/Portal";
// Tabs Tailwind Components

// Helpers
import { profesor_maps } from "../../helpers/users_helpers";
// Functionalities
import { get_users } from "../../api/axiosUsers";
import {getDetailSection} from "../../api/axiosSection";
import {createStudentGrade} from "../../api/axiosStudentGrades";
import {getStudentGradesForProfessor} from "../../api/axiosStudentGrades";
import {getStudentsOfSection} from "../../api/axiosStudentSection";
import { TabsCustomAnimationWhite } from "../../components/tabsWhite";
import {saveAs} from 'file-saver';
import { downloadStudentTemplate, uploadGradesStudent} from "../../api/axiosStudentGrades";
import toast from "react-hot-toast";
import { Card } from "@material-tailwind/react";


const GradesMain = () => {
    const [users, setUsers] = useState([]);
    const [section, setSection] = useState({});
    const [grades, setGrades] = useState([]);
    const [students, setStudents] = useState([]);
    const [update, setUpdate] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [file, setFile] = useState();

    const params = useParams();

    const openModal = () => {
      setIsOpen(true)
    };
  
    const closeModal = () => {
      setIsOpen(false)
    };



  useEffect(() => {
    async function loadSection(){
        try{
            const res = await getDetailSection(params.uid);
            if(res.data && res.data.results){
                setSection(res.data.results[0]);
            }
        } catch(err){
            return err;
        }
    }


    async function loadUsers() {
      try {
        const res = await get_users();
        if (res && res.data) {
          setUsers(res.data.results); 

        }
      } catch (error) {
        console.error('Error al cargar los usuarios:', error);
      }
    }

    async function grades () {
      try {
          const res = await getStudentGradesForProfessor(params.uid);
          if (res && res.data) {
              setGrades(res.data.results);
            }
      } catch(err){
          return err;
      }
    }

    async function StudentsOfSection() {
      try{
        const res = await getStudentsOfSection(params.uid);
        if(res.data && res.data.results){
          setStudents(res.data.results);
        }
      } catch(err){
        return err;
      }
    }

    grades();
    StudentsOfSection();
    loadUsers();
    loadSection();
    
  }, [update]);
  const fileSelectedHandler = (e) =>{
    e.preventDefault();
    const file = e.target.files[0];
    setFile(file);
}

  const handleDownload = async () =>{
    try{
      const res = await downloadStudentTemplate(params.uid);
      if(res.status == 200){
        toast.success('Ha comenzado la descarga.');
        return saveAs(res.data, 'Plantilla_Notas_Estudiante.xls');
      }else{
        return toast.error('No se ha podido iniciar la descarga');
      }
      
    }catch(e){toast.error('No se ha podido iniciar la descarga');}
  }

  const postFile = (e) =>{
    e.preventDefault();
    try{
      uploadGradesStudent(file, params.uid);
      toast.success('Carga Masiva Exitosa.')
      return setUpdate(update+1)
    }catch(e){
      toast.error('No se ha podido registrar a los estudiantes.')
    }
    
}



    return(
      <>
        <PageUser color={'bg-fondo text-blue'} colorInput={'bg-fondo text-blue placeholder-blue'}>
          <SideBar  color={'bg-blue'} colorSecond={'deep-blue'} useRol={'Profesor'} mapeo={profesor_maps}>
            {/* Parte Central */}
            <div className="w-full md:w-4/5 bg-fondo p-4 h-full overflow-y-auto">    
            <div className="mx-auto max-w-7xl mt-4">
            <div className="gap-4 mb-5">

            <div className=''>
    <div className='flex flex-col items-start md:flex-row md:w-full md:items-center md:justify-between mx-2 my-6 border-b-4 pb-4 border-blue'>
    <div className="flex items-center my-3">
            <Link to={ProfessorRoutes.Subject}><ArrowLeftIcon className="h-6 w-6 text-blue hover:text-white hover:rounded-full hover:bg-blue"/></Link>

        </div>
      <div className="min-w-0 flex-1 my-3">
        <h2 className='text-xl2 sm:text-xl3 text-center font-bold leading-7 text-blue '>
        {section.name ?  `Calificaciones ${section.name} - ${section.period}` : <><span className="animate-pulse">Cargando...</span></>}
        </h2>
      </div>
      <div className="flex lg:ml-4 lg:mt-0">
        <span className="">
        <button type="button" onClick={()=>{openModal()}} className='bg-blue button_tech_colorless hover:bg-light-blue'>
            Agregar Calificación
          </button>
          <button type="button" onClick={()=>{handleDownload()}} className='bg-blue button_tech_colorless hover:bg-light-blue'>
            Descargar 
          </button>
        </span>
      </div>
    </div>
    </div>

    <Card className="bg-white p-5 space-y-2 mb-3">
      <div className="border-b border-new-blue">
        <p className="font-bold text-new-blue text-xl text-center">Carga Masiva</p>
      </div>
      <div className="flex justify-center items-center">
  <input
    type="file"
    onChange={e => fileSelectedHandler(e)}
    className="text-sm text-new-blue font-bold file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-new-blue file:text-white hover:file:bg-new-hblue"
  />
</div>

      <div className="flex justify-center items-center">
      <button onClick={(e)=>postFile(e)}
       className='w-full font-bold md:flex-1 md:w-40 mb-2 md:mb-0 sm:mr-2 bg-new-blue hover:bg-new-hblue text-white rounded-lg py-2 px-4'>
                                        Cargar Datos
                                    </button>
      </div>
    </Card>

    <StudentGrades grades={grades} section_id={params.uid} update={() => setUpdate(update+1)}/>
            </div>
            </div>
            </div>


          </SideBar>

          <Portal open={isOpen} onClose={() => closeModal()}>
            <CreateFormStudentGrade students={students} section_id={params.uid} update={() => setUpdate(update+1)} onClose={() => closeModal()}/>
          </Portal>

   </PageUser>
   </>
    )
}


const mapStateToProps = state => ({
  });
  export default connect(mapStateToProps,{
  })(GradesMain);