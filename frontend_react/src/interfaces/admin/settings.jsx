import { useState, useEffect } from "react";
import React from "react";
import { connect } from "react-redux";
//Components
import PageUser from "../../hocs/layouts/PageUser";
import SideBar from "../../components/users/sidebar";
// Helpers
import { index_admin } from "../../helpers/users_helpers";
import { TabsVerticalCustomAnimation } from "../../components/tabsVertical";
import { Card, progress } from "@material-tailwind/react";
import ProfileImg from "../../assets/imagenes/ProfileImg.svg";
import { set_password } from "../../redux/actions/auth";
import toast from "react-hot-toast";
import { put_avatar, get_avatar } from "../../api/axiosAvatar";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useForm } from 'react-hook-form';
import Dotloader from "react-spinners/DotLoader";
import { logout } from "../../redux/actions/auth";
import { Link } from "react-router-dom";
import { AdminRoutes } from "../../helpers/users_routes";



const SettingsAdmin = ({  set_password, loading, logout }) => {
const [image, setImage] = useState();
const [previewImage, setPreviewImage] = useState(null);
const [percentage, setPercentage] = useState(0);
    const [success, setSuccess] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const [exit, setLogout] = useState(false);
const [formData, setFormData] = useState({
    userID:0,
  })
const {userID} = formData

const form = useForm()
    
      const {register, handleSubmit, formState, watch} = form
      const {errors} = formState
      const onSubmit = (data) => {
        if (data['password'] === data['re_password']) {
          try {
            set_password(data['password'], data['re_password'], data['current_password']);



          } catch (error) {
            console.error('Error al cambiar la contraseña:', error);
      
            // Mostrar un mensaje de error genérico
            toast.error('Ha sucedido un error al cambiar la contraseña.');
          }
        } else {
          toast.error('Las contraseñas no coinciden.');
        }
      };
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
    const formData = new FormData();
    formData.append('image', image, image.name);
    formData.append('id', userID);

    put_avatar(formData['image'])
        setPercentage(100);
        setTimeout(()=>{
            setPercentage(0)
        }, 1000);
}
const onSubmitPassword = e =>{
    e.preventDefault();
    console.log('Ruta Password')
}


  useEffect(() => {
  }, []);


    const data = [
        {
          label: "Editar Foto",
          value: "Read",
          desc:
          <>
             <Card className="h-full w-full overflow-scroll bg-admin-black p-5 mt-0 mb-3 text-white rounded-[10px]">
                <form onSubmit={(e)=>onSubmitImage(e)}>
                    <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
                        <div className='flex justify-center md:justify-start md:justify-items-center pl-3'>
                            <img src={ProfileImg} alt="Profile" />
                        </div>
                        <div className='grid col-span-2 content-center text-center md:text-left  -m-1'>
                            <p className='text-xl3 text-white font-bold'>hola</p>
                             <input type="file"
                             onChange={e=>fileSelectedHandler(e)} 
                             className="block w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-admin-green file:text-white
      hover:file:bg-violet-100
    "/>
                        </div>
                        <div className='grid col-span-1 sm:col-span-2 content-end md:content-end -ml-0 sm:-ml-90px'>
                            <div className='flex flex-col md:flex-row justify-center md:justify-evenly'>
                                <button className='w-full font-bold md:flex-1 md:w-40 mb-2 md:mb-0 sm:mr-2 bg-admin-green text-white rounded-lg py-2 px-4'>
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
             
             <Card className="h-full w-full overflow-scroll bg-admin-black p-5 mt-0 text-white rounded-[10px]">
             <p className="text-white font-bold text-xl text-center mb-2">Imágen Seleccionada</p>
                <img src={previewImage} className="w-50 h-50"/>
                </Card></> : <></>}
          </>


        },
        {
          label: "Cambiar Contraseña",
          value: "Create",
          desc: 
          <>
          <Card className="h-full w-full overflow-scroll bg-white p-5 mt-0 text-admin-green rounded-[10px]">
          <h1 className="text-xl3 text-center font-bold leading-tight tracking-tight text-admin-green md:text-2xl dark:text-white">
              Cambio de Contraseña
          </h1>
          <form className="space-y-3 md:space-y-3" onSubmit={handleSubmit(onSubmit)} noValidate>


          <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-semibold text-admin-green dark:text-white">Contraseña Nueva</label>
                  <input type="password"  id="password"
                  {...register('password',{
                    required: {
                      value: true,
                      message: "La contraseña es requerida.",
                    },
              
                  })}
                   placeholder="••••••••" 
                   className={errors.password? 'input-tech border-2 border-red-500' : 'border-none input-tech'}
                    required=""/>
              <p className="text-red-500 text-sm flex items-start justify-start mt-1">{errors.password?.message }</p>
              </div>
              <div>
                  <label htmlFor="re_password" className="block mb-2 text-sm font-semibold text-admin-green dark:text-white">Escriba Nuevamente su contraseña</label>
                  <input type="password"  id="re_password"
                  {...register('re_password',{
                    required: {
                      value: true,
                      message: "La contraseña es requerida.",
                      
                    },
                    validate: (val) => {
                      if (watch('password') != val) {
                        return "Tus contraseñas no coiciden.";
                      }
                  },
              
                  })}
                   placeholder="••••••••" 
                   className={errors.re_password? 'input-tech border-2 border-red-500' : 'border-none input-tech'}
                    required=""/>
              <p className="text-red-500 text-sm flex items-start justify-start mt-1">{errors.re_password?.message }</p>
              </div>
              <div>
                  <label htmlFor="current_password" className="block mb-2 text-sm font-semibold text-admin-green dark:text-white">Contraseña Actual</label>
                  <input type="password"  id="current_password"
                  {...register('current_password',{
                    required: {
                      value: true,
                      message: "La contraseña es requerida.",
                    },
              
                  })}
                   placeholder="••••••••" 
                   className={errors.current_password? 'input-tech border-2 border-red-500' : 'border-none input-tech'}
                    required=""/>
              <p className="text-red-500 text-sm flex items-start justify-start mt-1">{errors.current_password?.message }</p>
              </div>
              <div className="flex items-center justify-between">

                  
              </div>
              { loading ? <button type="button" className="w-full button_tech_2  text-white">
<Dotloader color="white" size="20" />
</button>: <button type="submit" className="w-full button_tech_2 !bg-admin-green ">Cambiar</button>}
          </form>
          </Card>
          </>,
        },
      ];

    return(
        <PageUser color={'bg-admin-black text-white'} colorInput={'bg-admin-input text-white placeholder-white'}>
          <SideBar  color={'bg-admin-black'} colorSecond={'admin-green'} useRol={'Administrador'} mapeo={index_admin}>
            {/* Parte Central */}
            <div className="w-full md:w-4/5 bg-admin-background p-4 h-full overflow-y-auto">    
            <div className="mx-auto max-w-7xl mt-4">
            <div className="grid grid-cols-1 gap-4 mb-5">
            <div className=''>
    <div className='flex content-center items-center justify-between mx-2 my-6 border-b-4 pb-4 border-admin-green'>
    <div className="flex items-center">
            <Link to={AdminRoutes.Profile}><ArrowLeftIcon className="h-6 w-6 text-admin-green hover:text-white hover:rounded-full hover:bg-admin-green"/></Link>

        </div>
      <div className="min-w-0 flex-1">
        <h2 className='text-xl2 sm:text-xl3 text-center font-bold leading-7 text-white '>
          Configuraciones
        </h2>
      </div>
    </div>
    </div>
              <TabsVerticalCustomAnimation data={data}/>
            
            </div>
            </div>
            </div>


          </SideBar>

   </PageUser>
    )
}


const mapStateToProps = state => ({
  loading: state.Auth.loading,
    auth: state.Auth.isAuthenticated
  });
  export default connect(mapStateToProps,{
    set_password,
    logout
  })(SettingsAdmin);