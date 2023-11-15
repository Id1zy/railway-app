// ICO
import { UserCircleIcon, Cog6ToothIcon, ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline';
// React Functions
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
//Components
import PageUser from "../../hocs/layouts/PageUser";
import SideBar from "../../components/users/sidebar";
// Images
import ProfileImg from "../../assets/imagenes/ProfileImg.svg";




const Profile = ({isAuthenticated, user}) => {
  const [userData, setUserData] = useState('');

  useEffect(() =>{
    if(!isAuthenticated){
     <Navigate to={'/'} />
    }
    if(user){
      setUserData(user);
    }
  }, [isAuthenticated,user])

    return(
        <PageUser  >
          <SideBar  userData={userData}>
            {/* Parte Central */}
            <div className="w-full md:w-4/5 bg-fondo p-4 h-full">    
            <div className="mx-auto max-w-7xl mt-4">
            <div className="grid grid-cols-1 gap-4 mb-5">
                <div className='bg-white border-l-[10px] border-blue rounded-[20px] p-3'>
                <div className="grid grid-cols-5 gap-4 ">
                    <div className='flex justify-start justify-items-center pl-3'>
                    <img  src={ProfileImg} />
                    </div>
                    <div className='grid col-span-2 content-center -m-10'>
                        <p className='text-xl3 text-blue font-bold'>Nombre del Estudiante</p>
                        <p className='text-xl text-blue font-medium'>Curso</p>
                    </div>
                    <div className='grid col-span-2 content-end -ml-[90px]'>
                        <div className='flex  justify-evenly'>
                        <butto className='flex-1 bg-blue button_tech w-40'>Mensajería</butto>
                        <butto className='flex-1 bg-blue button_tech w-40 ml-2'>Configuración</butto>
                        </div>
                        
                    </div>
                </div>
                </div>



            </div>
            </div>
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
  })(Profile);