import { Card } from "@material-tailwind/react";
import { useState, useRef} from "react";
import { toast } from "react-hot-toast";
import React from "react";
import { deleteFile } from "../../../api/axiosSharedFiles";
import { Navigate } from "react-router-dom";
import { ProfessorRoutes } from "../../../helpers/users_routes";
import { useParams } from "react-router-dom";



const DeleteFile =({ update, onClose,  id, name}) => {
  const [percentage, setPercentage] = useState(0);
  const [success, setSuccess] = useState(false);
  const params = useParams()


  const HandleDelete= (id) => {
    try{
      deleteFile(id);
      toast.error('Archivo Eliminado')
      onClose();
      setSuccess(true);
    }catch(e){console.log(e)}
  }

  if(success){
    return <Navigate to={ProfessorRoutes.SharedFiles.replace(':uid', params.uid)} />;
  }



  return (
    <Card className="w-full max-w-md shadow-none p-5 text-blue rounded-[10px]transition-all">
   
   <div className=" mb-2">
     <h2 className="text-xl font-bold text-blue text-center">
     ¿Quieres Eliminar el Archivo "{name}"?
      </h2>
   </div>
   <div>
   <div className="inline-flex  items-center">
<button 
onClick={() => onClose()}
className='border-2 border-admin-blue !text-blue hover:!text-white hover:bg-admin-blue button_tech_colorless mr-2'>Cancelar</button>
<button 
onClick={() => HandleDelete(id)}
className='border-2 border-admin-red !text-admin-red hover:!text-white hover:bg-admin-red button_tech_colorless'>Eliminar</button>
</div>
   </div>
</Card>
  );
}



export default (React.memo(DeleteFile));
