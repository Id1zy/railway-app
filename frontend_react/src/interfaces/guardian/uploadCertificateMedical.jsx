// React Functions
import React, { useEffect, useState} from "react";
import { connect } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
//Functions
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
//Components
import { Button, Card, Typography } from "@material-tailwind/react";
import { ArrowLeftIcon,DocumentIcon} from '@heroicons/react/20/solid'
import PageUser from "../../hocs/layouts/PageUser";
import SideBar from "../../components/users/sidebar";
//Others
import {guardian_maps } from "../../helpers/users_helpers";
import { GuardianRoutes } from "../../helpers/users_routes";
import Dropzone from 'react-dropzone';
import { postMedicalCertificate } from "../../api/axiosMedicalCertificate";


const UploadCertificateMedical = ({  user }) => {
  const [userData, setUserData] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [files, setFiles] = useState([]);
  const [rejectedFiles, setRejectedFiles] = useState([]);
  const [success, setSuccess] = useState(false);
  const [update, setUpdate] = useState(0);
  const params = useParams()




  useEffect(() => {
    if (user) {
      setUserData(user);
    }

    return () => { setUpdate(0); } 
  }, [update, user]);

  const removeFile = (name) =>{
    setFiles(files => files.filter(file => file.name !== name))
  }

  const removeRejected= (name) =>{
    setRejectedFiles(files => files.filter(({file}) => file.name !== name))
  }

  const handleSubmit = () =>{
    postMedicalCertificate(params.uid, 'Certificado Médico', 'Certificado', files)

    setSuccess(true);
  }
  if(success){
    return <Navigate to={GuardianRoutes.SharedFiles} />
  }


  

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
          Añadir Archivos
        </h2>
      </div>
    </div>
    </div>

    <Card className="p-5 mb-2">
    <Dropzone 
    accept={
      {'image/png': ['png'],
      'text/html': ['html'],
      'text/plain': ['txt'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['docx'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['xlsx'],
      'application/vnd.openxmlformats-officedocument.presentationml.presentation': ['pptx']}
    }
    
    onDrop={(acceptedFiles, rejectedFiles)=> {
        if(acceptedFiles?.length){
            setFiles(previousFiles => [
                ...previousFiles,
                ...acceptedFiles.map(
                    file=> Object.assign(file, {preview: URL.createObjectURL(file)})
                )
            ])
        }
        if(rejectedFiles?.length){
            setRejectedFiles(previousFiles => [...previousFiles, ...rejectedFiles
              
            ])
        }
    }}>
  {({getRootProps, getInputProps}) => (
    <section className="border-2 border-dashed border-blue p-5 text-blue   hover:bg-light-blue hover:!text-white hover:border-white">
      <div {...getRootProps()}>
        <input {...getInputProps()} className="w-full h-full bg-red"/>
        <p className="text-center font-bold">Arrastra y suelta algunos archivos aquí o haz clic para seleccionar archivos</p>
      </div>
    </section>
  )}
</Dropzone>
    </Card>

<Card  className="p-5 mb-2">
    <p className="font-bold text-blue">Archivos Aceptados</p>
    {files.length > 0 ? <></>:<><p className="text-blue p-2">No Hay Archivos Añadidos.</p></>}
                    {files.map(file => (
                        <div className="inline-flex justify-between items-center m-2" key={file.name}>
                            <div className="inline-flex">
                            <DocumentIcon className="text-blue w-5 h-5"/>
                    <span className="text-blue font-bold">{file.name} - {file.size} bytes</span>
                            </div>
                    
                    <button 
                    onClick={()=>removeFile(file.name)}
                    className='border-2 border-admin-red !text-admin-red !px-2 !py-1 hover:!text-white hover:bg-admin-red button_tech_colorless'>Eliminar</button>
                    </div>
                    ))}
</Card>
{rejectedFiles.length > 0 ? <>
<Card  className="p-5 mb-2">
<p className="font-bold text-admin-red">Archivos Rechazados</p>

                    {rejectedFiles.map(({file,errors}) => (
                        <div className="inline-flex justify-between items-center m-2" key={file.name}>
                            <div className="inline-flex">
                            <DocumentIcon className="text-blue w-5 h-5"/>
                    <span className="text-blue font-bold">{file.name} - {file.size} bytes</span>
                            </div>
                            {errors.map(error => (
                                <li key={error.code}>{error.message}</li>
                            ))}
                    
                    <button 
                    onClick={()=>removeRejected(file.name)}
                    className='border-2 border-admin-red !text-admin-red !px-2 !py-1 hover:!text-white hover:bg-admin-red button_tech_colorless'>Eliminar</button>
                    </div>
                    ))}
                    
</Card>
</>:<></>}
<button 
                  onClick={()=>handleSubmit()}
                    className=' w-full border-2 border-blue  !px-2 !py-1 hover:!text-white hover:bg-light-blue button_tech'>Subir Archivos</button>










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
  })(React.memo(UploadCertificateMedical));