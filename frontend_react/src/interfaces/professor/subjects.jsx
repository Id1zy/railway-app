// React Functions
import { useEffect, useState } from "react";
import { connect } from "react-redux";
//Components
import PageUser from "../../hocs/layouts/PageUser";
import SideBar from "../../components/users/sidebar";
import PageHeading from "../../components/heros/pageHeading";
import { ProfessorRoutes, StudentRoutes } from "../../helpers/users_routes";
import SlideNextButton from "../../components/swiperNext.js";
import SlidePreviousButton from "../../components/swiperPrevious.js";
// Images
import { profesor_maps } from "../../helpers/users_helpers";
import { Link } from "react-router-dom";
import { BookOpenIcon, ArrowSmallRightIcon, ChatBubbleBottomCenterIcon, FolderIcon, PencilIcon, ClockIcon, FaceFrownIcon} from "@heroicons/react/24/outline";
import {
  Popover,
  PopoverHandler,
  PopoverContent,
  Button,
} from "@material-tailwind/react";
// Subjects API
import { getSectionForProfessor } from "../../api/axiosSection";
// Swiper React Components
import { Swiper, SwiperSlide} from 'swiper/react';
import { EffectFlip, Pagination, Navigation} from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-flip';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


const SubjectsProfessor = ({  user }) => {
  const [userData, setUserData] = useState('');
  const [subject, setSubjects] = useState([]);
  const [color, setColor] = useState(
    window.localStorage.getItem("color"));
  useEffect(() => {

    if (user) {
      setUserData(user);
    }

    const loadSubjects = async () => {
      try{
        const res = await getSectionForProfessor(user.id);
        if(res.data){
          setSubjects(res.data);
        }
      } catch (err) {
        return err;
      }
    }
    loadSubjects();

  }, [user]);

  const Style = {
    colorSchool :  `bg-new-`+color,
    textSchool: `text-new-`+color,
    hoverSchool: `bg-new-h`+color,
    borderSchool: `border-new-`+color,
    buttonSchool: `bg-new-`+color+' hover:bg-new-h'+color,
  }

    return(
<PageUser color={`bg-white ${Style.textSchool}`} colorInput={`bg-white ${Style.textSchool}`} user={user}>
  <SideBar color={`${Style.colorSchool}`} userData={userData} useRol="Profesor" mapeo={profesor_maps}>
    {/* Parte Central */}
    <div className={`w-full md:w-4/5 bg-fondo p-4 h-full shadow-md overflow-y-auto`}>
      <div className={`flex content-center items-center justify-between mx-2 my-6 border-b-4 pb-4 border-new-${color}`}>
        <div className="flex items-center">
        </div>
        <div className={`min-w-0 flex-1`}>
          <h2 className={`text-xl2 sm:text-xl3 text-center font-bold leading-7 ${Style.textSchool}`}>
            Asignaturas
          </h2>
        </div>
      </div>
      {subject && subject.length === 0 ? 
        <div className="w-full p-2 rounded-lg text-center">
          <FaceFrownIcon className="h-16 w-full text-center mb-3"/>
          <p className="w-full"> No tiene materias asignadas este semestre</p>
        </div>: <></>}

      <div className={`grid grid-cols-1 sm:grid sm:grid-cols-4 md:grid-cols-4`}>
        {subject.map((subj) => (
          <>
            <Swiper
              effect={'flip'}
              grabCursor={true}
              pagination={false}
              navigation={false}
              freeMode={true}
              modules={[EffectFlip, Pagination, Navigation]}
              className={`max-w-[100%] lg:max-w-[100%]`}
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
                        {subj.name}
                      </p>
                    </div>
                    <div className={`mb-2`}>
                      <p className={`text-base font-bold ${Style.textSchool} text-center`}>
                        {subj.period}
                      </p>
                    </div>
                    <div className={`grid grid-cols-2 -mx-2`}>
                      <Link to={ProfessorRoutes.Grades.replace(':uid', subj.section_id)} className={`button_tech mr-2 !text-xs !${Style.colorSchool} hover:!${Style.hoverSchool}`}>Calificaciones</Link>
                      <Link to={ProfessorRoutes.Assignments.replace(':uid', subj.section_id)} className={`button_tech !text-xs !${Style.colorSchool} hover:!${Style.hoverSchool}`}>Trabajo</Link>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className={`mx-[5px] mt-5 flex flex-col sm:w-auto self-start rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 sm:shrink-0 sm:grow-0 sm:basis-1/4`}>
                  <div className={`px-3 py-3`}>
                    <div className={`flex ${Style.colorSchool} rounded-t-[8px] -mt-3 -mx-3 p-2 `}>
                      <div className={`SlidePreviousButton`}><SlidePreviousButton></SlidePreviousButton></div>
                      <div><p className={`text-white text-lg text-left font-bold ml-2`}>{subj.name}</p></div>
                    </div>
                    <div className={`inline-flex text-center  w-full space-x-2 mb-2 mt-2`}>
                      <div className={`grid  place-items-center rounded-full w-8 h-8 ${Style.colorSchool} `}>
                        <PencilIcon className={`text-white w-5 h-5 self-center`}></PencilIcon>
                      </div>
                      <div className={`${Style.colorSchool} grow grid place-items-center p-0 rounded-[20px]`}>
                        <Link to={ProfessorRoutes.Attendance.replace(":sid", subj.section_id)} className={`text-white font-bold`}>Asistencia</Link>
                      </div>
                    </div>
                    <div className={`inline-flex text-center  w-full space-x-2 mb-2`}>
                      <div className={`grid  place-items-center rounded-full w-8 h-8 ${Style.colorSchool} `}>
                        <FolderIcon className={`text-white w-5 h-5 self-center`}></FolderIcon>
                      </div>
                      <div className={`${Style.colorSchool} grow grid place-items-center p-0 rounded-[20px]`}>
                        <Link to={ProfessorRoutes.SharedFiles.replace(':uid', subj.section_id)} className={`text-white font-bold`}>Archivos Compartidos</Link>
                      </div>
                    </div>
                    <div className={`inline-flex text-center  w-full space-x-2 mb-2`}>
                      <div className={`grid  place-items-center rounded-full w-8 h-8 ${Style.colorSchool} `}>
                        <PencilIcon className={`text-white w-5 h-5 self-center`}></PencilIcon>
                      </div>
                      <div className={`${Style.colorSchool} grow grid place-items-center p-0 rounded-[20px]`}>
                        <Link to={ProfessorRoutes.Annotations.replace(':sid', subj.section_id)} className={`text-white font-bold`}>Anotaciones</Link>
                      </div>
                    </div>
                    <div className={`inline-flex text-center  w-full space-x-2 mb-2`}>
                      <div className={`grid  place-items-center rounded-full w-8 h-8 ${Style.colorSchool} `}>
                        <ChatBubbleBottomCenterIcon className={`text-white w-5 h-5 self-center`}></ChatBubbleBottomCenterIcon>
                      </div>
                      <div className={`${Style.colorSchool} grow grid place-items-center p-0 rounded-[20px]`}>
                        <Link to={ProfessorRoutes.Forum.replace(':uid', subj.section_id)} className={`text-white font-bold`}>Foro - Estudiantes</Link>
                      </div>
                    </div>
                    <div className={`inline-flex text-center  w-full space-x-2 mb-2`}>
                      <div className={`grid  place-items-center rounded-full w-8 h-8 ${Style.colorSchool} `}>
                        <ChatBubbleBottomCenterIcon className={`text-white w-5 h-5 self-center`}></ChatBubbleBottomCenterIcon>
                      </div>
                      <div className={`${Style.colorSchool} grow grid place-items-center p-0 rounded-[20px]`}>
                        <Link to={ProfessorRoutes.ForumGuardian.replace(':uid', subj.section_id)} className={`text-white font-bold`}>Foro - Apoderados</Link>
                      </div>
                    </div>
                    <div className={`inline-flex text-center  w-full space-x-2 mb-2`}>
                      <div className={`${Style.colorSchool} grid  place-items-center rounded-full w-8 h-8 ${Style.colorSchool} `}>
                        <ClockIcon className={`text-white w-5 h-5 self-center`}></ClockIcon>
                      </div>
                      <div className={`${Style.colorSchool} grow grid place-items-center p-0 rounded-[20px]`}>
                        <Link to={ProfessorRoutes.AvailableTimes.replace(':sid', subj.section_id)} className="text-white font-bold">Reuniones</Link> 
                      </div>
                    </div>
                  </div>
                  <a href="#!" className={`border-none`}>
                    <div className={`rounded-b-lg w-full h-35 ${Style.colorSchool} border-none`}></div>
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
  })(SubjectsProfessor);