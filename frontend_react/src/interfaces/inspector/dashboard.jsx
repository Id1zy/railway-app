import PageUser from "../../hocs/layouts/PageUser";
import PageHeading from "../../components/heros/pageHeading";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import SideBar from "../../components/users/sidebar";
import {  inspector_maps } from "../../helpers/users_helpers";
import BarChart from "../../components/chart/BarChart";
import { Card } from "@material-tailwind/react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";
import { InspectorRoutes } from "../../helpers/users_routes";
import { Link } from "react-router-dom";



const DashboardInspector = ({isAuthenticated, user}) => {
  const [userData, setUserData] = useState('');
  const [data, setData] = useState({
    labels: ['Prueba_1', 'Prueba_2'],
    datasets:[{
        label:"Prueba",
        data: ['Datos']
    }]
  })
  
  useEffect(() =>{

  if(!isAuthenticated){
     <Navigate to={'/'} />
   }

    if(user){
      setUserData(user);
    }
    
  
  }, [isAuthenticated, user]);

    return(
        <PageUser color={'bg-white text-blue'} colorInput={'bg-white text-blue'} >
          <SideBar color={'bg-blue'} useRol={'inspector'} mapeo={inspector_maps} >
            {/* Parte Central */}
  <div className="w-full md:w-3/5 bg-fondo p-4 h-full"> 

<header className="bg-white shadow m-2 rounded-lg bg-tech flex items-center justify-center">
<div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex items-center justify-center">
  <h1 className="text-3xl font-bold tracking-tight text-white">Bienvenido {userData.get_full_name} </h1>
</div>
</header>
<PageHeading colorText={'text-new-blue'} colorButton={'invisible'} border={'border-new-blue'} title='Dashboard' button=''/>

      <main className="">
        <div className="mx-auto max-w-7xl mt-4">
          {/* Parámetros */}
          <Card className="bg-white p-5 mb-2">
        <div className="mb-2">
          <p className="text-white bg-new-blue rounded-full text-center font-bold">Estudiantes a Cargo</p>
        </div>
        <div className="animate-pulse">
          <div className="flex-1 space-y-6 py-2 bg-light-blue mb-2 rounded-full"></div>
        </div>
      </Card>

      <Card className="bg-white p-5 mb-2">
        <div className="mb-2">
          <p className="text-white bg-new-green rounded-full text-center font-bold">Solicitud de Reuniones</p>
        </div>
        <div className="animate-pulse">
          <div className="flex-1 space-y-6 py-2 bg-new-green mb-2 rounded-full"></div>
        </div>
      </Card>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">

          <div className="bg-white shadow rounded-[20px] p-3">
                  <div className="flex justify-between">
                      <p className="text-new-green text-lg font-bold">Asignaturas</p>
                      <button className="bg-new-green hover:bg-deep-green h-7 w-7 rounded-full"></button>
                  </div>
                  <div className="flex justify-center bg-new-green hover:bg-deep-green py-2 -mx-3 my-4">
                  <p className="text-white text-lg font-bold">Promedio</p>
                  </div>
                  <div className="flex justify-center  mt-3">
              
                      <Link to={InspectorRoutes.Dashboard} className="w-full bg-new-green hover:bg-deep-green button_tech_5 ">click</Link>
                  </div>
              </div>

              <div className="bg-white shadow rounded-[20px] p-3">
                  <div className="flex justify-between">
                      <p className="text-new-blue  text-lg font-bold">Asistencia</p>
                      <button className="bg-new-blue hover:bg-deep-blue h-7 w-7 rounded-full"></button>
                  </div>
                  <div className="flex justify-center bg-new-blue hover:bg-deep-blue py-2 -mx-3 my-4">
                  <p className="text-white text-lg font-bold">Porcentaje</p>
                  </div>
                  <div className="flex justify-center  mt-3">
                      <button className="w-full bg-new-blue hover:bg-deep-blue button_tech_5">click</button>
                  </div>
              </div>

              <div className="bg-white shadow rounded-[20px] p-3">
                  <div className="flex justify-between">
                      <p className="text-new-red text-lg font-bold">Anotaciones</p>
                      <button className="bg-new-red hover:bg-deep-red-2 h-7 w-7 rounded-full"></button>
                  </div>
                  <div className="flex justify-center bg-new-red  hover:bg-deep-red-2 py-2 -mx-3 my-4">
                  <p className="text-white text-lg font-bold">Cantidad</p>
                  </div>
                  <div className="flex justify-center  mt-3">
                      <button className="w-full bg-new-red hover:bg-deep-red-2 button_tech_5">click</button>
                  </div>
              </div>

              <div className="bg-white shadow rounded-[20px] p-3">
                  <div className="flex justify-between">
                      <p className="text-new-purple text-regular font-bold">Trabajos Asignados</p>
                      <button className="bg-new-purple hover:bg-deep-orange h-7 w-7 rounded-full"></button>
                  </div>
                  <div className="flex justify-center bg-new-purple hover:bg-deep-orange py-2 -mx-3 my-4">
                  <p className="text-white text-lg font-bold">Cantidad</p>
                  </div>
                  <div className="flex justify-center  mt-3">
                      <button className="w-full bg-new-purple hover:bg-deep-orange button_tech_5">click</button>
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
        <div className="bg-new-blue rounded-full mb-2">
            <p className="text-white text-center font-bold">Notificaciones</p>
        </div>
        <div>
        <Card className='bg-white p-2 shadow mb-2'>
          <div className=''>
              <div className='flex justify-end'>
                  <div className='text-xs bg-new-blue rounded-full px-3 text-white'>fecha</div>
              </div>
              <div className='inline-flex justify-between px-2'>
                  <div className='grid content-center'>
                      <InformationCircleIcon className='text-new-blue w-10 h-10'/>
                  </div>
                  <div className='px-2'>
                      <div className='text-sm text-new-blue font-bold'>Asunto</div>
                      <div className='text-sm text-new-blue font-normal'>Mensaje</div>
                  </div>
              </div>
              <div className='flex justify-end'>
              <div className='text-xs bg-new-blue rounded-full px-3 text-white'>Leído</div>
              </div>
          </div>
        </Card>
        <Card className='bg-white p-2 shadow'>
          <div className=''>
              <div className='flex justify-end'>
                  <div className='text-xs bg-new-blue rounded-full px-3 text-white'>fecha</div>
              </div>
              <div className='inline-flex justify-between px-2'>
                  <div className='grid content-center'>
                      <InformationCircleIcon className='text-new-blue w-10 h-10'/>
                  </div>
                  <div className='px-2'>
                      <div className='text-sm text-new-blue font-bold'>Asunto</div>
                      <div className='text-sm text-new-blue font-normal'>Mensaje</div>
                  </div>
              </div>
              <div className='flex justify-end'>
              <div className='text-xs bg-new-blue rounded-full px-3 text-white'>Leído</div>
              </div>
          </div>
        </Card>
        </div>
    </Card>
    
    <Card className="bg-new-fondo p-3 mb-2">
        <div className="bg-new-green rounded-full mb-2">
            <p className="text-white text-center font-bold">Eventos</p>
        </div>
        <div>
        <Card className='bg-white p-2 shadow mb-2'>
          <div className=''>
              <div className='flex justify-end'>
                  <div className='text-xs bg-new-blue rounded-full px-3 text-white'>fecha</div>
              </div>
              <div className='inline-flex justify-between px-2'>
                  <div className='grid content-center'>
                      <InformationCircleIcon className='text-new-blue w-10 h-10'/>
                  </div>
                  <div className='px-2'>
                      <div className='text-sm text-new-blue font-bold'>Asunto</div>
                      <div className='text-sm text-new-blue font-normal'>Mensaje</div>
                  </div>
              </div>
              <div className='flex justify-end'>
              <div className='text-xs bg-new-blue rounded-full px-3 text-white'>Leído</div>
              </div>
          </div>
        </Card>
        <Card className='bg-white p-2 shadow'>
          <div className=''>
              <div className='flex justify-end'>
                  <div className='text-xs bg-new-blue rounded-full px-3 text-white'>fecha</div>
              </div>
              <div className='inline-flex justify-between px-2'>
                  <div className='grid content-center'>
                      <InformationCircleIcon className='text-new-blue w-10 h-10'/>
                  </div>
                  <div className='px-2'>
                      <div className='text-sm text-new-blue font-bold'>Asunto</div>
                      <div className='text-sm text-new-blue font-normal'>Mensaje</div>
                  </div>
              </div>
              <div className='flex justify-end'>
              <div className='text-xs bg-new-blue rounded-full px-3 text-white'>Leído</div>
              </div>
          </div>
        </Card>
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
  })(DashboardInspector);
