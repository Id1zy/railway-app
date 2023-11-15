// React imports
import React from "react";
// React's Hooks
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// Functionalities
import {createStudentGrade} from '../../../api/axiosStudentGrades';
import { get_users } from "../../../api/axiosUsers";
import { getAllWAverage } from "../../../api/axiosWAverage";
import toast from "react-hot-toast";

// Tailwind CSS
import { CardFooter, Input, Slider } from "@material-tailwind/react";
import { 
    Card,
    CardHeader,
    CardBody,
    Select,
    Option

} from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { getStudentsOfSection } from "../../../api/axiosStudentSection";


function CreateFormStudentGrade({students, section_id, update, onClose}){
    const [users, setUsers] = useState({});
    const [data, setData] = useState({});
    const [WAverage, setWAverage] = useState([]);
    const { register, handleSubmit, formState: { errors }, watch, reset} = useForm();

    const [students_, setStudents] = useState([]);
    const [form, setForm] = useState([]);
    const params = useParams()
    const section = section_id



    const onSubmit = handleSubmit((data) => {
        const average =  data['id_weighted_average'] ? data['id_weighted_average']:0
        createStudentGrade(section_id,average, data['coefficient'], form);
        toast.success("Calificación registrada");
        reset();
        return update();
    });
    
    useEffect(() => {
        async function loadUsers() {
            try {
              const res = await get_users();
              if (res && res.data) {
                setUsers(res.data.results); 
              }
            } catch (error) {
              console.error('Error al cargar los usuarios:', error);
            }
          };


          async function weighted_average() {
            try{
                const res = await getAllWAverage();
                if(res.data && res.data.results){
                    setWAverage(res.data.results);
                }
            }catch(err){
                return err;
            }
          }
          loadUsers();
          weighted_average();
          const getStudents = async () => {
            try {
                const res = await getStudentsOfSection(section);
                if (res.data && res.data.results) {
                    setStudents(res.data.results);
                    res.data.results.forEach(item => {
                        setForm(prevForm => ([...prevForm, {[item.student_rut]: 2.0}]));
                    });
                }
            } catch (err) {
                console.error(err);
            }
        }
    
        getStudents();
    }, []);

    const handleChange = (e) => {
        const {name, value} = e.target;

        const index = form.findIndex(form => form[name] !== undefined);

        if(index !== -1){
            const update = [...form];
            update[index] = {...update[index], [name]: value};
            setForm(update);
        }else{
            setForm([...form, {[name]:value}]);
        }

    }

    return(
        <>
            <Card className="min-w-screen">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <CardBody className="">
                    <div className="bg-new-blue rounded-md p-2 m-2">
                        <p className="font-bold text-lg text-white">Registrar nuevas calificaciones</p>
                        </div>

                        <div className="flex flex-col w-full">
  <div className="inline-flex space-x-2 items-center mb-2">
  <div className="inline-flex flex-wrap md:flex-nowrap w-full justify-evenly">
                                
                                <div className=" w-full md:max-w-md">
 
                                    <p className="text-new-green font-bold">Ponderación</p>

                                    <select className="text-center rounded-lg w-full input_tech_search" 
                                        {...register("id_weighted_average")}
                                        selected={0}
                                        >
                                        {WAverage.map((wa) => (
                                            <option value={wa.id_weighted_average}>
                                                {wa.weighted_average !== "Ninguno" ?
                                                `${wa.weighted_average}%`: `${wa.weighted_average}`}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="inline-flex flex-wrap md:flex-nowrap justify-evenly">
                                <div className="w-full md:max-w-md">
                                <p className="text-new-green font-bold">Coeficiente</p>
                                    <Input defaultValue={1} className="input_tech_search text-center" {...register("coefficient")}></Input>
                                </div>
                            </div>

  </div>
                            
                            

                            <div className="inline-flex justify-between text-base text-blue font-bold mb-3">
                <div className="bg-new-blue  rounded-md p-2 mr-1">
                        <p className="text-lg font-bold text-white">Nombre del estudiante</p>
                    </div>
                    <div className="bg-new-blue  rounded-md p-2">
                        <p className="text-lg font-bold text-white">Calificación</p>
                    </div>
                </div>
                {students_ && students_.length !== 0 ? students_.map((st, index) => ( 
                    <div className="inline-flex justify-between mb-3 border-b border-new-blue p-2">
                        <div className="grow mr-2 items-center"><p className="text-new-blue font-bold text-base">N°{index+1} {st.full_name}</p></div>

                        <div className="">
                            
                            <input 
                                name={st.student_rut}
                                className="input_tech_search w-auto text-center"
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                )): <div><p>Consulte una fecha y vea aquí el resultado</p></div>}


                        </div>

                        <div className="flex justify-between space-x-2">
                <button 
                    onClick={() => onClose()}
                    className="bg-new-blue w-40 h-10  rounded-lg font-semibold text-center align-middle text-white text-sm">
                        Salir
                    </button>

                    <button type="submit" className="bg-new-green w-40 h-10 grow rounded-lg text-white font-semibold">
                        Agregar Calificaciones
                    </button>
                </div>

    
                        
                    </CardBody>

                  

                </form>
            </Card>
        </>
    )
}


export default CreateFormStudentGrade;