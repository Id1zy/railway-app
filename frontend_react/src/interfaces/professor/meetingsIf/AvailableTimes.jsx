// React imports
import { useEffect, useState } from "react";
import { useParams, useNavigate} from "react-router-dom";
import { Link } from "react-router-dom";
import {useForm} from "react-hook-form";
// React Redux
import { connect } from "react-redux";
// Components
import PageUser from "../../../hocs/layouts/PageUser";
import SideBar from "../../../components/users/sidebar";
import ScheduleView from "../../../components/calendars/scheduleView";
import Portal from "../../../components/core/Portal";
// User Maps
import { profesor_maps } from "../../../helpers/users_helpers";
// Functionalities Axios
import { getProfessor, listAvailableTime } from "../../../api/axiosProfessor";
// Toast
import toast from "react-hot-toast";
// Tailwind 
import { Card } from "@material-tailwind/react";
// HerosIcon
import { ArrowLeftIcon, PlusCircleIcon} from "@heroicons/react/24/outline";

// Functionalities
import { deactiveOrReactiveAT } from "../../../api/axiosProfessor";
import { ProfessorRoutes } from "../../../helpers/users_routes";
import { newAvailableTime } from "../../../api/axiosProfessor";

// Delete Modal Component
function DeleteModal({onClose, timeId, update}){

  const handleDelete = async () => {
    try{
      const res = await deactiveOrReactiveAT(timeId);
      if(res.status === 200){
        toast.success("Eliminado correctamente");
        onClose();
        update();
      }
    } catch (err) {
      toast.error("Algo ha salido mal");
    }
  }

  useEffect(()=>{

  }, [update])

  return(
    <div className="flex flex-col w-full rounded-2xl bg-new-fondo p-6 justify-center items-center">
      <div className="flex w-2/3 mb-2">
        <p className="text-blue text-base font-semibold">¿Está seguro que desea eliminar el bloque horario?</p>
      </div>
      <div className="inline-flex text-center text-white text-base font-semibold">
        <button className="bg-pink-900 rounded-lg p-2 mr-3" onClick={handleDelete}>eliminar</button>
        <button className="bg-new-green rounded-lg p-2" onClick={onClose}>cancelar</button>
      </div>
      
    </div>
  )
}


function NewModal({onClose, user}){

  const {register, handleSubmit, formState: { errors }} = useForm();

  const send = async (data) => {
    try{
      const res = await newAvailableTime(data);
      if(res.status === 200){
        toast.success("Horario creado")
      }
    } catch (err) {
      toast.error("Algo ha salido mal")
    }
  }

  const onSubmit = (data) => {
    data.professorId = user.id
    send(data);
  }


  return(
    <div className="flex flex-col w-full rounded-2xl bg-new-fondo p-6 justify-center items-center">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full items-stretch">
        <div className="flex flex-wrap">
          <p className="w-full">Día de la semana</p>
          <select className="w-full rounded-lg" name="" id="" 
            {...register("day_of_week",{
              required: {
                value:true,
                message:"Debe indicar un día de la semana"
              }
            })}>
            <option value={1}>Lunes</option>
            <option value={2}>Martes</option>
            <option value={3}>Miércoles</option>
            <option value={4}>Jueves</option>
            <option value={5}>Viernes</option>
          </select>

          {errors.day_of_week ? <p className="w-full text-red">{errors.message}</p>: <></>}
        </div>
        <div className="flex flex-wrap">
          <p className="w-full">Desde las</p>
          <input className="w-full rounded-lg" type="text" placeholder="ejemplo: 10:50"
          {...register("start_time_block", {
            required: {
              value:true,
              message: "Debe ingresar un horario de inicio"
            },
            pattern:{
              value: /^(?:[01]\d|2[0-3]):[0-5]\d$/,
              message: 'El formato debe ser Horas:Minutos',
            }
          })}/>

          {errors.start_time_block && <p className="w-full text-pink-900">{errors.start_time_block.message}</p>}
        </div>
        <div className="flex flex-wrap mb-3">
          <p className="w-full">Hasta las</p>
          <input className="w-full  rounded-lg" type="text" placeholder="ejemplo: 11:50"
          {...register("end_time_block", {
            required:{
              value: true,
              message:"Debe ingresar un horario límite"
            },
            pattern:{
              value: /^(?:[01]\d|2[0-3]):[0-5]\d$/,
              message: 'El formato debe ser Horas:Minutos'
            }
          })}/>

          {errors.end_time_block && <p className="w-full text-pink-900">{errors.end_time_block.message}</p>}
        </div>
        <div className="inline-flex w-full justify-evenly">
          <button className="p-2 bg-new-green rounded-lg font-semibold hover:text-white" type="submit">agregar</button>
          <button className="p-2 bg-pink-900 rounded-lg font-semibold hover:text-white" onClick={onClose}>cancelar</button>
        </div>
      </form>
    </div>
  )
}





function AvailableTimes({user}) {
    // States
    const [userData, setUserData] = useState({});
    const [block, setBlock] = useState([]);
    // Modal States
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [openNewModal, setOpenNewModal] = useState(false);
    const [timeId, setTimeId] = useState('');

    // Update state
    const [update, setUpdate] = useState(0);

    // URL Parameters
    const params = useParams();
    // Navigation
    const navigate = useNavigate();


    useEffect(() => {
        if(user){
            setUserData(user);
        }

        const getProfessorDetails = async () =>{
            try{
                const res = await getProfessor(user.id);
                if(res.data){
                    setUserData(res.data[0]);
                }
            } catch (err){
                return err;
            }
        }

        const getAvailableTimes = async () => {
          try{
            const res = await listAvailableTime(user.id, params.sid);
            if(res.data){
              setBlock(res.data)
            }
          } catch (err){

          }
        }


        getProfessorDetails();
        getAvailableTimes();
    }, [])



    return (
        <PageUser color={'bg-white text-blue'} colorInput={'bg-white text-blue'}>
          <SideBar color={'bg-blue'} userData={userData} useRol="profesor" mapeo={profesor_maps}>
          <div className="w-full md:w-4/5 bg-fondo p-4 h-full shadow-md overflow-y-auto"> 
                <div className=''>
        <div className='flex items-center justify-between mx-2 my-6 border-b-4 pb-4 border-blue'>            
        <div className="flex items-center">
                <Link 
                  to={ProfessorRoutes.Subject}
                  className="inline-flex justify-beetwen items-center bg-new-blue p-2 rounded-lg text-white font-semibold">
                  <ArrowLeftIcon className="h-5 mr-2"></ArrowLeftIcon>
                  <p>volver</p>
                </Link>
                <button className="ml-3 rounded-lg text-new-green" onClick={() => setOpenNewModal(true)}>
                  <abbr title="Crear nuevo horario">
                    <PlusCircleIcon className="h-10 "/>
                  </abbr>
                </button>
    
            </div>
          <div className="min-w-0 flex-1">
            <h2 className='text-xl2 sm:text-xl3 text-center font-bold leading-7 text-blue '>
              Horarios disponibles de {userData ? `${userData.first_name } ${userData.last_name}`: "cargando..."}
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
                  <div className="inline-flex justify-between mb-3">
                    <p className="text-blue text-xs font-bold text-center">Horario N°{index+1}</p>
                    {item.requests > 0 ? 
                    <abbr className="text-orange text-xs font-bold" title="Número de reuniones solicitadas">Solicitudes({item.requests})</abbr>
                    :<abbr className="text-blue text-xs font-bold" title="Número de reuniones solicitadas">Solicitudes({item.requests})</abbr>
                    }
                    
                  </div>

                <div className="sm:inline-flex ">
                <div className="bg-new-blue rounded-t-md sm:rounded-t-none sm:rounded-l-md px-3 py-1">
                  <p className="text-xs text-white text-base text-center">Día: {item.verbose_day}</p>
                </div>
                <div className="bg-new-blue  px-3 py-1">
                  <p className="text-xs text-white text-center text-base">Hora de Inicio: {item.init}</p>
                </div>
                <div className="bg-new-blue rounded-b-md sm:rounded-b-none sm:rounded-r-md px-3 py-1">
                  <p className="text-xs text-white text-center text-base">Hora de Término: {item.fin}</p>
                </div>
                </div>
                <Link 
                  className="inline-block bg-new-green hover:bg-new-dark-green !rounded-md  button_tech_colorless mt-2"
                  to={ProfessorRoutes.AvailableDetails.replace(":atid", item.id_available_time).replace(':snid', params.sid)}
                  >
                    ver bloque
                </Link>
                <button 
                  onClick={() => {
                      setOpenDeleteModal(true);
                      setTimeId(item.id_available_time);
                    }
                  } 
                  className="inline-block bg-pink-800 hover:bg-pink-900 !rounded-md  button_tech_colorless mt-2">
                    eliminar
                </button>
                </Card>
                </>
              ))}
            </div>
            
            {openDeleteModal ? <>
              <Portal className="w-full" open={openDeleteModal} onClose={() => setOpenDeleteModal(false)}>
                  <DeleteModal onClose={() => setOpenDeleteModal(false)} timeId={timeId} update={()=>setUpdate(update + 1)}/>

              </Portal>
            </>: <></>}
            {openNewModal ? <>
              <Portal className="w-full" open={openNewModal} onClose={() => setOpenNewModal(false)}>
                  <NewModal onClose={() => setOpenNewModal(false)} user={user} update={()=>setUpdate(update + 1)}/>

              </Portal>
            </>: <></>}
            
          </div>
          <div className="w-full md:w-2/3 ">
          <Card className="bg-white p-2  h-[500px] overflow-y-auto">
    
                <ScheduleView block={block ? block : block} block_2={[]}/>
      
          </Card>
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
  })(AvailableTimes);