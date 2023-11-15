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
import { editFile} from "../../api/axiosSharedFiles";
import DeleteFile from "../../components/forms/delete/deleteFile";
import DeactivateFile from "../../components/forms/deactivate/deactivateFile";
//Others
import { profesor_maps } from "../../helpers/users_helpers";
import { ProfessorRoutes } from "../../helpers/users_routes";
import { getFile} from "../../api/axiosSharedFiles";
import { useForm } from 'react-hook-form';

const EditFile = ({  user }) => {
  const [userData, setUserData] = useState('');
  const [file, setFile] = useState([]);
  const [name_, setName] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [type, setType] = useState('');
  const [update, setUpdate] = useState(0);
  const params = useParams()
  const form = useForm();
  const { register, handleSubmit, formState: { errors }, setValue} = form;
  const [color, setColor] = useState(
    window.localStorage.getItem("color"));

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




  useEffect(() => {
    if (user) {
      setUserData(user);}

      const loadFile = async () =>{
        try{
            const res =await getFile(params.file);
             
            setFile(res.data);
            console.log(res.data);
            setValue('tipo', res.data['description'] )
            if (file) {
                const originalFileName = res.data['name'];
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
    true: '${Style.textSchool} placeholder-blue input_tech_search_colorless border-2 border-deep-red ring-2 ring-red ring-offset-deep-red focus:ring-transparent focus:border-none focus:ring-offset-admin-green',
    false: '${Style.textSchool}  placeholder-blue input_tech_search_colorless_2 border-none focus:ring-transparent focus:ring-offset-blue',
  });

  const handleName = (data) =>{
    try{
      const name= data['name']+type;
      editFile(params.file, name,data['tipo'] );
      toast.success('Editado');
      return setUpdate(update+1);
    }catch(e){
      console.log(e);
    }
  }

  const Style = {
    colorSchool :  `bg-new-`+color,
    textSchool: `text-new-`+color,
    hoverSchool: `bg-new-h`+color,
    borderSchool: `border-new-`+color,
    buttonSchool: `bg-new-`+color+' hover:bg-new-h'+color,
  }

  

    return(
<PageUser color={`bg-white ${Style.textSchool}`} colorInput={`bg-white ${Style.textSchool}`} user={user}>
  <SideBar color={`${Style.colorSchool}`} userData={userData} useRol="Profesor" mapeo={profesor_maps}>
  {/* Parte Central */}
  <div className={`w-full md:w-4/5 bg-fondo p-4 h-full shadow-md overflow-y-auto`}>
    <div className={``}>
      <div className={`flex content-center items-center justify-between mx-2 my-6 border-b-4 pb-4 border-new-${color}`}>
        <div className={`flex items-center`}>
          <Link to={ProfessorRoutes.SharedFiles.replace(':uid', params.uid)}><ArrowLeftIcon className={`h-6 w-6 ${Style.textSchool} hover:text-white hover:rounded-full hover-bg-blue`} /></Link>
        </div>
        <div className={`min-w-0 flex-1`}>
          <h2 className={`text-xl2 sm-text-xl3 text-center font-bold leading-7 ${Style.textSchool}`}>
            Configurar Archivo
          </h2>
        </div>
      </div>
    </div>
    <form onSubmit={handleSubmit(handleName)}>
      <Card className={`bg-white p-5`}>
        <div className={`grid grid-cols-1 md:grid-cols-12 gap-4 mb-1`}>
          <div className={`col-span-3 mr-2 flex items-center justify-center`}>
            <p className={`font-bold `}>{file.status === 'Publicado' ? <span className={`!text-new-green`}>{file['status']}</span> : <span className={`!text-new-dark-green`}>{file['status']}</span>}</p>
            <DocumentIcon className={`w-40 h-40 ${Style.textSchool}`} />
          </div>
          <div className={`grid grid-row-2 col-span-9`}>
            <div>
              <p className={`w-full inline-block rounded-t-lg text-xl1 ${Style.textSchool} font-medium`}>Nombre</p>
              <div className={`inline-flex w-full items-center`}>
                <input
                  type="text"
                  id={`name`}
                  {...register(`name`, {
                    required: "El Nombre es requerido."
                  })}
                  className={errors.name ? `${styles.true}` : `${styles.false}`}
                  placeholder={`Nombre`}
                />
                <p className={`${Style.textSchool} font-bold ml-4`}>{type}</p>
              </div>
              <p className={`text-deep-red font-bold text-sm flex items-start justify-start mt-1`}>{errors.title?.message}</p>
            </div>
            <div>
              <p className={`w-full inline-block rounded-t-lg text-xl1 ${Style.textSchool} font-medium`}>Tipo</p>
              <div className={`inline-flex w-full items-center`}>
                <input
                  type={`text`}
                  id={`tipo`}
                  {...register(`tipo`, {
                    required: "El Nombre es requerido."
                  })}
                  className={errors.name ? `${styles.true}` : `${styles.false}`}
                  placeholder={`Nombre`}
                  readOnly
                />
              </div>
              <p className={`text-deep-red font-bold text-sm flex items-start justify-start mt-1`}>{errors.title?.message}</p>
            </div>
          </div>
        </div>
        <div className={`flex justify-end space-x-2`}>
          <button type={`submit`} className={`${Style.colorSchool} button_tech_colorless ${Style.hoverSchool} !px-2 !text-xs`}>
            Modificar Nombre
          </button>
          {file.status === 'Publicado' ? (
            <button type={`button`} onClick={() => openModal()} className={`bg-new-green button_tech_colorless hover-bg-new-dark-green !px-2 !text-xs`}>
              Ocultar
            </button>
          ) : (
            <button type={`button`} onClick={() => openModal()} className={`bg-new-green button_tech_colorless hover-bg-new-dark-green !px-2 !text-xs`}>
              Mostrar
            </button>
          )}
          <button type={`button`} onClick={() => openModal_delete()} className={`bg-new-red button_tech_colorless hover-bg-new-dark-red !px-2 !text-xs`}>
            Eliminar
          </button>
        </div>
      </Card>
    </form>
    <Portal open={isOpen} onClose={() => closeModal()}>
      <DeactivateFile update={() => setUpdate(update + 1)} onClose={() => closeModal()} id={params.file} name={file.name} status={file.status} />
    </Portal>
    <Portal open={isOpen2} onClose={() => closeModal_delete()}>
      <DeleteFile update={() => setUpdate(update + 1)} onClose={() => closeModal_delete()} id={params.file} name={file.name} status={file.status} />
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
  })(React.memo(EditFile));