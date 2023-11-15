import PageUser from "../../hocs/layouts/PageUser";
import {InformationCircleIcon} from '@heroicons/react/24/outline'
import PageHeading from "../../components/heros/pageHeading";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect, useState, useLayoutEffect } from "react";
import SideBar from "../../components/users/sidebar";
import { index_maps } from "../../helpers/users_helpers";
import { Card } from "@material-tailwind/react";
import { StudentRoutes } from "../../helpers/users_routes";
import BarChart from "../../components/chart/BarChart";
import { loadTodayEvents } from "../../components/eventToday";
import { getColor } from "../../api/axiosSchool";
import { get_avatar } from "../../api/axiosAvatar";
import { getDashboardStudent } from "../../api/axiosStudent";
import { listNotificationResume } from "../../api/axiosNotification";
import {formatTime} from "../../helpers/users_def";



const Dashboard = ({}) => {
  const [userData, setUserData] = useState('');
  const [todayEvents, setTodayEvents] = useState([]);
  const [dashboard, setDashboard] = useState([]);
  const [color, setColor] = useState('white');
  const [notis, setNotis] = useState([]);
  const [data, setData] = useState({
    labels: ['Prueba_1', 'Prueba_2'],
    datasets:[{
        label:"Prueba",
        data: ['Datos']
    }]
  })
  const mapping = index_maps

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
          if (res && res) {
            window.localStorage.setItem("avatar", res.data.avatar)
          }
        } catch (error) {
          console.error('Error al cargar el Avatar', error);
        }
      }
      loadProfileImage();

 
  }, []);


  useEffect(() => {
    async function loadDashboard() {
      try {
        const res = await getDashboardStudent();

        if (res && res) {
          setDashboard(res.data[0])
          setData({
            labels: ['Asignaturas', 'Anotaciones', 'Foros'],
            datasets:[{
                label:['Cantidad'],
                data: [res.data[0].sections, res.data[0].annotations, res.data[0].forums],
          }, ], }

        )
        }
      } catch (error) {
        console.error('Error al cargar el dashboard', error);
      }
    };

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
      const todayEvents = await loadTodayEvents();
      setTodayEvents(todayEvents);
    };
  
    fetchEvents();
    setColor(window.localStorage.getItem("color"))

    loadDashboard();
    loadNotis();
  }, []);

  const Style = {
    colorSchool :  `bg-new-`+color,
    textSchool: `text-new-`+color,
    hoverSchool: `bg-deep-`+color,
  }



    return(
        
        <PageUser color={`bg-white text-new-${color}`} colorInput={`bg-white text-new-${color}`} >
          <SideBar color={`${Style.colorSchool}`} userData={userData} useRol="Estudiante" mapeo={mapping}>
            {/* Parte Central */}
  <div className="w-full md:w-3/5 bg-fondo p-4 h-full overflow-y-auto"> 

<header className="bg-white shadow m-2 rounded-lg bg-tech flex items-center justify-center">
<div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex items-center justify-center">
  <h1 className="text-3xl font-bold tracking-tight text-white">Bienvenido {dashboard  ? <span >{dashboard['name']}</span>:<span className="animate-pulse">Cargando...</span>} </h1>
</div>
</header>

<div className=''>
    <div className={`flex content-center items-center justify-between mx-2 my-6 border-b-4 pb-4 border-new-${color}`}>
    <div className="flex items-center">
        </div>
      <div className="min-w-0 flex-1">
        <h2 className={`text-xl2 sm:text-xl3 text-center font-bold leading-7 ${Style.textSchool} `}>
          Dashboard
        </h2>
      </div>
    </div>
</div>


      <main className="">
        <div className="mx-auto max-w-7xl mt-4">
          {/* Parámetros {``} */} 
          <Card className="bg-white p-5 mb-2">
        <div className={`mb-2  `}>
          <p className={`text-white ${Style.colorSchool} rounded-full text-center font-bold`}>Apoderado</p>
        </div>
        <div className="">
          <div className={`flex-1 space-y-6 py-2 ${Style.textSchool} mb-2 rounded-full text-center font-bold border-y-2 border-${color} rounded-md`}>
          {dashboard ? <span >{dashboard['guardian']}</span>:<span className="animate-pulse">Cargando...</span>}
          </div>
        </div>
      </Card>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-5">

          <div className="bg-white shadow rounded-[20px] p-3">
                  <div className="flex justify-between items-center">
                      <p className= {` text-base font-bold ${Style.textSchool}`}>Asignaturas</p>
                      <button className={` h-7 w-7 rounded-full ${Style.colorSchool}`}></button>
                  </div>
                  <div className={`flex justify-center ${Style.colorSchool} py-2 -mx-3 my-4 `}>
                  <p className="text-white text-base font-bold">{dashboard  ? <span >{dashboard['sections']}</span>:<span className="animate-pulse">Cargando...</span>}</p>
                  </div>
                  <div className="flex justify-center  mt-3">
              
                      <Link to={StudentRoutes.Subject} className={`w-full ${Style.colorSchool} button_tech_5  `}>click</Link>
                  </div>
              </div>


              <div className="bg-white shadow rounded-[20px] p-3">
                  <div className="flex justify-between items-center">
                  <p className= {` text-base font-bold ${Style.textSchool}`}>Anotaciones</p>
                      <button className={` h-7 w-7 rounded-full ${Style.colorSchool}`}></button>
                  </div>
                  <div className={`flex justify-center ${Style.colorSchool} py-2 -mx-3 my-4 `}>
                  <p className="text-white text-base font-bold">{dashboard  ? <span >{dashboard['annotations']}</span>:<span className="animate-pulse">Cargando...</span>}</p>
                  </div>
                  <div className="flex justify-center  mt-3">
                  <Link to={StudentRoutes.Subject} className={`w-full ${Style.colorSchool} button_tech_5  `}>click</Link>
                  </div>
              </div>

              <div className="bg-white shadow rounded-[20px] p-3">
                  <div className="flex justify-between items-center">
                  <p className= {` text-sm font-bold ${Style.textSchool}`}>Foros</p>
                      <button className={` h-7 w-7 rounded-full ${Style.colorSchool}`}></button>
                  </div>
                  <div className={`flex justify-center ${Style.colorSchool} py-2 -mx-3 my-4 `}>
                  <p className="text-white text-sm font-bold">{dashboard ? <span >{dashboard['forums']}</span>:<span className="animate-pulse">Cargando...</span>}</p>
                  </div>
                  <div className="flex justify-center  mt-3">
                  <Link to={StudentRoutes.Subject} className={`w-full ${Style.colorSchool} button_tech_5  `}>click</Link>
                  </div>
              </div>
          </div>
          {/* Estadísticas */}
          <div className="w-50 h-50 bg-white rounded-[20px] p-4 ">
      <BarChart chartData={data} />
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
    <div className={`${Style.colorSchool} rounded-full mb-2`}>
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

                <div className={`text-center ${Style.textSchool} font-bold text-sm`}>No hay eventos para hoy.</div>

            )}
        </div>
    </Card>

  </div>
          </SideBar>

   </PageUser>
    )
}


const mapStateToProps = state => ({
  });
  export default connect(mapStateToProps,{
  })(Dashboard);
