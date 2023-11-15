// React Functions
import { useEffect, useState } from "react";
import { connect } from "react-redux";
//Components
import PageUser from "../../hocs/layouts/PageUser";
import SideBar from "../../components/users/sidebar";
import PageHeading from "../../components/heros/pageHeading";
import { DirectorRoutes } from "../../helpers/users_routes";
// Images
import { director_maps } from "../../helpers/users_helpers";
import { Card, progress } from "@material-tailwind/react";
import { TabsVerticalUI } from "../../components/users/tabsVerticalUI";
import toast from "react-hot-toast";
import { put_avatar, get_avatar } from "../../api/axiosAvatar";
import ProfileImg from "../../assets/imagenes/ProfileImg.svg";
import { Navigate } from "react-router-dom";

const Settings = ({  user }) => {
  const [profileImage, setProfileImage] = useState(null);
    const [userData, setUserData] = useState('');
    const [image, setImage] = useState();
    const [previewImage, setPreviewImage] = useState(null);
    const [percentage, setPercentage] = useState(0);
    const [success, setSuccess] = useState(false)
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    useEffect(() => {

        if (user) {
          setUserData(user);
        }
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
    
      }, [user]);

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



    const onSubmitImage = async (e) => {
      e.preventDefault();
      try {
          const response = await put_avatar(image);
          if (response && response.data) {
              setProfileImage(previewImage); 
              toast.custom((t) => (
                  <Card className="bg-admin-black border-l-4 border-admin-green p-5 mt-0 mb-3 text-white rounded-[10px]">
                      <p>Imagen subida con éxito</p>
                  </Card>
              ));
              setSuccess(true);
          }
      } catch (error) {
          console.error('Error al subir el Avatar', error);
          toast.error('Error al subir la imagen.');
      }
  };
    if (success){
        return <Navigate to={DirectorRoutes.Profile}/>
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
              label: "Cambiar Contraseña",
              value: "Create",
              desc: 
              <>
                <Card className="h-full w-full overflow-scroll bg-white p-5 mt-0 text-blue rounded-[10px]">
                </Card>
              </>,
            },
            // ... otros datos 
          ];
    return(
        <PageUser color={'bg-white text-blue'} colorInput={'bg-white text-blue'} >

          <SideBar color={'bg-blue'} userData={userData} useRol={'Director'} mapeo={director_maps}>
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
    isAuthenticated: state.Auth.isAuthenticated,
    user: state.Auth.user
  });
  export default connect(mapStateToProps,{
  })(Settings);