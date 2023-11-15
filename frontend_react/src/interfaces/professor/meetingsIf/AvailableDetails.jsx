// React imports
import { useEffect, useState } from "react";
import { useParams, useNavigate} from "react-router-dom";
import { Link } from "react-router-dom";
// React Redux
import { connect } from "react-redux";
// Components
import PageUser from "../../../hocs/layouts/PageUser";
import SideBar from "../../../components/users/sidebar";
import Portal from "../../../components/core/Portal";
import { Disclosure } from '@headlessui/react';

// User Maps
import { profesor_maps } from "../../../helpers/users_helpers";

// Toast
import toast from "react-hot-toast";
// Tailwind 

// HerosIcon
import { ChevronUpIcon, ArrowLeftIcon } from '@heroicons/react/20/solid';

// Functionalities
import { ProfessorRoutes } from "../../../helpers/users_routes";
import { 
    cancelMeetingRequest, 
    availableTimeDetails , 
    acceptMeetingRequest 
} 
from "../../../api/axiosProfessor";

// Delete Portal
function DeleteModal({onClose, meetReqId}){

    const handleDelete = async () => {
      try{
        const res = await cancelMeetingRequest(meetReqId);
        if(res.status === 200){
          toast.success("Se ha cancelado la reunión");
          onClose();
        }
      } catch (err) {
        toast.error("Algo ha salido mal");
      }
    }
  
    useEffect(()=>{
  
    }, [])
  
    return(
      <div className="flex flex-col w-full rounded-2xl bg-new-fondo p-6 justify-center items-center">
        <div className="flex w-2/3 mb-2">
          <p className="text-blue text-base font-semibold">¿Está seguro que desea cancelar la reunión?</p>
        </div>
        <div className="inline-flex text-center text-white text-base font-semibold">
          <button className="bg-pink-900 rounded-lg p-2 mr-3" onClick={handleDelete}>cancelar reunión</button>
          <button className="bg-new-green rounded-lg p-2" onClick={onClose}>volver</button>
        </div>
        
      </div>
    )
  }

  function ConfirmModal({onClose, meetReqId}){

    const handleConfirm = async () => {
      try{
        const res = await acceptMeetingRequest(meetReqId);
        if(res.status === 200){
          toast.success("Se ha confirmado la reunión");
          onClose();
        }
      } catch (err) {
        toast.error("Algo ha salido mal");
      }
    }
  
    useEffect(()=>{
  
    }, [])
  
    return(
      <div className="flex flex-col w-full rounded-2xl bg-new-fondo p-6 justify-center items-center">
        <div className="flex w-2/3 mb-2">
          <p className="text-blue text-base font-semibold">¿Está seguro que desea confirmar la reunión?</p>
        </div>
        <div className="inline-flex text-center text-white text-base font-semibold">
           <button className="bg-new-green rounded-lg p-2 mr-3" onClick={handleConfirm}>confirmar</button>
           <button className="bg-pink-900 rounded-lg p-2" onClick={onClose}>volver</button>
        </div>
        
      </div>
    )
  }


function AvailableDetails({user}){
    
    // User State
    const [userData, setUserData] = useState('');
    // States
    const [avDetails, setAvDetails] = useState([]);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [openConfirmModal, setOpenConfirmModal] = useState(false);
    const [meetReqId, setMeetReqId] = useState('');

    // URL parameters
    const params = useParams();


    useEffect(() => {
        if(user){
            setUserData(user);
        }

        const listDetails = async () => {
            try{
                const res = await availableTimeDetails(params.atid, params.snid);
                console.log(res.data)
                if(res.data){
                    setAvDetails(res.data);
                }
            } catch (err) {
                return err;
            }
        }

        listDetails();
    }, [user]);

    return(
        <>
        <PageUser color={'bg-white text-blue'} colorInput={'bg-white text-blue'}>
            <SideBar color={'bg-blue'} userData={userData} useRol="profesor" mapeo={profesor_maps}>
                <div className="w-full md:w-4/5 bg-fondo p-4 h-full shadow-md overflow-y-auto">
                    <div className="my-4 py-2 border-b-2 border-b-blue">
                        <Link
                            to={ProfessorRoutes.AvailableTimes.replace(':sid', params.snid)}
                            className="inline-flex justify-beetwen items-center bg-new-blue p-2 rounded-lg text-white font-semibold">
                            <ArrowLeftIcon className="h-5 mr-2"></ArrowLeftIcon>
                            <p>volver</p>
                        </Link>
                        <h2 className="text-xl2 font-bold text-blue text-right"> Solicitudes para la asignatura</h2>
                    </div>
                    {avDetails && avDetails !== undefined ? avDetails.map((info, index) => (
                        <Disclosure className="">
                            {({ open }) => (
                                <div className="w-full gap-4">
                                <Disclosure.Button className="flex w-full justify-between rounded-lg bg-sky-700 px-4 py-2 mt-2 text-left text-lg font-medium text-white drop-shadow-lg hover:cursor-pointer transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-102 hover:bg-indigo-500 duration-300">
                                    <div className="inline-flex text-white font-normal text-left">
                                        <p className="mr-2 font-bold">{index+1}</p>
                                        <p>{info.dateSelected} a las {info.timeSelected}</p>
                                    </div>
                                    <ChevronUpIcon
                                        className={`${
                                        open ? 'rotate-180 transform' : ''
                                        } h-5 w-5 text-purple-500`}
                                    />
                                </Disclosure.Button>
                                <Disclosure.Panel className="w-full px-4 py-2 bg-sky-900 text-sm text-gray-500 rounded-lg">
                                    <div className="inline-flex w-1/2 justify-between text-white font-normal text-left">
                                        {info.status === "En espera" ? 
                                            <p className="p-2 bg-yellow-400 rounded-lg text-black">{info.status}</p>:
                                            <p className="p-2 bg-new-green rounded-lg text-black">{info.status}</p>
                                        }
                                        <p className="p-2">Solicitada por {info.guardian_name}</p>

                                        {info.status === "Confirmada" ?
                                            <div className="inline-flex">
                                                <button className="mr-2 p-2 bg-pink-800 hover:bg-pink-900 hover:text-white rounded-lg text-black font-semibold"
                                                        onClick={() => {
                                                            setOpenDeleteModal(true);
                                                            setMeetReqId(info.id_meeting_request);
                                                        }}>
                                                    Cancelar
                                                </button>
                                            </div> :
                                            info.status === "En espera" ? 
                                            <div className="inline-flex">
                                                <div>
                                                <button className="mr-2 p-2 bg-new-green rounded-lg text-black font-semibold hover:text-white"
                                                    onClick={() => {
                                                        setOpenConfirmModal(open);
                                                        setMeetReqId(info.id_meeting_request);
                                                        }}>
                                                    Confirmar
                                                </button>
                                                <button className="mr-2 p-2 bg-pink-800 hover:bg-pink-900 hover:text-white rounded-lg text-black font-semibold"
                                                        onClick={() => {
                                                            setOpenDeleteModal(true);
                                                            setMeetReqId(info.id_meeting_request);
                                                        }}>
                                                    Cancelar
                                                </button>
                                                </div>

                                            </div> :
                                            <></>
                                        }
                                    </div>
                                </Disclosure.Panel>
                        </div>
                      )}
                    </Disclosure>
                    )) : <></>}

                    {openDeleteModal ? 
                    <Portal className="w-full" open={openDeleteModal} onClose={() => setOpenDeleteModal(false)}>
                        <DeleteModal onClose={() => setOpenDeleteModal(false)} meetReqId={meetReqId}/>
                    </Portal>: <></>}
                    {openConfirmModal ?
                    <Portal className="w-full" open={openConfirmModal} onClose={() => setOpenConfirmModal(false)}>
                        <ConfirmModal onClose={() => setOpenConfirmModal(false)} meetReqId={meetReqId}/>
                    </Portal>: <></>}
                </div>
            </SideBar>
        </PageUser>
        </>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.Auth.isAuthenticated,
    user: state.Auth.user
  });
  export default connect(mapStateToProps,{
  })(AvailableDetails);