import React, { useState, useEffect } from "react";
import { utp_maps } from "../../helpers/users_helpers";
import PageUser from "../../hocs/layouts/PageUser";
import SideBar from "../../components/users/sidebar";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useForm } from 'react-hook-form';
import { Card } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import "./ScheduleList.css";
import { UTPRoutes } from "../../helpers/users_routes";
import ScheduleView from "../../components/calendars/scheduleView";
import { postSchedule, getBlockSchedule ,updateSchedule,desactivateSchedule} from "../../api/axiosSchedule";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import EditBlockModal from "../../components/heros/EditBlockModal";


const ViewSchedule = () => {
  const [userData, setUserData] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [update, setUpdate] = useState(0);
  const [block, setBlock] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [editBlockData, setEditBlockData] = useState(null);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  
  

  const form = useForm();
  const { register, handleSubmit, formState: { errors }, setValue} = form;
  const params = useParams()

  useEffect(() => {

    const getBlocks = async() =>{
        try{
            const res = await getBlockSchedule(params.uid);
            console.log(res.data)
            setBlock(res.data)
        }catch(e){
            console.log(e)
        }
    }
    getBlocks();
  }, [update]);
  const [isOpen, setIsOpen] = useState(false);

  

  const openEditModal = (item) => {
    console.log(item.Block);
    setEditBlockData(item.Block);
    setEditModalIsOpen(true);
  };
  const closeEditModal = () => {
    setEditModalIsOpen(false);
  };

  const editBlock = (index, blockId) => {
    const selectedBlock = block[index];
    setEditBlockData(selectedBlock);
    console.log('editBlockData:', selectedBlock); // Agrega este console.log para verificar
    openEditModal();
  };
  

  const onSaveEditedBlock = async (updatedData) => {
    try {
      await updateSchedule(editBlockData.Block.id, updatedData);
      toast.success('Bloque actualizado exitosamente');
      setUpdate(update + 1);
      closeEditModal();
    } catch (error) {
      console.error('Error al actualizar el bloque:', error);
      toast.error('Error al actualizar el bloque');
    }
  };
  const deleteBlock = async (index, blockId) => {
    try {
      // Desactivar el horario utilizando la función desactivateSchedule
      await desactivateSchedule(blockId);
  
      toast.success('Bloque eliminado exitosamente');
    } catch (error) {
      console.error('Error al eliminar el bloque:', error);
      toast.error('Error al eliminar el bloque');
      return;
    }
  
    // Actualizar el estado para reflejar el cambio en la interfaz
    const updatedItems = [...block];
    updatedItems.splice(index, 1);
    setBlock(updatedItems);
  };



  return (
    <PageUser color={'bg-white text-blue'} colorInput={'bg-white text-blue'}>
      <SideBar color={'bg-blue'} userData={userData} useRol="utp" mapeo={utp_maps}>
      <div className="w-full md:w-4/5 bg-fondo p-4 h-full shadow-md overflow-y-auto"> 
            <div className=''>
    <div className='flex content-center items-center justify-between mx-2 my-6 border-b-4 pb-4 border-blue'>            
    <div className="flex items-center">
            <Link to={UTPRoutes.Schedule}><ArrowLeftIcon className="h-6 w-6 text-blue hover:text-white hover:rounded-full hover:bg-blue"/></Link>

        </div>
      <div className="min-w-0 flex-1">
        <h2 className='text-xl2 sm:text-xl3 text-center font-bold leading-7 text-blue '>
          Vista de Horario
        </h2>
      </div>
    </div>
    </div>


    <div className="w-full inline-flex space-x-2">
      <div className="w-full md:w-1/3">
        <div className="overflow-y-auto h-90">
        {block.map((item, index)=>(
            <>
            <Card className="bg-white mb-2 p-3">
              <p className="text-blue text-xs font-bold text-center">Bloque N°{index+1}</p>
            <div className="sm:inline-flex ">
            <div className="bg-new-blue rounded-t-md sm:rounded-t-none sm:rounded-l-md px-3 py-1">
              <p className="text-xs text-white text-base text-center">Día: {item.Block.day}</p>
            </div>
            <div className="bg-new-blue  px-3 py-1">
              <p className="text-xs text-white text-center text-base">Hora de Inicio: {item.Block.init}</p>
            </div>
            <div className="bg-new-blue rounded-b-md sm:rounded-b-none sm:rounded-r-md px-3 py-1">
              <p className="text-xs text-white text-center text-base">Hora de Término: {item.Block.fin}</p>
            </div>
            </div>
            <button onClick={() => openEditModal({ Block: item, blockId: item.Block.id })} className="inline-block bg-blue hover:bg-new-dark-blue  !rounded-md  button_tech_colorless mt-2">
  Editar Bloque
</button>
            <button
            onClick={() => deleteBlock(index, item.Block.id)}
    class="inline-block bg-red-500 hover:bg-red-600  !rounded-md  button_tech_colorless mt-2">Eliminar Bloque</button>
    </Card>
            </>
          ))}
        </div>
{editBlockData && (
  <EditBlockModal
  isOpen={editModalIsOpen}
  schedule={editBlockData && editBlockData.Block}
  onClose={closeEditModal}
  setRefresh={setUpdate}
/>
)}
         
        
      </div>
      <div className="w-full md:w-2/3 ">
      <Card className="bg-white p-2  h-[500px] overflow-y-auto">

 <ScheduleView block={schedule} block_2={block ? block : block} />
  
      </Card>
      </div>
    </div>

   

    </div>
   
      </SideBar>
    </PageUser>
  );
};



export default ViewSchedule;
