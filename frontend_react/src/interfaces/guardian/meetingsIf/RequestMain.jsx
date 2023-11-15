// React imports
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

// Components
import PageUser from '../../../hocs/layouts/PageUser';
import SideBar from "../../../components/users/sidebar";
import MeetingRequest from "./MeetingRequest";
import { Disclosure } from "@headlessui/react";
import Portal from "../../../components/core/Portal";


// Tailwind Components
import { Card, CardHeader, CardBody, CardFooter} from "@material-tailwind/react";
import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
  } from "@material-tailwind/react";

// Toast notifications
import toast from "react-hot-toast";

// HeroIcons
import { ArrowUturnLeftIcon } from "@heroicons/react/24/outline";
import { ChevronUpIcon } from '@heroicons/react/20/solid';

// SideBar Maps
import { guardian_maps } from "../../../helpers/users_helpers";
// Routes
import { GuardianRoutes } from "../../../helpers/users_routes";

// Redux imports
import { connect } from "react-redux";

// Functionalities
import { listMeetingRequest, cancelMeetGuardian } from "../../../api/axiosGuardian";



// CANCEL modal
function CancelModal({onClose, meetReqId}){

    const cancel = async () => {
        try{
            const res = await cancelMeetGuardian(meetReqId,{
                "status": "3"
            });
            console.log(res)
            if(res.status >= 200 && res.status < 300){
                toast.success("Reunión cancelada")
            }
        } catch(err){
            console.log(err)
            toast.error("Algo ha salido mal")
        }
    }


    const handleCancel = () => {
        cancel();
        onClose();
    }


    return(
        <div className="flex flex-col w-full rounded-2xl bg-new-fondo p-6 justify-center items-center">
            <div className="flex w-2/3 mb-2">
                <p className="text-blue text-base font-semibold">¿Está seguro que desea cancelar la reunión?</p>
            </div>
            <div className="inline-flex text-center text-white text-base font-semibold">
                <button className="bg-pink-900 rounded-lg p-2 mr-3" onClick={handleCancel}>cancelar reunión</button>
                <button className="bg-new-green rounded-lg p-2" onClick={onClose}>volver</button>
            </div>
        </div>
    )
}


function ListRequest({user, context}) {
    
    const [block, setBlock] = useState([]);
    const [value, setValue] = useState(new Date());
    const [meetReqId, setMeetReqId] = useState('');
    const [openCancelModal, setOpenCancelModal] = useState(false);

    const handleChange = (date) => {
        setValue(date);
    }


    useEffect(() => {
        const listMR = async () => {
            try{
                const res = await listMeetingRequest(user.id, context.puid);
                if(res.data){
                    setBlock(res.data);
                }
            } catch (err){
                return err;
            }
        }

        listMR();
    }, [])

    return(
        <div className="flex w-full bg-new-fondo justify-center">
            <Card className="w-5/6 content-center h-96 overflow-y-auto">
                <div className="flex flex-col items-center md:flex-nowrap py-3">
                    {block ? block.map((info, index) => (
                        <Disclosure className="">
                        {({ open }) => (
                            <div className="w-full gap-4">
                            <Disclosure.Button className="flex w-full justify-between rounded-lg bg-sky-700 px-4 py-2 mt-2 text-left text-lg font-medium text-white drop-shadow-lg hover:cursor-pointer transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-102 hover:bg-indigo-500 duration-300">
                                <div className="inline-flex text-white font-normal text-left">
                                    <p className="mr-2 font-bold">{index+1}</p>
                                    <p className="mr-2">{info.day_of_week}</p>
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
                                        <p className="p-2 bg-yellow-400 rounded-lg text-black font-semibold">{info.status}</p>:
                                        info.status === "Confirmada" ? 
                                        <p className="p-2 bg-new-green rounded-lg text-white font-semibold">{info.status}</p>:
                                        info.status === "Cancelada" ?
                                        <p className="p-2 bg-pink-900 rounded-lg text-white">{info.status}</p>:
                                        <p className="p-2 bg-light-blue rounded-lg text-black font-semibold">{info.status}</p>
                                    }

                                    {info.status === "Confirmada" || info.status === "En espera" ?
                                        <div className="inline-flex">
                                            <button className="mr-2 p-2 bg-pink-800 hover:bg-pink-900 hover:text-white rounded-lg text-black font-semibold"
                                                    onClick={() => {
                                                        setOpenCancelModal(true);
                                                        setMeetReqId(info.id_meeting_request);
                                                    }}>
                                                Cancelar
                                            </button>
                                        </div> :
                                        <></>
                                    }
                                </div>
                            </Disclosure.Panel>
                            </div>
                        )}
                        </Disclosure>
                    )): <></>}
                    {openCancelModal && 
                        <Portal className="w-full" open={openCancelModal} onClose={() => setOpenCancelModal(false)}>
                            <CancelModal onClose={() => setOpenCancelModal(false)} meetReqId={meetReqId}/>
                        </Portal>
                    }            
                </div>
            </Card>
        </div>
            
    )
}


function RequestMain({user}){
    const [userData, setUserData] = useState('');
    const [update, setUpdate] = useState(0);

    const params = useParams();

    const listRequestContext = {
        "puid": params.puid
    }

    // TABS configuration
    const data = [
        {
          label: "Ver solicitudes",
          value: "Read",
          desc:
          <>
             <ListRequest user={user} context={listRequestContext}/>
          </>


        },
        {
          label: "Nueva solicitud",
          value: "Create",
          desc: 
          <>
            <MeetingRequest puid={params.puid} stid={params.stid} update={() => setUpdate(update+1)}/>
          </>,
        },
      ];

    useEffect(() => {
        if(user){
            setUserData(user);
        }

    }, [user, update])

    return(
        <>
            <PageUser user={userData} color={'bg-white text-blue'} colorInput={'bg-white text-blue'}>
                <SideBar color={'bg-blue'} mapeo={guardian_maps} useRol='Apoderado'>
                    <div className="flex flex-wrap justify-center bg-new-fondo w-full overflow-y-auto">
                    <div className='inline-flex w-full md:flex md:flex-wrap'>
                        <div className="flex w-1/6 justify-center items-center">
                            <div className="w-10 h-10 w-1/2 bg-indigo-600 rounded-lg text-white mt-3 ml-3 p-1">
                                <Link to={GuardianRoutes.Teachers.replace(':stid', params.stid)}><ArrowUturnLeftIcon></ArrowUturnLeftIcon></Link>
                            </div>
                        </div>
                        <div className={'flex w-3/4 content-center mx-2 my-6'}>
                            <div className="min-w-0 flex-1">
                                <h2 className="text-xl3 font-bold text-blue">
                                Menú de reuniones
                                </h2>
                            </div>
                        </div>
                    </div>
                    <div className="flex w-full h-screen py-3 px-2">
                        <Tabs value={data[0].value} className="w-full">
                            <TabsHeader>
                                    {data.map(({ label, value }) => (
                                    <Tab key={value} value={value}> 
                                        {label}
                                    </Tab>
                                    ))}
                            </TabsHeader>
                            <TabsBody
                                animate={{
                                initial: { y: 250 },
                                mount: { y: 0 },
                                unmount: { y: 250 },
                                }}
                            >
                                {data.map(({ value, desc }) => (
                                <TabPanel key={value} value={value}>
                                    {desc}
                                </TabPanel>
                                ))}
                            </TabsBody>
                        </Tabs>
                    </div>
               

                    </div>


                </SideBar>
            </PageUser>
        </>
    )
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.Auth.isAuthenticated,
    user: state.Auth.user
})

export default connect(mapStateToProps, {})(RequestMain);