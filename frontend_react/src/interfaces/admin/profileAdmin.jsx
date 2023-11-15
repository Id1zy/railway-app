import Page from "../../hocs/layouts/PageUser";
import PageHeading from "../../components/heros/pageHeading";
import { connect } from "react-redux";
import SideBar from "../../components/users/sidebar";
import { index_admin } from "../../helpers/users_helpers";
import { useEffect, useState } from "react";
import ProfileImg from "../../assets/imagenes/ProfileImg.svg";
import { AdminRoutes } from "../../helpers/users_routes";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";




const ProfileAdmin = ({user}) => {
  const [userData, setUserData] = useState('');

  useEffect(() => {

    if (user) {
      setUserData(user);
    }
  }, [user]);
  

    return(
        <Page color={'bg-admin-black text-white'} colorInput={'bg-admin-input text-white placeholder-white'} >
          <SideBar color={'bg-admin-black'} colorSecond={'admin-green'}  useRol={'Administrador'} mapeo={index_admin}>
            <div className="flex w-full md:w-4/5 bg-admin-background p-4 h-full">
    <div className="w-full mx-auto max-w-7xl ">
      <div className="grid grid-cols-1 gap-4 mb-5">
      <div className=''>
    <div className='flex content-center items-center justify-between mx-2 my-6 border-b-4 pb-4 border-admin-green'>
    <div className="flex items-center">
            <Link to={AdminRoutes.Dashboard}><ArrowLeftIcon className="h-6 w-6 text-admin-green hover:text-white hover:rounded-full hover:bg-admin-green"/></Link>

        </div>
      <div className="min-w-0 flex-1">
        <h2 className='text-xl2 sm:text-xl3 text-center font-bold leading-7 text-white '>
          Perfil
        </h2>
      </div>
    </div>
    </div>
        <div className='bg-admin-black rounded-[20px] p-3'>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
            <div className='flex justify-center md:justify-start md:justify-items-center pl-3'>
              <img src={ProfileImg} alt="Profile" />
            </div>
            <div className='grid col-span-2 content-center text-center md:text-left lg:-m-10 md:-m-2 -m-1'>
              <p className='text-xl3 text-white font-bold'>{userData.get_full_name}</p>
              <p className='text-xl text-white font-medium'>{userData.rol}</p>
            </div>
            <div className='grid col-span-1 sm:col-span-2 content-end md:content-end -ml-0 sm:-ml-90px'>
  <div className='flex flex-col md:flex-row justify-center md:justify-evenly'>

    <Link to={AdminRoutes.Settings} className='w-full md:flex-1 md:w-40 bg-admin-green text-center text-white rounded-lg py-2 px-4'>
      Configuración
    </Link>
  </div>
</div>

          </div>
        </div>
      </div>

      <div className="grid grid-cols-1">
        <div className='bg-admin-black rounded-[20px] p-3'>
          <div className='text-light-white text-lg font-bold '>

            <p className='text-xl2 text-white font-medium mb-3 text-center md:text-left border-b border-admin-green'>Detalles de Usuario</p>

            
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 ">
            <div class="grid grid-rows-1  gap-4 sm:grid-rows-2">
              <div className="mb-1">
                <p className='w-full inline-block rounded-t-lg px-5 bg-admin-green text-xl1 text-white font-medium'>Correo Electrónico</p>
                <p className='bg-admin-input rounded-[5px] px-5 text-xl1 text-white font-medium'>{userData.email}</p>
              </div>
              <div className="mb-1">
                <p className='w-full inline-block rounded-t-lg px-5 bg-admin-green text-xl1 text-white font-medium'>Rol</p>
                <p className='bg-admin-input rounded-[5px] px-5 text-xl1 text-white font-medium'>{userData.rol}</p>
              </div>
            </div>
            <div class="grid grid-rows-1 gap-4 sm:grid-rows-2">
              <div className="mb-1">
                <p className='w-full inline-block rounded-t-lg px-5 bg-admin-green text-xl1 text-white font-medium'>Nombre</p>
                <p className='bg-admin-input rounded-[5px] px-5 text-xl1 text-white font-medium'>{userData.first_name}</p>
              </div>
              <div className="mb-1">
                <p className='w-full inline-block rounded-t-lg px-5 bg-admin-green text-xl1 text-white font-medium'>Apellido</p>
                <p className='bg-admin-input rounded-[5px] px-5 text-xl1 text-white font-medium'>{userData.last_name}</p>
              </div>
            </div>
            </div>
          </div>  
        </div>
      </div>
    </div> 
</div>
          </SideBar>
   </Page>
    )
}


const mapStateToProps = state => ({
  user: state.Auth.user,
  });
  export default connect(mapStateToProps,{
  })(ProfileAdmin);