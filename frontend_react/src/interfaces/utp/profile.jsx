import PageUser from "../../hocs/layouts/PageUser";
import PageHeading from "../../components/heros/pageHeading";
import { connect } from "react-redux";
import SideBar from "../../components/users/sidebar";
import { utp_maps } from "../../helpers/users_helpers";
import { useEffect, useState } from "react";
import ProfileImg from "../../assets/imagenes/ProfileImg.svg";
import { get_avatar } from '../../api/axiosAvatar';



const Profile = ({ user }) => {
  const [userData, setUserData] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

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

  return (
    <PageUser color={'bg-white text-blue'} colorInput={'bg-white text-blue'} >
      <SideBar color={'bg-blue'} userData={userData} useRol="UTP" mapeo={utp_maps}>
        <div className="w-full md:w-4/5 bg-UTP-bg p-4 h-full shadow-md">
          <div className="w-full mx-auto max-w-7xl">
            <div className="grid grid-cols-1 gap-4 mb-5">
              <PageHeading
                colorText={'text-blue text-center md:text-left pl-[70px] md:pl-0'}
                colorButton={'invisible bg-UTP-des'}
                border={'border-UTP-des my-0'}
                title='Perfil'
                button='Activo'
              />
              <div className='bg-UTP-comp border-l-[10px] border-UTP-des rounded-[20px] p-3 shadow-md sm:grid-cols-2'>
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
                  <div className='flex justify-center md:justify-start md:justify-items-center px-3'>
                    <img src={profileImage ? profileImage : ProfileImg} alt="Profile" />
                  </div>
                  <div className='grid col-span-2 content-center text-center md:text-left lg:-m-10 md:-m-2 -m-1 px-3'>
                    <p className='text-xl3 text-blue font-bold'>{userData.first_name + ' ' + userData.last_name}</p>
                    <p className='text-xl2 text-blue font-medium'>{userData.rol}</p>
                  </div>
                  <div className='grid col-span-1 sm:col-span-2 content-end md:content-end -ml-0 sm:-ml-90px'>
                    <div className='flex flex-col md:flex-row justify-center md:justify-evenly'>
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1">
              <div className='bg-UTP-comp border-l-[10px] border-UTP-des rounded-[20px] p-3'>
                <div className='text-light-white text-lg font-bold'>
                  <p className='text-xl2 text-blue font-medium mb-3 text-center md:text-left border-b border-UTP-des'>Información de Usuario</p>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                    <div className="mb-1">
                      <p className='inline-block rounded-t-lg py-0.7 px-5 bg-UTP-des text-xl1 text-white font-medium'>Nombres</p>
                      <p className='bg-UTP-bg rounded-b-lg py-0.7 rounded-tl-none px-5 text-xl1 text-blue font-medium'>{userData.first_name}</p>
                    </div>
                    <div className="mb-1">
                      <p className='inline-block rounded-t-lg py-0.7 px-5 bg-UTP-des text-xl1 text-white font-medium'>Apellidos</p>
                      <p className='bg-UTP-bg rounded-b-lg py-0.7 rounded-tl-none px-5 text-xl1 text-blue font-medium'>{userData.last_name}</p>
                    </div>
                  </div>

                  <p className='text-xl2 text-white font-medium mb-3 text-center md:text-left border-b border-UTP-des'>Información de Contacto</p>
                  <div className="grid grid-cols-3 gap-2 sm:grid-cols-3">
                    <div className="mb-1">
                      <p className='inline-block rounded-t-lg py-0.7 px-5 bg-UTP-des text-xl1 text-white font-medium'>Dirección</p>
                      <p className='bg-UTP-bg rounded-b-lg py-0.7 rounded-tl-none px-5 text-xl1 text-blue font-medium'>{userData.email}</p>
                    </div>
                    <div className="mb-1">
                      <p className='inline-block rounded-t-lg py-0.7 px-5 bg-UTP-des text-xl1 text-white font-medium'>Teléfono</p>
                      <p className='bg-UTP-bg rounded-b-lg py-0.7 rounded-tl-none px-5 text-xl1 text-blue font-medium'>{userData.rol}</p>
                    </div>
                    <div className="justify-self-center">
                      
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
  user: state.Auth.user,
});

export default connect(mapStateToProps, {})(Profile);
