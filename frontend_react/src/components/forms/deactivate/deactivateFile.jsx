import { Card } from "@material-tailwind/react";
import { useState} from "react";
import { toast } from "react-hot-toast";
import React from "react";
import { deactivateFile } from "../../../api/axiosSharedFiles";
import { useParams } from "react-router-dom";

const DeactivateFile =({ update, onClose,  id, name, status}) => {
  const [percentage, setPercentage] = useState(0);
  const params = useParams()


  const HandleDeactivate = (id) => {
    try{
      deactivateFile(id);
      toast.error('Cambio de Estado')
      onClose();
      return update();
    }catch(e){console.log(e)}
  }



  return (
    <Card className="w-full max-w-md shadow-none p-5 text-blue rounded-[10px]transition-all">
    <div className=" mb-2">
      <h2 className="text-xl font-bold text-blue text-center">
       {status === 'Publicado' ? <> ¿Quieres Desactivar el archivo "{name}"?</> 
       : <> ¿Quieres Activar el archivo "{name}"?</>}
       </h2>
    </div>
    <div>
    <div className="inline-flex  items-center">
 <button 
 onClick={() => onClose()}
 className='border-2 border-admin-blue !text-blue hover:!text-white hover:bg-admin-blue button_tech_colorless mr-2'>Cancelar</button>
 {status === 'Publicado' ? <><button 
 onClick={() => HandleDeactivate(id)}
 className='border-2 border-admin-red !text-admin-red hover:!text-white hover:bg-admin-red button_tech_colorless'>Desactivar</button></> 
       : <><button 
       onClick={() => HandleDeactivate(id)}
       className='border-2 border-admin-green !text-admin-green hover:!text-white hover:bg-admin-green button_tech_colorless'>Activar</button></>}
 </div>
    </div>
 </Card>
  );
}



export default (React.memo(DeactivateFile));
