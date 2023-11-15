// React Functions
import { useEffect, useState} from "react";
import { connect } from "react-redux";
//Components
import PageUser from "../../hocs/layouts/PageUser";
import SideBar from "../../components/users/sidebar";
import SlideNextButton from "../../components/swiperNext.js";
import { StudentRoutes } from "../../helpers/users_routes";
// Images
import { index_maps } from "../../helpers/users_helpers";
import { Link } from "react-router-dom";
import { ChatBubbleBottomCenterIcon, FolderIcon, PencilIcon} from "@heroicons/react/24/outline";
import { getSectionForStudent } from "../../api/axiosSection";
// Swiper React Components
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFlip, Pagination, Navigation } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-flip';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const Subjects = ({  user }) => {
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
        const res = await getSectionForStudent();
        if (res && res.data) {
          setSubjects(res.data.results); 
          console.log(res.data.results)
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
    <div className={`flex content-center items-center justify-between mx-2 my-4 border-b-4 pb-4 border-new-${color}`}>
    <div className="flex items-center">
        </div>
      <div className="min-w-0 flex-1">
        <h2 className={`text-xl2 sm:text-xl3 text-center font-bold leading-7 text-new-${color} `}>
          Asignaturas
        </h2>
      </div>
      <div>
        <Link to={StudentRoutes.SubjectAll} className={`button_tech !text-xs !bg-new-${color}`}>Ver Todas</Link>
      </div>
    </div>
    </div>



            <div className="grid grid-cols-1 sm:grid sm:grid-cols-4 md:grid-cols-4">


            {subject.map((item) => (
              <>
              <Swiper 
              key={item.id}
                    effect={'flip'}
                    grabCursor={true}
                    pagination={false}
                    navigation={false}
                    freeMode = {true}
                    modules={[EffectFlip, Pagination, Navigation]}
                    className="max-w-[100%] lg:max-w-[100%]"
                  >
           
                        <SwiperSlide>
                <div className={`mx-[5px] mt-5 flex flex-col sm:w-auto self-start rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 sm:shrink-0 sm:grow-0 sm:basis-1/4`}>
                  <a href="#!" className={`border-none`}>
                    <div className={`rounded-t-lg w-full h-40 ${Style.colorSchool} border-none`}>
                      <div className={`flex justify-between`}>
                        <SlideNextButton></SlideNextButton>
                        <div className={`p-3`}></div>
                      </div>
                    </div>
                  </a>
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
                </div>
              </SwiperSlide>
                        <SwiperSlide>
                        <div 
                          className="mx-[5px] mt-5 flex flex-col sm:w-auto self-start rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 sm:shrink-0 sm:grow-0 sm:basis-1/4">
                          <div className="px-3 py-3">
                          <div className={`flex justify-center bg-new-${color} rounded-t-[8px] -mt-3 -mx-3 p-2 `}>
        <p className="text-white text-lg font-bold">Funcionalidades</p>
    </div>


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
                            

                          </div>
                          <a href="#!" className="border-none">
                            <div className="rounded-b-lg w-full h-35 bg-admin-green border-none"></div>
                          </a>

                        </div>
                </SwiperSlide>
              
              
                        </Swiper>
              </>
                        
            ))}
  

 
 
 

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
  })(Subjects);