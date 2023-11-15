// React Functions
import { useEffect, useState} from "react";
import { connect } from "react-redux";
//Components
import PageUser from "../../hocs/layouts/PageUser";
import SideBar from "../../components/users/sidebar";
import { Card } from "@material-tailwind/react";
import { Disclosure } from '@headlessui/react'
import { StudentRoutes } from "../../helpers/users_routes";
// Images
import { index_maps } from "../../helpers/users_helpers";
import { Link } from "react-router-dom";
import { ChatBubbleBottomCenterIcon, FolderIcon, PencilIcon, ArrowLeftIcon} from "@heroicons/react/24/outline";
import { getSectionForStudentAll } from "../../api/axiosSection";
// Swiper React Components
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFlip, Pagination, Navigation } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-flip';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const SubjectsStudent = ({  user }) => {
  const [userData, setUserData] = useState('');
  const [subject, setSubjects] = useState([]);
  const [color, setColor] = useState(
    window.localStorage.getItem("color"));




  useEffect(() => {

    if (user) {
      setUserData(user);
    }

    async function loadSubjects() {
      try {
        const res = await getSectionForStudentAll();
        if (res && res.data) {
          setSubjects(res.data.results); 
        }
      } catch (error) {
        console.error('Error al cargar los usuarios:', error);
      }
    }
    loadSubjects();
  }, [user]);

  const Style = {
    colorSchool :  `bg-new-${color}`,
  }

    return(
        <PageUser color={`bg-white text-new-${color}`} colorInput={`bg-white text-new-${color}`} >

          <SideBar  color={Style.colorSchool} userData={userData} useRol="Estudiante" mapeo={index_maps}>
            {/* Parte Central */}
           
            <div className="w-full md:w-4/5 bg-fondo p-4 h-full shadow-md overflow-y-auto"> 
            <div className=''>
    <div className='flex content-center items-center justify-between mx-2 my-6 border-b-4 pb-4 border-blue'>
    <div className="flex items-center">
            <Link to={StudentRoutes.Subject}><ArrowLeftIcon className="h-6 w-6 text-blue hover:text-white hover:rounded-full hover:bg-blue"/></Link>

        </div>
      <div className="min-w-0 flex-1">
        <h2 className='text-xl2 sm:text-xl3 text-center font-bold leading-7 text-blue '>
          Todas las Asignaturas.
        </h2>
      </div>
    </div>
    </div>




            <div className="grid grid-cols-1 sm:grid sm:grid-cols-1 md:grid-cols-1">
                <div className={`rounded-md text-center p-4 bg-new-blue`}>
                    <p className={`text-white font-bold`}>Asignaturas Activas</p>
                </div>
                {subject.filter((item)=>item.is_active === true) ?<></>:<>No hay asignaturas activadas.</>}
                {subject.filter((item)=>item.is_active === true).map((item)=>(<>
                    <Disclosure >
          {({ open }) => (
            <>
            <div  className="flex w-50 justify-between rounded-lg bg-new-blue px-4 py-2 my-2 text-left text-sm font-medium text-white focus:outline-none focus-visible:ring focus-visible:ring-light-blue focus-visible:ring-opacity-75">
            <Disclosure.Button className="text-left grow">
            <div className={`px-3 py-3`}>
                    <div className={`${Style.colorSchool} rounded-md px-2 py-1`}>
                      <p className={`text-xl text-center font-bold leading-tight text-white`}>
                      {item.name}
                      </p>
                    </div>
                    <div className={`mb-2`}>
                      <p className={`text-base font-bold ${Style.textSchool} text-center`}>
                        Periodo: {item.period}
                      </p>
                    </div>
                    <div className={`grid grid-cols-2 -mx-2`}>
                    <Link  to={StudentRoutes.Grades.replace(':uid', item.section_id)} className={`button_tech !bg-new-${color} mr-2 !text-xs`}>Calificaciones</Link>
                              <Link  to={StudentRoutes.Assignments.replace(':uid', item.section_id)} className={`button_tech mr-2 !bg-new-${color} !text-xs`}>Trabajos</Link>
                    </div>
                  </div>
            </Disclosure.Button>
            </div>
              <Disclosure.Panel className="px-2 pt-2 pb-4 text-sm text-gray-500">
                <Card className="w-full p-3"> 

    <div className="inline-flex text-center  w-full space-x-2 mb-2 mt-2">
                              <div className={`grid  place-items-center rounded-full w-8 h-8 bg-new-${color}`}> 
                                <PencilIcon className="text-white w-5 h-5 self-center"/> 
                              </div>
                              <div className={`bg-new-${color} grow grid place-items-center p-0 rounded-[20px]`}>
                              <Link to={StudentRoutes.Attendance.replace(':uid', item.section_id)} className="text-white font-bold">Asistencia</Link> 
                              </div>
                            </div>

                            <div className="inline-flex text-center  w-full space-x-2 mb-2">
                              <div className={`grid  place-items-center rounded-full w-8 h-8 bg-new-${color} `}> 
                                <FolderIcon className="text-white w-5 h-5 self-center"/> 
                              </div>
                              <div className={`bg-new-${color} grow grid place-items-center p-0 rounded-[20px]`}>
                              <Link to={StudentRoutes.SharedFiles.replace(':uid', item.section_id)} className="text-white font-bold">Archivos Compartidos</Link> 
                              </div>
                            </div>


                            <div className="inline-flex text-center  w-full space-x-2 mb-2">
                              <div className={`grid  place-items-center rounded-full w-8 h-8 bg-new-${color} `}> 
                                <ChatBubbleBottomCenterIcon className="text-white w-5 h-5 self-center"/> 
                              </div>
                              <div className={`bg-new-${color} grow grid place-items-center p-0 rounded-[20px]`}>
                              <Link to={StudentRoutes.Forum.replace(':uid', item.section_id)} className="text-white font-bold">Foro</Link> 
                              </div>
                            </div>

               
                </Card>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

                </>))}

                <div className={`rounded-md text-center p-4 bg-new-blue`}>
                    <p className={`text-white font-bold`}>Asignaturas Desactivadas</p>
                </div>
                {subject.filter((item)=>item.is_active === false) ?<></>:<>No hay asignaturas desactivadas.</>}
                {subject.filter((item)=>item.is_active === false).map((item)=>(<>
                    <Disclosure >
          {({ open }) => (
            <>
            <div  className="flex w-50 justify-between rounded-lg bg-new-blue px-4 py-2 my-2 text-left text-sm font-medium text-white focus:outline-none focus-visible:ring focus-visible:ring-light-blue focus-visible:ring-opacity-75">
            <Disclosure.Button className="text-left grow">
            <div className={`px-3 py-3`}>
                    <div className={`${Style.colorSchool} rounded-md px-2 py-1`}>
                      <p className={`text-xl text-center font-bold leading-tight text-white`}>
                      {item.name}
                      </p>
                    </div>
                    <div className={`mb-2`}>
                      <p className={`text-base font-bold ${Style.textSchool} text-center`}>
                        Periodo: {item.period}
                      </p>
                    </div>
                    <div className={`grid grid-cols-2 -mx-2`}>
                    <Link  to={StudentRoutes.Grades.replace(':uid', item.section_id)} className={`button_tech !bg-new-${color} mr-2 !text-xs`}>Calificaciones</Link>
                              <Link  to={StudentRoutes.Assignments.replace(':uid', item.section_id)} className={`button_tech mr-2 !bg-new-${color} !text-xs`}>Trabajos</Link>
                    </div>
                  </div>
            </Disclosure.Button>
            </div>
              <Disclosure.Panel className="px-2 pt-2 pb-4 text-sm text-gray-500">
                <Card className="w-full p-3"> 

    <div className="inline-flex text-center  w-full space-x-2 mb-2 mt-2">
                              <div className={`grid  place-items-center rounded-full w-8 h-8 bg-new-${color}`}> 
                                <PencilIcon className="text-white w-5 h-5 self-center"/> 
                              </div>
                              <div className={`bg-new-${color} grow grid place-items-center p-0 rounded-[20px]`}>
                              <Link to={StudentRoutes.Attendance.replace(':uid', item.section_id)} className="text-white font-bold">Asistencia</Link> 
                              </div>
                            </div>

                            <div className="inline-flex text-center  w-full space-x-2 mb-2">
                              <div className={`grid  place-items-center rounded-full w-8 h-8 bg-new-${color} `}> 
                                <FolderIcon className="text-white w-5 h-5 self-center"/> 
                              </div>
                              <div className={`bg-new-${color} grow grid place-items-center p-0 rounded-[20px]`}>
                              <Link to={StudentRoutes.SharedFiles.replace(':uid', item.section_id)} className="text-white font-bold">Archivos Compartidos</Link> 
                              </div>
                            </div>


                            <div className="inline-flex text-center  w-full space-x-2 mb-2">
                              <div className={`grid  place-items-center rounded-full w-8 h-8 bg-new-${color} `}> 
                                <ChatBubbleBottomCenterIcon className="text-white w-5 h-5 self-center"/> 
                              </div>
                              <div className={`bg-new-${color} grow grid place-items-center p-0 rounded-[20px]`}>
                              <Link to={StudentRoutes.Forum.replace(':uid', item.section_id)} className="text-white font-bold">Foro</Link> 
                              </div>
                            </div>

               
                </Card>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

                </>))}


 
 
 

</div>  


  </div>

  

          </SideBar>

   </PageUser>
  );
}




const mapStateToProps = state => ({
    isAuthenticated: state.Auth.isAuthenticated,
    user: state.Auth.user
  });
  export default connect(mapStateToProps,{
  })(SubjectsStudent);