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
import { postSchedule } from "../../api/axiosSchedule";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

const CreateSchedule = () => {
  const numberToDayMap = {
    1: "Lunes",
    2: "Martes",
    3: "Miércoles",
    4: "Jueves",
    5: "Viernes",
    6: "Sábado",
    7: "Domingo"
  };
  const [userData, setUserData] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [update, setUpdate] = useState(0);
  const [block, setBlock] = useState({});
  const [schedule, setSchedule] = useState([]);

  const form = useForm();
  const { register, handleSubmit, formState: { errors }, setValue} = form;
  const params = useParams()

  useEffect(() => {

  }, [update]);

 
  const onSaveBlock = (data) =>{
    setSchedule([...schedule, {
      'day':data['day'],
      'init':data['init'],
      'fin':data['fin']
    }])
    
  }

  const deleteBlock = (index) => {
    const updatedItems = [...schedule];
    updatedItems.splice(index, 1);
    setSchedule(updatedItems);
  };

  const onSubmit = () =>{
    if(schedule.length >0){
      try{
        postSchedule(params.uid, schedule);
        toast.success('Enviado')
      }catch(e){
        console.log(e);
      }
    }else{
      toast.error('Bloques vacíos')
    }
  }


  const styles = ({
    true: 'input_tech_search_colorless !text-blue !text-left border-2 border-deep-red ring-2 ring-red ring-offset-deep-red focus:ring-transparent focus:border-none focus:ring-offset-admin-green',
    false: ' input_tech_search_colorless_2 border-none !text-blue !text-left focus:ring-transparent focus:ring-offset-blue',
  });

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
          Horarios
        </h2>
      </div>
    </div>
    </div>
    <button
          onClick={()=>onSubmit()}
          class="inline-block bg-new-green hover:bg-new-dark-green  !rounded-md  button_tech_colorless mb-2 mt-2">Guardar Horario</button>

    <div className="w-full inline-flex space-x-2">
      <div className="w-full md:w-1/3">
      <form onSubmit={handleSubmit(onSaveBlock)}>
        <Card className="bg-white p-5 mb-2">
          <p className="text-blue font-bold text-center">Añadir Bloque</p>


<div className="mt-2">
  <p className="text-blue font-sm text-sm">Día de la Semana:</p>
  <select 
          name="day"
          {...register("day", {
            required: "El Día es Requerido."
          })}   
          className={errors.day ? `${styles.true}` : `${styles.false}`}
        >
          {/* Aquí utilizamos el mapeo para generar las opciones */}
          {Object.entries(numberToDayMap).map(([number, day]) => (
            <option key={number} value={number}>{day}</option>
          ))}
        </select>
      <p className="text-deep-red font-bold text-sm flex items-start justify-start mt-1">{errors.day?.message}</p>
</div>
<div className="sm:inline-flex gap-x-2">
  <div>
  <p className="text-blue font-sm text-sm">Hora de Comienzo:</p>
  <input type="time" 
  name="init"
  id="init"
   
   {...register("init", {
    required: "La Hora de Inicio es Requerida."
})}   className={errors.init ? `${styles.true}` : `${styles.false}`}
  min="08:00"  
  max="21:00"
 />
  <p className="text-deep-red font-bold text-sm flex items-start justify-start mt-1">{errors.init?.message}</p>
  </div>
  <div>
  <p className="text-blue font-sm text-sm">Hora de Finalización:</p>
  <input type="time" 
  name="fin"
  min="08:00"  
  max="21:00"
  
  {...register("fin", {
    required: "La Hora de Término es Requerida."
})}   className={errors.fin ? `${styles.true}` : `${styles.false}`}/>
<p className="text-deep-red font-bold text-sm flex items-start justify-start mt-1">{errors.fin?.message}</p>
  </div>
</div>
        
<button
 type="submit"
    class="inline-block bg-blue hover:bg-new-dark-blue  !rounded-md  button_tech_colorless mt-2">Agregar Bloques</button>

     
        </Card>
        </form>

        <div className="overflow-y-auto h-64">
        {schedule.map((item, index)=>(
            <>
            <Card className="bg-white mb-2 p-3">
              <p className="text-blue text-xs font-bold text-center">Bloque N°{index+1}</p>
            <div className="sm:inline-flex ">
            <div className="bg-blue rounded-t-md sm:rounded-t-none sm:rounded-l-md px-3 py-1">
              <p className="text-xs text-white text-base text-center">Día: {item.day}</p>
            </div>
            <div className="bg-blue  px-3 py-1">
              <p className="text-xs text-white text-center text-base">Hora de Inicio: {item.init}</p>
            </div>
            <div className="bg-blue rounded-b-md sm:rounded-b-none sm:rounded-r-md px-3 py-1">
              <p className="text-xs text-white text-center text-base">Hora de Término: {item.fin}</p>
            </div>
            </div>
            <button
onClick={()=>deleteBlock(index)}
    class="inline-block bg-red-500 hover:bg-red-600  !rounded-md  button_tech_colorless mt-2">Eliminar Bloque</button>
    </Card>
            </>
          ))}
        </div>
         
        
      </div>
      <div className="w-full md:w-2/3 ">
      <Card className="bg-white p-2  h-[500px] overflow-y-auto">

 <ScheduleView block={schedule} block_2={[]}/>
  
      </Card>
      </div>
    </div>

    </div>
   
      </SideBar>
    </PageUser>
  );
};



export default CreateSchedule;
