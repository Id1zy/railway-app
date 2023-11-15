import { Card } from "@material-tailwind/react";
import { useState, useRef} from "react";
import { toast } from "react-hot-toast";
import React from "react";
import { deleteFolder } from "../../../api/axiosSharedFiles";


const DeleteFolder =({ update, onClose, index, id, name}) => {
  const [percentage, setPercentage] = useState(0);


  const HandleDelete= (id, index) => {
    try{
      deleteFolder(id);
      toast.error('Carpeta Eliminada')
      onClose();
      return update();
    }catch(e){console.log(e)}
  }


  return (
    <Card className="w-full max-w-md shadow-none p-5 text-blue rounded-[10px]transition-all">
   
   <div className=" mb-2">
     <h2 className="text-xl font-bold text-blue text-center">
     ¿Quieres Eliminar la Carpeta "{name}"?
      </h2>
   </div>
   <div>
   <div className="inline-flex  items-center">
<button 
onClick={() => onClose()}
className='border-2 border-admin-blue !text-blue hover:!text-white hover:bg-admin-blue button_tech_colorless mr-2'>Cancelar</button>
<button 
onClick={() => HandleDelete(id, index)}
className='border-2 border-admin-red !text-admin-red hover:!text-white hover:bg-admin-red button_tech_colorless'>Eliminar</button>
</div>
   </div>
</Card>
  );
}



export default (React.memo(DeleteFolder));