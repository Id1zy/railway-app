import PageUser from "../../hocs/layouts/PageUser";
import PageHeading from "../../components/heros/pageHeading";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import SideBar from "../../components/users/sidebar";
import { guardian_maps } from "../../helpers/users_helpers";
import { Card } from "@material-tailwind/react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { loadTodayEvents } from "../../components/eventToday";
import {getGuardian, getStudentsBy } from "../../api/axiosGuardian";
import DashboardStudentCard from "../../components/heros/dashboardStudentCard";
import { listNotificationResume } from "../../api/axiosNotification";
import {formatTime} from "../../helpers/users_def";

const DashboardGuardian = ({isAuthenticated, user}) => {
  const [userData, setUserData] = useState('');
  const [todayEvents, setTodayEvents] = useState([]);
  const [color, setColor] = useState('white');
  const [studentsData, setStudentsData] = useState([]);
  const [notis, setNotis] = useState([]);
  const [guardianData, setGuardianData] = useState([]);
  const [firstGuardianRut, setFirstGuardianRut] = useState(null);

  const fetchData = async () => {
    try {
      setUserData(user);
      const guardianResponse = await getGuardian(user.id);
  
      if (guardianResponse.data && guardianResponse.data.length > 0) {
        const firstGuardian = guardianResponse.data[0];
        setGuardianData(firstGuardian);
        setFirstGuardianRut(firstGuardian.rut);
        const studentsResponse = await getStudentsBy(firstGuardian.rut);
        if (studentsResponse.data && studentsResponse.data.length > 0) {
          setStudentsData(studentsResponse.data);
        } else {
          console.warn('La respuesta no contiene datos de estudiantes:', studentsResponse.data);
        }
      } else {
        console.warn('La respuesta no contiene datos de guardian:', guardianResponse.data);
      }
    } catch (error) {
      console.error('Error al obtener datos:', error.message);
    }
  };
  
  useEffect(() => {
    fetchData();
  }, [isAuthenticated, user]);

  useEffect(() => {
    if (!isAuthenticated) {
      return <Navigate to={'/'} />;
    }

    if (user) {
      setUserData(user);
    }
  }, [isAuthenticated, user]);

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

  useEffect(() => {
    const fetchEvents = async () => {
      const todayEvents = await loadTodayEvents();
      setTodayEvents(todayEvents);
    };

    fetchEvents();
    loadNotis();
    setColor(window.localStorage.getItem("color"))
  }, []);

  const Style = {
    colorSchool :  `bg-new-`+color,
    textSchool: `text-new-`+color,
    hoverSchool: `bg-deep-`+color,
  }

    return(
        <PageUser color={'bg-white text-blue'} colorInput={'bg-white text-blue'} >
          <SideBar color={'bg-blue'} useRol={'Apoderado'} mapeo={guardian_maps} >
            {/* Parte Central */}
          <div className="w-full md:w-4/5 bg-fondo p-4 h-full shadow-md">

          <header className="bg-white shadow m-2 rounded-lg bg-tech flex items-center justify-center">
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex items-center justify-center">
              <h1 className="text-3xl font-bold tracking-tight text-white">Bienvenido  </h1>
            </div>
          </header>
          <PageHeading colorText={'text-new-blue'} colorButton={'invisible'} border={'border-new-blue'} title='Dashboard' button=''/>

      <main className="">
        <div className="mx-auto max-w-7xl mt-4">
          {/* Parámetros */}
          {studentsData.map(student => {
            return (
              <DashboardStudentCard
                key={student.rut}
                title={`Estudiante: ${student.user.first_name} ${student.user.last_name}`}
                quantity={student.rut}
                hovercolor="text-new-blue"
                colortext="text-new-blue"
              />
            );
          })}
        </div>
      </main>
      </div>{/* Parte Derecha */}
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
    <div className={`${Style.colorSchool} rounded-full mb-2`}>
          <div className="bg-new-blue rounded-full mb-2">
              <p className="text-white text-center font-bold">Eventos del día</p>
          </div>
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

export default connect(mapStateToProps, {})(DashboardGuardian);