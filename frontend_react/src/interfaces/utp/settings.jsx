// React Functions
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { set_password } from "../../redux/actions/auth";
//Components
import PageUser from "../../hocs/layouts/PageUser";
import SideBar from "../../components/users/sidebar";
import PageHeading from "../../components/heros/pageHeading";
import { StudentRoutes, PublicRoutes } from "../../helpers/users_routes";
// Images
import { utp_maps } from "../../helpers/users_helpers";
import { Card } from "@material-tailwind/react";
import { TabsVerticalUI } from "../../components/users/tabsVerticalUI";
import toast from "react-hot-toast";
import { put_avatar, get_avatar } from "../../api/axiosAvatar";
import ProfileImg from "../../assets/imagenes/ProfileImg.svg";
import { Navigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { logout } from "../../redux/actions/auth";
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/20/solid';


const SettingsUTP = ({ user, set_password, loading, logout }) => {
  const [profileImage, setProfileImage] = useState(null);
  const [userData, setUserData] = useState('');
  const [image, setImage] = useState();
  const [previewImage, setPreviewImage] = useState(null);
  const [percentage, setPercentage] = useState(0);
  const [success, setSuccess] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [exit, setLogout] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);

  const form = useForm();
  const { register, handleSubmit, formState, reset } = form;
  const { errors } = formState;

  useEffect(() => {
    if (user) {
      setUserData(user);
    }

    async function loadProfileImage() {
      try {
        const res = await get_avatar();
        if (res && res.data) {
          setProfileImage(res.data.avatar);
        }
      } catch (error) {
        console.error('Error al cargar el Avatar', error);
      }
    }

    loadProfileImage();
  }, [user]);

  const onSubmit = async (data) => {
    if (data.password === data.re_password) {
      try {
        await set_password(data.password, data.re_password, data.current_password);
        toast.success('Contraseña cambiada con éxito');
        reset(); 
      } catch (error) {
        console.error('Error al cambiar la contraseña:', error);
        toast.error('Error al cambiar la contraseña.');
      }
    } else {
      toast.error('Las contraseñas no coinciden.');
    }
  };
      

    if(redirect){
      return <Navigate to={PublicRoutes.Login} />
    }


    const fileSelectedHandler = (e) =>{
        e.preventDefault();
        const file = e.target.files[0];
        const options = {
            onUploadProgress: (ProgressEvent) =>{
                const {loaded, total} = ProgressEvent;
                let percent = Math.floor((loaded*100)/total);
                if (percent<100){
                    setPercentage(percent);
                }
            }
        }
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = (e)=>{setPreviewImage(reader.result)};
        setImage(file);
        setPercentage(options);
    }
    const onSubmitImage = e =>{
        e.preventDefault();
        toast.custom((t)=>( <Card className="bg-admin-black border-l-4 border-admin-green p-5 mt-0 mb-3 text-white rounded-[10px]"> <p>Imagen subida con éxito</p></Card>))
        put_avatar(image)
        setSuccess(true);
    }
    if (success){
        return <Navigate to={StudentRoutes.Profile}/>
    }

    
    
        const data = [
            {
              label: "Editar Foto",
              value: "Read",
              desc:
              <>
                 <Card className="h-full w-full overflow-scroll bg-white p-5 mt-0 mb-3 text-blue rounded-[10px]">
                    <form onSubmit={(e)=>onSubmitImage(e)}>
                        <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
                            <div className='flex justify-center md:justify-start md:justify-items-center pl-3'>
                                <img src={profileImage ? profileImage : ProfileImg} alt="Profile" />
                            </div>
                            <div className='grid col-span-2 content-center text-center md:text-left  -m-1'>
                                <p className='text-xl3 text-blue font-bold'>Avatar</p>
                                 <input type="file"
                                 onChange={e=>fileSelectedHandler(e)} 
                                 className="block w-full text-sm text-slate-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-blue file:text-white
          hover:file:bg-light-blue
        "/>
                            </div>
                            <div className='grid col-span-1 sm:col-span-2 content-end md:content-end -ml-0 sm:-ml-90px'>
                                <div className='flex flex-col md:flex-row justify-center md:justify-evenly'>
                                    <button className='w-full font-bold md:flex-1 md:w-40 mb-2 md:mb-0 sm:mr-2 bg-blue text-white rounded-lg py-2 px-4'>
                                        Guardar Cambios
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                    <div style={{width: `${percentage}`}} className={`h-full bg-white ${percentage < 70 ? 'bg-deep-red' : 'bg-admin-green'}`}>
    </div>
                 </Card>
                 {previewImage ? <>
                 
                 <Card className="h-full w-full overflow-scroll bg-white p-5 mt-0 text-blue rounded-[10px]">
                 <p className="text-blue font-bold text-xl text-center mb-2">Imágen Seleccionada</p>
                 <div className="flex justify-center border border-blue">
                 <img src={previewImage} className="w-[200px] h-[200px]"/>
                 </div>
                    
                    </Card></> : <></>}
              </>
    
    
            },
            {
              label: 'Cambiar Contraseña',
              value: 'Create',
              desc: (
                <Card className="h-full w-full bg-white p-5 mt-0 text-blue rounded-[10px]">
                  <h1 className="text-xl3 text-center font-bold leading-tight tracking-tight text-blue md:text-2xl dark:text-white">
                    Cambio de Contraseña
                  </h1>
                  <form className="space-y-3 md:space-y-3" onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div>
                      <label htmlFor="password" className="block mb-2 text-sm font-semibold text-blue dark:text-white">
                        Contraseña Nueva
                      </label>
                      <div className="flex items-center">
                        <input type={showNewPassword ? 'text' : 'password'} id="password" {...register('password', { required: 'La contraseña es requerida.' })} placeholder="••••••••" className="input-tech flex-1" />
                        <button type="button" onClick={() => setShowNewPassword(!showNewPassword)} className="ml-2">
                          {showNewPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label htmlFor="re_password" className="block mb-2 text-sm font-semibold text-blue dark:text-white">
                        Escriba Nuevamente su Contraseña
                      </label>
                      <div className="flex items-center">
                        <input type={showRepeatPassword ? 'text' : 'password'} id="re_password" {...register('re_password', { required: 'La confirmación de la contraseña es requerida.' })} placeholder="••••••••" className="input-tech flex-1" />
                        <button type="button" onClick={() => setShowRepeatPassword(!showRepeatPassword)} className="ml-2">
                          {showRepeatPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label htmlFor="current_password" className="block mb-2 text-sm font-semibold text-blue dark:text-white">
                        Contraseña Actual
                      </label>
                      <div className="flex items-center">
                        <input type={showCurrentPassword ? 'text' : 'password'} id="current_password" {...register('current_password', { required: 'La contraseña actual es requerida.' })} placeholder="••••••••" className="input-tech flex-1" />
                        <button type="button" onClick={() => setShowCurrentPassword(!showCurrentPassword)} className="ml-2">
                          {showCurrentPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-center mt-4">
                      {loading ? (
                        <button type="button" className="w-full button_tech_2 text-white">
                          Cargando...
                        </button>
                      ) : (
                        <button type="submit" className="w-full button_tech_2">
                          Cambiar Contraseña
                        </button>
                      )}
                    </div>
                  </form>
                </Card>
              ),
            },
          ];
    return(
        <PageUser color={'bg-white text-blue'} colorInput={'bg-white text-blue'} >

          <SideBar  color={'bg-blue'} userData={userData} useRol="UTP" mapeo={utp_maps}>
            {/* Parte Central */}
            <div className="w-full md:w-4/5 bg-fondo p-4 h-full overflow-y-auto">    
            <div className="mx-auto max-w-7xl mt-4">
            <div className="grid grid-cols-1 gap-4 mb-5">
            <PageHeading colorText={'text-blue'} colorButton={'hidden'} border={'border-blue my-0'} title='Configuración' button=''/>
              <TabsVerticalUI data={data}/>
            
            </div>
            </div>
            </div>

 


  

          </SideBar>

   </PageUser>
  );
}




  const mapStateToProps = state => ({
    loading: state.Auth.loading,
    auth: state.Auth.isAuthenticated
})
  
export default connect(mapStateToProps, {
    set_password,
    logout
  }) (SettingsUTP)