// React Functions
import React, { useEffect, useState} from "react";
import { connect } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import Portal from "../../components/core/Portal";
//Functions
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
//Components
import { Card} from "@material-tailwind/react";
import { ArrowLeftIcon,DocumentIcon} from '@heroicons/react/20/solid'
import PageUser from "../../hocs/layouts/PageUser";
import SideBar from "../../components/users/sidebar";
import DeleteFile from "../../components/forms/delete/deleteFile";
import { deleteFile, getMedicalCertificate } from "../../api/axiosMedicalCertificate";
//Others
import { guardian_maps } from "../../helpers/users_helpers";
import { GuardianRoutes } from "../../helpers/users_routes";
import { getFile} from "../../api/axiosSharedFiles";
import { useForm } from 'react-hook-form';

const EditMedical = ({  user }) => {
  const [userData, setUserData] = useState('');
  const [file, setFile] = useState([]);
  const [name_, setName] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [type, setType] = useState('');
  const [update, setUpdate] = useState(0);
  const [success, setSuccess] = useState(false);
  const params = useParams()
  const form = useForm();
  const { register, handleSubmit, formState: { errors }, setValue} = form;

  const openModal = () => {
    setIsOpen(true)
  };

  const closeModal = () => {
    setIsOpen(false)
  };
  const openModal_delete = () => {
    setIsOpen2(true)
  };


  const closeModal_delete = () => {
    setIsOpen2(false)
  };

  const HandleDelete= (id) => {
    try{
      deleteFile(id);
      toast.error('Archivo Eliminado')
      closeModal_delete();
      return <Navigate to={GuardianRoutes.SharedFiles} />;
    }catch(e){console.log(e)}
  }



  useEffect(() => {
    if (user) {
      setUserData(user);}

      const loadFile = async () =>{
        try{
            const res =await getMedicalCertificate(params.file);
             
            setFile(res.data);
            console.log(res.data);
            setValue('tipo', res.data[0].description)
            if (file) {
                const originalFileName = res.data[0].name;
                const fileExtension = originalFileName.slice(((originalFileName.lastIndexOf(".") - 1) ) + 1);
                const fileName = originalFileName.substring(0, originalFileName.lastIndexOf("."));
                setType(fileExtension);
                setName(fileName);
                console.log(fileExtension, fileName)
                setValue('name',  originalFileName.substring(0, originalFileName.lastIndexOf(".")))
        }
    }catch(e){
            console.log(e);
        }
      }
      loadFile()
    

    return () => { setUpdate(0); } 
  }, [update, user]);

  const styles = ({
    true: 'text-blue placeholder-blue input_tech_search_colorless border-2 border-deep-red ring-2 ring-red ring-offset-deep-red focus:ring-transparent focus:border-none focus:ring-offset-admin-green',
    false: 'text-blue  placeholder-blue input_tech_search_colorless_2 border-none focus:ring-transparent focus:ring-offset-blue',
  });


  

    return(
        <PageUser color={'bg-white text-blue'} colorInput={'bg-white text-blue'} >

          <SideBar  color={'bg-blue'} userData={userData} useRol="Apoderado" mapeo={guardian_maps}>
            {/* Parte Central */}
           
            <div className="w-full md:w-4/5 bg-fondo p-4 h-full shadow-md overflow-y-auto"> 
            <div className=''>
    <div className='flex content-center items-center justify-between mx-2 my-6 border-b-4 pb-4 border-blue'>
    <div className="flex items-center">
            <Link to={GuardianRoutes.SharedFiles}><ArrowLeftIcon className="h-6 w-6 text-blue hover:text-white hover:rounded-full hover:bg-blue"/></Link>

        </div>
      <div className="min-w-0 flex-1">
        <h2 className='text-xl2 sm:text-xl3 text-center font-bold leading-7 text-blue '>
          Configurar Archivo
        </h2>
      </div>
    </div>
    </div>


    <Card className="bg-white p-5">
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4  mb-1"> 
    
            <div className="col-span-3 mr-2  flexitems-center justify-center">
              <p className="font-bold ">{file.status === 'Publicado' ? <span className="!text-new-green">{file['status']}</span>:<span className="!text-new-dark-green">{file['status']}</span>}</p>
              <DocumentIcon className=" w-40 h-40 text-blue" />
            </div>
            <div className="grid grid-row-2 col-span-9">
            <div>
            <p className='w-full inline-block rounded-t-lg text-xl1 text-blue font-medium'>Nombre</p>
              <div className="inline-flex w-full  items-center">
              <input
                type="text"
                id="name"
                {...register('name', {
                  required: "El Nombre es requerido."
                })}
                className={errors.name ? `${styles.true}` : `${styles.false}`}
                placeholder="Nombre"
                readOnly
              />
              <p className="text-blue font-bold ml-4">{type}</p>
              </div>
              <p className="text-deep-red font-bold text-sm flex items-start justify-start mt-1">{errors.title?.message}</p>
            </div>

            <div>
            <p className='w-full inline-block rounded-t-lg text-xl1 text-blue font-medium'>Tipo</p>
              <div className="inline-flex w-full  items-center">
              <input
                type="text"
                id="tipo"
                {...register('tipo', {
                  required: "El Nombre es requerido."
                })}
                className={errors.name ? `${styles.true}` : `${styles.false}`}
                placeholder="Nombre"
                readOnly
              />
              </div>
              <p className="text-deep-red font-bold text-sm flex items-start justify-start mt-1">{errors.title?.message}</p>
            </div>
            </div>
           
          </div>
          <div className="flex justify-end space-x-2">


          <button  type="button" 
          onClick={()=>openModal_delete()}
          className='bg-new-red button_tech_colorless hover:bg-new-dark-red !px-2 !text-xs'>
            Eliminar  
          </button>

          </div>
     
    </Card>

          <Portal open={isOpen2} onClose={() => closeModal_delete()}>
          <Card className="w-full max-w-md shadow-none p-5 text-blue rounded-[10px]transition-all">
   
   <div className=" mb-2">
     <h2 className="text-xl font-bold text-blue text-center">
     ¿Quieres Eliminar este Archivo?
      </h2>
   </div>
   <div>
   <div className="inline-flex  items-center">
<button 
onClick={() => closeModal_delete()}
className='border-2 border-admin-blue !text-blue hover:!text-white hover:bg-admin-blue button_tech_colorless mr-2'>Cancelar</button>
<button 
onClick={() => HandleDelete(params.file)}
className='border-2 border-admin-red !text-admin-red hover:!text-white hover:bg-admin-red button_tech_colorless'>Eliminar</button>
</div>
   </div>
</Card>
          </Portal>

            
            
            
            
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
  })(React.memo(EditMedical));