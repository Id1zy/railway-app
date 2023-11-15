import PageUser from "../../hocs/layouts/PageUser";
import PageHeading from "../../components/heros/pageHeading";
import { connect } from "react-redux";
import {  useState, useLayoutEffect, useEffect } from "react";
import SideBar from "../../components/users/sidebar";
import { utp_maps } from "../../helpers/users_helpers";
import BarChart from "../../components/chart/BarChart";
import { Card } from "@material-tailwind/react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { UTPRoutes } from "../../helpers/users_routes";
import { getColor } from "../../api/axiosSchool";

//Para dashboard
import { listCourse } from "../../api/axiosCourses";
import { getSectionUTP } from "../../api/axiosSection";
import { getUTPSubjects } from "../../api/axiosSubject";

const DashboardUTP = ({isAuthenticated, user}) => {
  const [userData, setUserData] = useState('');
  const mapping = utp_maps
  const [color, setColor] = useState('white');
  const [data, setData] = useState({
    labels: ['', ''],
    datasets:[{
        label:"",
        data: ['']
    }]
  })
  const [Listcourse, setListCourse] = useState([]);
  const [sections, setSections] = useState([]);
  const [subjects, setSubjects] = useState([]);

  useLayoutEffect(() => {
    const getColorSchool = async() =>{
        try{
            const res = await getColor();
            window.localStorage.setItem("color", res.data['color'])
            setColor(res.data['color'])
            
        }catch(e){}
    }
  
    getColorSchool();
 
  }, []);

  //CURSOS......................................................
  
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await listCourse();
        if (response.data) {
          setListCourse(response.data);
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };
    fetchCourse();
    setColor(window.localStorage.getItem("color"))
  }, []);
  const activeCoursesCount = Listcourse.reduce((acc, item) => item.Course.status ? acc + 1 : acc, 0);
  //...............................................................
  //SECCIONES......................................................
  useEffect(() => {
    const fetchSection = async () => {
      try {
        const response = await getSectionUTP();
        if (response.data) {
          setSections(response.data.results);
        }
      } catch (error) {
        console.error('Error fetching sections:', error);
      }
    };
    fetchSection();
  }, []);
  const activeSectionsCount = sections.reduce((acc, section) => section.is_active ? acc + 1 : acc, 0);
  //...............................................................
  //ASIGNATURAS......................................................
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await getUTPSubjects();
        if (response.data) {
          setSubjects(response.data.results);
        }
      } catch (error) {
        console.error('Error fetching subjects:', error);
      }
    };
  
    fetchSubjects();
  }, []);
  const activeSubjectsCount = subjects.reduce((acc, subject) => subject.is_active ? acc + 1 : acc, 0);
  //...............................................................

  const handleCourseClick = () => {
    const activeCoursesCount = Listcourse.filter(course => course.Course.status).length;
    const inactiveCoursesCount = Listcourse.filter(course => !course.Course.status).length;

    setData({
      labels: ['Activos', 'Inactivos'],
      datasets: [{
        label: "Estado de los Cursos",
        data: [activeCoursesCount, inactiveCoursesCount],
        backgroundColor: [
            'rgba(53, 162, 235, 0.5)',
            'rgba(255, 99, 132, 0.5)'
          ],
        borderColor: [
            'rgba(53, 162, 235, 1)',
            'rgba(255, 99, 132, 1)'
          ],
        borderWidth: 1,
      }],
    });
  };

  const handleSectionClick = () => {
    const activeSectionsCount = sections.reduce((acc, section) => section.is_active ? acc + 1 : acc, 0);
    const inactiveSectionsCount = sections.length - activeSectionsCount;
  
    setData({
      labels: ['Activas', 'Inactivas'],
      datasets: [{
        label: "Estado de las Secciones",
        data: [activeSectionsCount, inactiveSectionsCount],
        backgroundColor: [
          'rgba(53, 162, 235, 0.5)',
          'rgba(255, 99, 132, 0.5)'
        ],
        borderColor: [
          'rgba(53, 162, 235, 1)',
          'rgba(255, 99, 132, 1)'
        ],
        borderWidth: 1,
      }],
    });
  };

  const handleSubjectClick = () => {
    const activeSubjectsCount = subjects.reduce((acc, subject) => subject.is_active ? acc + 1 : acc, 0);
    const inactiveSubjectsCount = subjects.length - activeSubjectsCount;
  
    setData({
      labels: ['Activas', 'Inactivas'],
      datasets: [{
        label: "Estado de las Asignaturas",
        data: [activeSubjectsCount, inactiveSubjectsCount],
        backgroundColor: [
            'rgba(53, 162, 235, 0.5)',
            'rgba(255, 99, 132, 0.5)'
          ],
          borderColor: [
            'rgba(53, 162, 235, 1)',
            'rgba(255, 99, 132, 1)'
          ],
        borderWidth: 1,
      }]
    });
  };

  //.............................................................

  const Style = {
    colorSchool :  `bg-new-`+color,
    textSchool: `text-new-`+color,
    hoverSchool: `bg-deep-new-`+color,
    borderSchool :  `border-new-`+color,
  }
  
  return (
    <PageUser color={'bg-white text-blue'} colorInput={'bg-white text-blue'}>
      <SideBar color={'bg-blue'} useRol={'UTP'} mapeo={utp_maps} >
        
        {/* Parte Central */}
        <div className="w-full md:w-3/5 bg-fondo p-4 h-full overflow-y-auto">  
          <header className="bg-white shadow m-2 rounded-lg bg-tech flex items-center justify-center">
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex items-center justify-center">
              <h1 className="text-3xl font-bold tracking-tight text-white">Bienvenido {userData.get_full_name}</h1>
            </div>
          </header>

          {/* Título Dashboard */}
          <div className='mx-2 my-6'>
            <div className={`border-b-4 pb-4 ${Style.borderSchool}`}>
              <h2 className={`text-xl2 sm:text-xl3 text-center font-bold leading-7 ${Style.textSchool}`}>
                Dashboard
              </h2>
            </div>
          </div>

          <main className="mx-auto max-w-7xl mt-4">
            {/* Grid de Tarjetas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
              {/* Tarjeta de Asignaturas */}
              <div className="bg-white shadow rounded-[20px] p-3">
                <div className="flex justify-between">
                  <p className="text-new-green text-lg font-bold">Asignaturas</p>
                  <button className="animate-pulse bg-new-green hover:bg-deep-green h-7 w-7 rounded-full"></button>
                </div>
                <div className="flex justify-center bg-new-green hover:bg-deep-green py-2 -mx-3 my-4">
                  <p className="text-white text-lg font-bold">Cantidad: {activeSubjectsCount}</p>
                </div>
                <div className="flex justify-center mt-3">
                  <button className="w-full bg-new-green hover:bg-deep-green button_tech_5" onClick={handleSubjectClick}>click</button>
                </div>
              </div>

              {/* Tarjeta de Cursos */}
              <div className="bg-white shadow rounded-[20px] p-3">
                <div className="flex justify-between">
                  <p className="text-new-blue text-lg font-bold">Cursos</p>
                  <button className="animate-pulse bg-new-blue hover:bg-deep-blue h-7 w-7 rounded-full"></button>
                </div>
                <div className="flex justify-center bg-new-blue hover:bg-deep-blue py-2 -mx-3 my-4">
                  <p className="text-white text-lg font-bold">Cantidad: {activeCoursesCount}</p>
                </div>
                <div className="flex justify-center mt-3">
                  <button className="w-full bg-new-blue hover:bg-deep-blue button_tech_5" onClick={handleCourseClick}>click</button>
                </div>
              </div>

              {/* Tarjeta de Secciones */}
              <div className="bg-white shadow rounded-[20px] p-3">
                <div className="flex justify-between">
                  <p className="text-new-red text-lg font-bold">Secciones</p>
                  <button className="animate-pulse bg-new-red hover:bg-deep-red-2 h-7 w-7 rounded-full"></button>
                </div>
                <div className="flex justify-center bg-new-red hover:bg-deep-red-2 py-2 -mx-3 my-4">
                  <p className="text-white text-lg font-bold">Cantidad: {activeSectionsCount}</p>
                </div>
                <div className="flex justify-center mt-3">
                  <button className="w-full bg-new-red hover:bg-deep-red-2 button_tech_5" onClick={handleSectionClick}>click</button>
                </div>
              </div>
            </div>

            {/* Sección de Estadísticas */}
            <div className="bg-white rounded-[20px] p-4">
              <div style={{ height: '300px', position: 'relative' }}>
                <BarChart chartData={data} options={{ responsive: true, maintainAspectRatio: false }} />
              </div>
            </div>
          </main>
        </div>

  {/* Parte Derecha */}
  <div className="w-1/5 hidden md:block h-full bg-fondo p-4">


  </div>
          </SideBar>

   </PageUser>
    )
}


const mapStateToProps = state => ({
    isAuthenticated: state.Auth.isAuthenticated,
    user: state.Auth.user
  });
  export default connect(mapStateToProps,{
  })(DashboardUTP);