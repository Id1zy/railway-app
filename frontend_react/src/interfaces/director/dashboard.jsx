import PageUser from "../../hocs/layouts/PageUser";
import PageHeading from "../../components/heros/pageHeading";
import { connect } from "react-redux";
import { NavLink, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import SideBar from "../../components/users/sidebar";
import { director_maps } from "../../helpers/users_helpers";
import { DirectorRoutes } from "../../helpers/users_routes";
import BarChart from "../../components/chart/BarChart";
import { Card } from "@material-tailwind/react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { dashboardList } from "../../api/axiosCourses";

const Dashboard_Professor = ({ isAuthenticated, user }) => {
  const [userData, setUserData] = useState('');
  const [dash, setDash] = useState([]);

  useEffect(() => {
    if (!isAuthenticated) {
      return <Navigate to={'/'} />;
    }

    const fetchData = async () => {
      try {
        const response = await dashboardList();
        if (response && response.data) {
            setDash(response.data); 
          }
      } catch (error) {
        console.error("Error al obtener datos del dashboard:", error);
      }
    };

    if (user) {
      setUserData(user);
      fetchData();
    }

  }, [isAuthenticated, user]);

    return(
        <PageUser color={'bg-white text-blue'} colorInput={'bg-white text-blue'} user={user} >
          <SideBar color={'bg-blue'} useRol={'Director'} mapeo={director_maps} >
                        {/* Parte Central */}
  <div className="w-full md:w-3/5 bg-fondo p-4 h-full overflow-y-auto"> 

<header className="bg-white shadow m-2 rounded-lg bg-tech flex items-center justify-center">
<div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex items-center justify-center">
  <h1 className="text-3xl font-bold tracking-tight text-white">Bienvenido {userData.get_full_name} </h1>
</div>
</header>
<PageHeading colorText={'text-new-blue'} colorButton={'invisible'} border={'border-new-blue'} title='Dashboard' button=''/>

      <main className="">
        <div className="mx-auto max-w-7xl mt-4">
          {/* Parámetros */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">

            <div className="bg-white shadow rounded-[20px] p-3">
                <div className="flex justify-between">
                    <p className="text-new-green text-lg font-bold">Cursos</p>
                </div>
                <div className="flex justify-center bg-new-green py-2 -mx-3 my-4">
                    <p className="text-white text-lg font-bold">Cantidad: {dash.course_count}</p>
                </div>
            </div>
            <div className="bg-white shadow rounded-[20px] p-3">
                <div className="flex justify-between">
                    <p className="text-new-blue text-lg font-bold">Profesores</p>
                </div>
                <div className="flex justify-center bg-new-blue py-2 -mx-3 my-4">
                    <p className="text-white text-lg font-bold">Cantidad: {dash.profesor_count}</p>
                </div>
            </div>
            <div className="bg-white shadow rounded-[20px] p-3">
                <div className="flex justify-between">
                    <p className="text-new-red text-lg font-bold">Inspectores</p>
                </div>
                <div className="flex justify-center bg-new-red py-2 -mx-3 my-4">
                    <p className="text-white text-lg font-bold">Cantidad: {dash.inspector_count}</p>
                </div>
            </div>
            <div className="bg-white shadow rounded-[20px] p-3">
                <div className="flex justify-between">
                    <p className="text-new-purple text-lg font-bold">UTP</p>
                </div>
                <div className="flex justify-center bg-new-purple py-2 -mx-3 my-4">
                    <p className="text-white text-lg font-bold">Cantidad: {dash.utp_count}</p>
                </div>
            </div>
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
  })(Dashboard_Professor);