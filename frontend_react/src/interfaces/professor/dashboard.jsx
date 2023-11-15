import PageUser from "../../hocs/layouts/PageUser";
import PageHeading from "../../components/heros/pageHeading";
import { connect } from "react-redux";
import { NavLink, Navigate } from "react-router-dom";
import { useEffect, useState, useLayoutEffect } from "react";
import SideBar from "../../components/users/sidebar";
import { profesor_maps } from "../../helpers/users_helpers";
import { ProfessorRoutes } from "../../helpers/users_routes";
import LineChart from "../../components/chart/LineChart";
import { Card } from "@material-tailwind/react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { getEvents } from "../../api/axiosEvent";
import { loadTodayEvents } from "../../components/eventToday";
import { getColor } from "../../api/axiosSchool";
import { get_avatar } from "../../api/axiosAvatar";
import Notification from "../../components/core/Notification";
import { listNotificationResume } from "../../api/axiosNotification";
// Functionalities
import { dashboardData as getDashData } from "../../api/axiosProfessor";
import {formatTime} from "../../helpers/users_def";

const Dashboard_Professor = ({isAuthenticated, user}) => {
  const [userData, setUserData] = useState('');
  const [color, setColor] = useState('white');
  const [todayEvents, setTodayEvents] = useState([]);
  const [profileImage, setProfileImage] = useState(null);
  const [dashboardData, setDashboardData] = useState('');
  const [notis, setNotis] = useState([]);


  useLayoutEffect(() => {
    const getColorSchool = async() =>{
        try{
            const res = await getColor();
            window.localStorage.setItem("color", res.data['color'])
            setColor(res.data['color'])
            
        }catch(e){}
    }
  
    getColorSchool();

    async function loadProfileImage() {
        try {
          const res = await get_avatar();
          if (res.data && res.data.avatar) {
            setProfileImage(res.data.avatar)
          }
        } catch (error) {
          console.error('Error al cargar el Avatar', error);
        }
      }
      loadProfileImage();

 
  }, []);
  
  useEffect(() =>{

    if(!isAuthenticated){
        <Navigate to={'/'} />
    }

    if(user){
      setUserData(user);
    }

    const dataToDisplay = async () => {
      try{
        const res = await getDashData();
        console.log(res.data)
        if(res.data){
          setDashboardData(res.data[0]);
          
          }

      } catch (err){
        console.log(err)
      }
    }

    async function loadNotis() {
      try {
        const res = await listNotificationResume()
        console.log(res)
        if (res && res) {
          setNotis(res.data)

        }
      } catch (error) {
        console.error('Error al cargar el dashboard', error);
      }
    };

    const fetchEvents = async () => {
      const eventsForToday = await loadTodayEvents();
      setTodayEvents(eventsForToday);
    };
    fetchEvents();


    dataToDisplay();
    loadNotis();
  }, [isAuthenticated, user]);


  const Style = {
    colorSchool :  `bg-new-`+color,
    textSchool: `text-new-`+color,
    hoverSchool: `bg-new-h`+color,
    borderSchool: `border-new-`+color,
    buttonSchool: `bg-new-`+color+' hover:bg-new-h'+color,
  }
    return(
        <PageUser color={`bg-white text-new-${color}`} colorInput={`bg-white text-new-${color}`} user={user} >
          <SideBar color={`${Style.colorSchool}`} useRol={'Profesor'} mapeo={profesor_maps} >
                        {/* Parte Central */}
  <div className="w-full md:w-3/5 bg-fondo p-4 h-full overflow-y-auto"> 

<header className="bg-white shadow m-2 rounded-lg bg-tech flex items-center justify-center">
<div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex items-center justify-center">
  <h1 className="text-3xl font-bold tracking-tight text-white">Bienvenido {userData.get_full_name} </h1>
</div>
</header>
<div className=''>
    <div className={`flex content-center items-center justify-between mx-2 my-6 border-b-4 pb-4 border-new-${color}`}>
    <div className="flex items-center">
        </div>
      <div className="min-w-0 flex-1">
        <h2 className={`text-xl2 sm:text-xl3 text-center font-bold leading-7 ${Style.textSchool} `}>
          Resumen
        </h2>
      </div>
    </div>
</div>
      <main className="">
        <div className="mx-auto max-w-7xl mt-4">
          {/* Parámetros */}
          <div className="flex flex-wrap w-full md:inline-flex md:justify-center gap-4 mb-5">

          <div className="w-1/4 items-center bg-white shadow rounded-[20px] p-3">
                  <div className="flex justify-center">
                      <p className={`${Style.textSchool} text-lg text-center font-bold`}>Reuniones pendientes hoy</p>
                  </div>
                  <div className={`flex justify-center ${Style.buttonSchool} py-2 -mx-3 my-4`}>
                  <p className="text-white text-lg font-bold">{dashboardData && dashboardData.nAwaiting}</p>
                  </div>
                  {/* <div className="flex justify-center  mt-3">
              
                      <NavLink to={ProfessorRoutes.Subject} className={`w-full ${Style.buttonSchool} button_tech_5 `}>click</NavLink>
                  </div> */}
              </div>

              <div className="w-1/4 bg-white shadow rounded-[20px] p-3">
                  <div className="flex justify-between">
                      <p className={`${Style.textSchool} text-lg font-bold text-center`}>Reuniones confirmadas hoy</p>
                  </div>
                  <div className={`flex justify-center ${Style.buttonSchool} py-2 -mx-3 my-4`}>
                  <p className="text-white text-lg font-bold text-center">{dashboardData && dashboardData.nConfirmed}</p>
                  </div>
                  {/* <div className="flex justify-center  mt-3">
              
                      <NavLink to={ProfessorRoutes.Subject} className={`w-full ${Style.buttonSchool} button_tech_5 `}>click</NavLink>
                  </div> */}
              </div>

              <div className="w-1/4 bg-white shadow rounded-[20px] p-3">
                  <div className="flex justify-between">
                      <p className={`${Style.textSchool} text-lg font-bold`}>
                        {
                      dashboardData && dashboardData.closestClass !== null ? 
                      "Próxima clase": "Clases de hoy"
                      }</p>
                  </div>
                  <div className={`flex justify-center ${Style.buttonSchool} py-2 -mx-3 my-4`}>
                  <p className="text-white text-lg font-bold text-center">{
                      dashboardData && dashboardData.closestClass !== null ? 
                      dashboardData.closestClass : "Día terminado"
                      }</p>
                  </div>
                  {/* <div className="flex justify-center  mt-3">
              
                      <NavLink to={ProfessorRoutes.Subject} className={`w-full ${Style.buttonSchool} button_tech_5 `}>click</NavLink>
                  </div> */}
              </div>


          </div>
          {/* Estadísticas */}

      {/* <Card className="bg-white p-5 mb-2">
        <div className="mb-2">
          <p className={`text-white ${Style.colorSchool} rounded-full text-center font-bold`}>Secciones a Cargo</p>
        </div>
        <div className="animate-pulse">
          <div className={`flex-1 space-y-6 py-2 ${Style.colorSchool} mb-2 rounded-full`}></div>
        </div>
      </Card> */}

      

          <div className="w-50 h-50 bg-white rounded-[20px] p-4 content-center">
            {dashboardData ?               
              <LineChart 
                data={dashboardData && dashboardData.graph && dashboardData.graph.comments} 
                labels={dashboardData && dashboardData.graph && dashboardData.graph.dates}
                title={'Actividad de sus foros en los últimos 5 días'}
              />:
              <></>}
          </div>
        </div>
      </main>

      
    
      
</div>

  {/* Parte Derecha */}
  <div className="w-1/5 hidden md:block h-full bg-fondo p-4">

  <Card className="bg-new-fondo p-3 mb-2">
        <div className={`${Style.colorSchool} rounded-full mb-2`}>
            <p className="text-white text-center font-bold">Notificaciones</p>
        </div>
        <div>
          {notis.length >0 ? <></>:<><p className={`${Style.textSchool} font-bold text-center text-sm`}>No hay Alertas ni Recordatorios.</p></>}
          {notis.map((item)=>(<>
            <Card className='bg-white p-2 shadow mb-2'>
            <div className=''>
              <div className='flex justify-end'>
                  <div className='text-xs bg-new-blue rounded-full px-3 text-white'>{formatTime(item.created_at)}</div>
              </div>
              <div className='inline-flex justify-between px-2'>
                  <div className='grid content-center'>
                      <InformationCircleIcon className='text-new-blue w-10 h-10'/>
                  </div>
                  <div className='px-2'>
                      <div className='text-sm text-new-blue font-bold'>{item.issue}</div>
                      <div className='text-sm text-new-blue font-normal'>{item.description}</div>
                  </div>
              </div>
              <div className='flex justify-end'>
              <div className='text-xs bg-new-blue rounded-full px-3 text-white'>Leído</div>
              </div>
          </div>
            </Card>
          </>))}
        </div>
    </Card>
    
    <Card className="bg-new-fondo p-3 mb-2">
        <div className="bg-new-green rounded-full mb-2">
            <p className="text-white text-center font-bold">Eventos del día</p>
        </div>
        <div>
            {todayEvents.length > 0 ? (
            todayEvents.map((event) => (
                <Card key={event.id} className='bg-white p-2 shadow mb-2'>
                <div className='flex justify-end'>
                    <div className='text-xs bg-new-blue rounded-full px-3 text-white'>
                    {new Date(event.start_date_time).toLocaleDateString()}
                    </div>
                </div>
                <div className='flex justify-start px-2'>
                    <div className='grid content-center'>
                    <InformationCircleIcon className='text-new-blue w-10 h-10'/>
                    </div>
                    <div className='pl-2 pr-4 flex-grow'>
                    <div className='text-sm text-new-blue font-bold' style={{ wordBreak: 'break-all' }}>
                        {event.title}
                    </div>
                    <div className='text-sm text-new-blue font-bold' style={{ wordBreak: 'break-all' }}>
                        {event.section_id.name} {event.section_id.course.nivel}
                    </div>
                    <div className='text-sm text-new-blue font-normal' style={{ wordBreak: 'break-all' }}>
                        {event.description}
                    </div>
                    </div>
                </div>
                <div className='flex justify-end'>
                    <div className='text-xs bg-new-blue rounded-full px-3 text-white'>Leído</div>
                </div>
                </Card>
            ))
            ) : (
            <Card className='bg-white p-2 shadow mb-2'>
                <div className='text-center text-new-blue font-bold'>No hay eventos para hoy</div>
            </Card>
            )}
        </div>
    </Card>

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
  })(Dashboard_Professor);