// React imports
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
// Components


// Functionalities
import { 
    registerStAttendance,
    getStAttendance,
    editStAttendance,
    deleteStAttendance
 } from "../../../api/axiosStudentAttendance";
import { getStudentsOfSection } from "../../../api/axiosStudentSection";
// Tailwind
import { Card, CardBody} from "@material-tailwind/react";


export default function CreateAttendance({section_id, schedule_id, update, onClose}){

    const [students, setStudents] = useState([]);
    const [scheduleDetails, setScheduleDetails] = useState({});
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, watch, reset} = useForm();
    const [form, setForm] = useState([]);
    const params = useParams()
    const section = section_id
    const schedule = schedule_id



    useEffect(() => {
        const getStudents = async () => {
            try {
                const res = await getStudentsOfSection(section_id);
                if (res.data && res.data.results) {
                    setStudents(res.data.results);
                    res.data.results.forEach(item => {
                        setForm(prevForm => ([...prevForm, {[item.student_rut]: false}]));
                    });
                }
            } catch (err) {
                console.error(err);
            }
        }
    
        getStudents();
    }, [update]);
    



    const onSubmit = handleSubmit(() => {
        registerStAttendance(section, schedule, form)
        onClose()
        return update()
    });
    
    const handleChange = (e) => {
        const {name, checked} = e.target;

        const index = form.findIndex(form => form[name] !== undefined);

        if(index !== -1){
            const update = [...form];
            update[index] = {...update[index], [name]: checked};
            setForm(update);
        }else{
            setForm([...form, {[name]:checked}]);
        }

    }

    return (
        <>
        <form onSubmit={handleSubmit(onSubmit)}>
            <Card className="w-[800px]">

              <CardBody className="flex flex-col justify-between w-full">
              <div className="bg-new-blue rounded-md p-2 mb-2">
                        <p className="text-lg font-bold text-white">Lista del Curso </p>
                    </div>
    
                <div className="inline-flex justify-between text-base text-blue font-bold mb-3">
                <div className="bg-new-blue grow rounded-md p-2 mr-1">
                        <p className="text-lg font-bold text-white">Nombre del estudiante</p>
                    </div>
                    <div className="bg-new-blue  rounded-md p-2">
                        <p className="text-lg font-bold text-white">Asistencia</p>
                    </div>
                </div>
                {students && students.length !== 0 ? students.map((st) => ( 
                    <div className="inline-flex justify-between mb-3 border-b border-new-blue p-2">
             
                            <p className="text-new-blue font-bold text-base">{st.full_name}</p>

                        <div className="mr-8">
                            <input 
                                type="checkbox" 
                                name={st.student_rut}
                                className="p-2 cursor-pointer border-2 border-new-blue rounded-md checked:border-new-green checked:bg-new-green focus:checked:border-new-green focus:checked:bg-new-green"
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                )): <div><p>Consulte una fecha y vea aquí el resultado</p></div>}

                <div className="flex justify-between space-x-2">
                <button 
                    onClick={() => onClose()}
                    className="bg-new-blue w-40 h-10  rounded-lg font-semibold text-center align-middle text-white text-sm">
                        Salir
                    </button>

                    <button type="submit" className="bg-new-green w-40 h-10 rounded-lg text-white font-semibold">
                        Guardar asistencia
                    </button>
                </div>
              </CardBody>

          </Card>
        </form>
        </>

    )
}