// React imports
import { useEffect, useState} from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
// Routes
import { ProfessorRoutes } from "../../helpers/users_routes";
// Tailwind imports
import { Card, CardBody, CardFooter, CardHeader } from "@material-tailwind/react";
//Functionalities
import { getBlockSchedule } from "../../api/axiosSchedule";
import Dotloader from "react-spinners/DotLoader";

export default function ProfessorsSchedule({section}){
    const [schedule, setSchedule] = useState([]);
    const params = useParams();
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(-1)
    }

    useEffect(() => {
        const loadSchedules = async () => {
            try{
                const res = await getBlockSchedule(params.sid);
                if(res && res.data){
                    setSchedule(res.data)
                }
            } catch(err) {
                console.log(err);
            }
        }

        
        loadSchedules();
    }, [])

    return(
        <>
            <Card className="bg-new-fondo">
                <CardHeader className="flex justify-center">
                    <div className="flex justify-center w-full rounded-lg bg-new-blue py-2 px-4 mt-4">
                        <p className="text-xl text-white font-semibold ">Seleccione el horario de clases</p>
                    </div>
                </CardHeader>
                <CardBody>
                    <div className="flex flex-col">
                        {/*Este bloque será iterado*/}
                        {schedule.length > 0 ? schedule.map((s, index) => (
                            <Link to={ProfessorRoutes.AttendanceList.replace(":sid", section).replace(":schid", s.Block.id)} className="mb-2 shadow rounded-md">
                            <Card  key={s.Block.id} className="bg-white p-5 drop-shadow-lg hover:cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-102  duration-300">
                                <div>

                                <div className="bg-new-blue rounded-md p-2 w-auto">
                                    <p className="text-white font-bold text-xl">Bloque N°{index+1}</p>
                                </div>

                                <div className="inline-flex space-x-2 mt-2">
                                    <div className="bg-new-green p-2 rounded-md">
                                        <p className="text-white font-bold text-base">Día: {s.Block.day} </p>
                                    </div>
                                    <div className="bg-new-red p-2 rounded-md">
                                    <p className="text-white font-bold text-base">Hora de Inicio: {s.Block.init} </p>
                                    </div>
                                    <div className="bg-new-purple p-2 rounded-md" >
                                    <p className="text-white font-bold text-base">Hora de Término: {s.Block.fin} </p>
                                    </div>
                                </div>

                                </div>            
                                
            
                            </Card>
                            </Link>
                        )) : <> <p>No hay Bloques Asignados.</p> </>}
                    </div>
                </CardBody>
            </Card>
        </>
    )
}