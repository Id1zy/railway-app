// ICO
import { UserCircleIcon, Cog6ToothIcon, ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline';
// React Functions
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
//Components
import PageUser from "../../hocs/layouts/PageUser";
import SideBar from "../../components/users/sidebar";
import PageHeading from '../../components/heros/pageHeading';
// Images
import ProfileImg from "../../assets/imagenes/ProfileImg.svg";
import { secretary_maps } from "../../helpers/users_helpers";
import CalendarOne from '../../components/calendars/calendarOne';

const ProfileSecretary = ({  user }) => {
  const [userData, setUserData] = useState('');

  useEffect(() => {

    if (user) {
      setUserData(user);
    }
  }, [user]);

    return(
        <PageUser color={'bg-white text-blue'} colorInput={'bg-white text-blue'} >

          <SideBar  color={'bg-blue'} userData={userData} useRol={'secretario'} mapeo={secretary_maps}>
            {/* Parte Central */}
            
            
            <div className="w-full md:w-4/5 bg-fondo p-4 h-full shadow-md overflow-y-auto">  
            <PageHeading colorText={'text-blue'} colorButton={'hidden'} border={'border-blue'} title='Perfil' button=''/>


    

      <CalendarOne>
<div className='lg:col-span-7 xl:col-span-8'>
<div className="grid grid-cols-1 sm:grid-cols-5 bg-white text-blue rounded-[20px] p-3 mb-3 shadow-tech-outer border-x-4 sm:border-l-4 border-blue">
            <div className='flex justify-center md:justify-start md:justify-items-center pl-3'>
              <img src={ProfileImg} alt="Profile" />
            </div>
            <div className='grid col-span-2 content-center text-center md:text-left sm:ml-2'>
              <p className='text-xl3 font-bold'>{userData.first_name} {userData.last_name} </p>
              <p className='text-xl font-bold'>{userData.rol}</p>
            </div>
            <div className='grid col-span-1 sm:col-span-2 content-end md:content-end -ml-0 sm:-ml-90px'>
  <div className='flex flex-col md:flex-row justify-center md:justify-evenly'>
    <button className='w-full md:flex-1 md:w-20 lg:w-30 mb-2 md:mb-0 sm:mr-2 bg-blue text-white font-bold rounded-lg py-2 px-2 md:px-1'>
      Mensajería
    </button>
    <button className='w-full md:flex-1 md:w-20 lg:w-30 bg-blue text-white rounded-lg font-bold py-2 px-2 md:px-1'>
      Configuración
    </button>
  </div>
</div>

          </div>


          <div className="grid grid-cols-1 mb-3">
        <div className='bg-white text-blue font-bold rounded-[20px] p-3 shadow-tech-outer border-x-4 sm:border-l-4 border-blue'>
          <div className=' text-lg font-bold '>
            <p className='text-xl2  mb-3 text-center md:text-left border-b-2 border-blue'>Detalles de Usuario</p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 ">
            <div class="grid grid-rows-1  gap-4 sm:grid-rows-2">
              <div className="mb-1">
                <p className='w-full inline-block rounded-t-lg px-5 bg-blue text-xl1 text-white font-medium'>Correo Electrónico</p>
                <p className='bg-white shadow-tech-inner rounded-b-lg px-5 text-xl1 font-medium'>{userData.email}</p>
              </div>
              <div className="mb-1">
                <p className='w-full inline-block rounded-t-lg px-5 bg-blue text-xl1 text-white font-medium'>Rol</p>
                <p className='bg-white shadow-tech-inner rounded-b-lg px-5 text-xl1 font-medium'>{userData.rol}</p>
              </div>
            </div>
            <div class="grid grid-rows-1 gap-4 sm:grid-rows-2">
              <div className="mb-1">
                <p className='w-full inline-block rounded-t-lg px-5 bg-blue text-xl1 text-white font-medium'>Nombre</p>
                <p className='bg-white shadow-tech-inner rounded-b-lg px-5 text-xl1 font-medium'>{userData.first_name} </p>
              </div>
              <div className="mb-1">
                <p className='w-full inline-block rounded-t-lg px-5 bg-blue text-xl1 text-white font-medium'>Apellido</p>
                <p className='bg-white shadow-tech-inner rounded-b-lg px-5 text-xl1 font-medium'>{userData.last_name}</p>
              </div>
            </div>
            </div>
          </div>  
        </div>
      </div>


</div>
      </CalendarOne>


     
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
  })(ProfileSecretary);