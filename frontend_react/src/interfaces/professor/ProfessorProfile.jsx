// ICO
import {ArrowLeftIcon} from '@heroicons/react/24/outline';
// React Functions
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, Navigate } from "react-router-dom";
//Components
import PageUser from "../../hocs/layouts/PageUser";
import SideBar from "../../components/users/sidebar";

// Images
import ProfileImg from "../../assets/imagenes/ProfileImg.svg";
import { profesor_maps } from "../../helpers/users_helpers";
import { ProfessorRoutes } from '../../helpers/users_routes';
import { get_avatar } from '../../api/axiosAvatar';

const ProfessorProfile = ({  user }) => {
  const [userData, setUserData] = useState('');
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    async function loadProfileImage() {
      try {
        const res = await get_avatar();
        if (res && res) {
          setProfileImage(res.data.avatar); 
        }
      } catch (error) {
        console.error('Error al cargar el Avatar', error);
      }
    }
    loadProfileImage();


    if (user) {
      setUserData(user);
    }
  }, [user]);

    return(
        <PageUser color={'bg-white text-blue'} colorInput={'bg-white text-blue'} >

          <SideBar  color={'bg-blue'} userData={userData} useRol="Profesor" mapeo={profesor_maps}>
            {/* Parte Central */}
            
            
            <div className="w-full md:w-4/5 bg-fondo p-4 h-full shadow-md overflow-y-auto">  
            <div className=''>
    <div className='flex content-center items-center justify-between mx-2 my-6 border-b-4 pb-4 border-blue'>
    <div className="flex items-center">
            <Link to={ProfessorRoutes.Dashboard}><ArrowLeftIcon className="h-6 w-6 text-blue hover:text-white hover:rounded-full hover:bg-blue"/></Link>

        </div>
      <div className="min-w-0 flex-1">
        <h2 className='text-xl2 sm:text-xl3 text-center font-bold leading-7 text-blue '>
          Perfil
        </h2>
      </div>
    </div>
    </div>


    
<div className='lg:col-span-7 xl:col-span-8'>
<div className="grid grid-cols-1 sm:grid-cols-5 bg-white text-blue rounded-[20px] p-3 mb-3 shadow-tech-outer border-x-4 sm:border-l-4 border-blue">
            <div className='flex justify-center md:justify-start md:justify-items-center pl-3'>
              <img src={profileImage ? profileImage : ProfileImg} alt="Profile" />
            </div>
            <div className='grid col-span-2 content-center text-center md:text-left sm:ml-2'>
              <p className='text-xl3 font-bold'>{userData.first_name} {userData.last_name}</p>
              <p className='text-xl font-bold'>{userData.rol}</p>
            </div>
            <div className='grid col-span-1 sm:col-span-2 content-end md:content-end -ml-0 sm:-ml-90px'>
  <div className='flex flex-col md:flex-row justify-center md:justify-evenly'>

    <Link to={ProfessorRoutes.Settings} className='w-full md:flex-1 md:w-20 lg:w-30 bg-blue text-center text-white rounded-lg font-bold py-2 px-2 md:px-1'>
      Configuración
    </Link>
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
                <p className='bg-white shadow-tech-inner rounded-b-lg px-5 text-xl1 font-medium'>{userData.first_name}</p>
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
  })(ProfessorProfile);