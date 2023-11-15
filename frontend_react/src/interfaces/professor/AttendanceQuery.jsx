// React imports
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
// Components
import { PaginationWhite} from "../../components/users/pagination";
// Helpers

// Functionalities
 import { getScheduleofSection } from "../../api/axiosSection";
 import { getAttendanceOfDate, getStAttendanceEdit, Edit_date} from "../../api/axiosStudentAttendance";

// Tailwind
import { Card, CardBody, CardFooter, CardHeader } from "@material-tailwind/react";

export default function AttendanceQuery({section_id, schedule_id, update}){

    const [attendance, setAttendance] = useState([]);
    const [scheduleDetails, setScheduleDetails] = useState({});
    const [editor, setEditor] = useState([]);
    const [form, setForm] = useState([]);
    const [date, setDate] = useState();
    const navigate = useNavigate();
    const params = useParams();
    const { register, handleSubmit, formState: { errors }, watch, reset} = useForm();
  
    // Pagination States
    const [page, setPage] = useState(1);
    const [forPage, setForPage] = useState(7);
    const max = editor.map((item) => item).length / forPage;


    const classes = ({
        first: 'flex content-center items-center justify-between mx-2 my-6 border-b-4 pb-4',
        second:'text-xl2 sm:text-xl3 font-bold leading-7 text-blue ',
        third: 'button_tech_colorless',
      })

      useEffect(() => {
        const loadScheduleOfSection = async () => {
          try{
            const res = await getScheduleofSection(section_id, schedule_id); 
            if(res.data && res.data.results){
              setScheduleDetails(res.data.results[0])
            }
          } catch(err) {
            return err;
          }
        }

        loadScheduleOfSection();


        
      }, []);

 
      

    const getAttendance = async (data) => {
      try{
        const res = await getAttendanceOfDate(data);
        if(res.data && res.data.response){
          setAttendance(res.data.response);
          update();
        }
      } catch(err){
        return err;
      }
    }

    const onSubmit =  async (data) => {
        data.schedule_id = schedule_id;
        getAttendance(data);
        setDate(data['date']);
        try{
          const res = await getStAttendanceEdit(params.sid, params.schid, data.date); 
          update();
          console.log(res)
          if(res && res.data){
            setEditor(res.data)
            res.forEach(item => {
              setForm(prevForm => ([...prevForm, {[item.RUT]: item.Estado}]));
          });
          }
        } catch(err) {
          return err;
        }
  
    };

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

  const handleSubmit2 = () =>{
    try{
      Edit_date(params.sid, params.schid, date, form)
      
    }catch(e){
      console.log(e);
    }
  }


    return (
        <>
            <Card className="w-full p-5">
              <div className="bg-new-blue rounded-md p-2">
                <p className="text-white font-bold text-xl text-center">Consultas</p>
              </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <CardHeader className="flex flex-row flex-wrap md:flex-nowrap my-2 py-2 justify-center">
                      <div className="flex mr-5 bg-new-green p-2 rounded-md items-center">
                          <p className="text-white font-semibold">Buscar fecha:</p>
                      </div>
                      <div className="flex w-1/3 mr-5">
                          <select className="rounded-lg w-full" {...register("date", {
                            required : {
                              value:true,
                              message: "Debe seleccionar una fecha"
                            }
                          })}>
                            {scheduleDetails && scheduleDetails.class_days ?
                            scheduleDetails.class_days.map((date)=>(
                              <option value={date}>{date}</option>
                            )): <></>}
                          </select>
                      </div>
                      
                      <button type="submit" className="flex bg-new-blue rounded-lg px-4 py-2 mt-2 text-left text-base font-medium text-white drop-shadow-lg hover:cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-102 hover:bg-blue duration-300">Consultar</button>
                  </CardHeader>
                  {errors.date && <p className="text-center"><span className="text-pink-900">{errors.date.message}</span></p>}
                </form>
              <CardBody className="flex flex-col justify-between w-full ">
                <div className="inline-flex justify-between mb-3 space-x-2">
                  <div className="bg-new-blue grow rounded-md p-2">
                  <p className="text-base text-white font-bold ">Nombre del estudiante</p>
                  </div>
                  <div className="bg-new-blue rounded-md p-2">
                  <p className="text-base text-white font-bold ">Asistencia</p>
                  </div>
                </div>
                {editor && editor.length !== 0 ? editor.slice((page-1)*forPage, (page-1)*forPage+forPage).map((att,index) => ( 
                    <div className="inline-flex justify-between mb-3">
                        <p className="flex w-4/5 rounded-lg bg-new-green text-white text-base font-semibold p-2">
                          Estudiante N°{index+1}: {att.Estudiante}
                        </p>
                        <div className="mr-8">
                          {att.Estado ?<>
                            <input 
                              type="checkbox" 
                              name={att.RUT}
                              defaultChecked={true}
                              className="p-2 cursor-pointer border-2 border-new-blue rounded-md checked:border-new-green checked:bg-new-green focus:checked:border-new-green focus:checked:bg-new-green"
                              onChange={(event) => handleChange(event)}
                          />
                          </> :<> <input 
                              type="checkbox" 
                              name={att.RUT}
                              className="p-2 cursor-pointer border-2 border-new-blue rounded-md checked:border-new-green checked:bg-new-green focus:checked:border-new-green focus:checked:bg-new-green"
                              onChange={(event) => handleChange(event)}
                          />
                          </>}
                        
                        </div>
                    </div>
                )): <p className="font-light">Seleccione una fecha y consulte aquí la asistencia</p>}

<div className="flex justify-end space-x-2">

                    <button type="button" 
                    onClick={()=>handleSubmit2()}
                    className="bg-new-blue w-40 h-10 rounded-lg text-white font-semibold">
                        Editar asistencia
                    </button>
                </div>
              </CardBody>
              <PaginationWhite page={page} setPage={(n) => setPage(n)} max={max}/>
          </Card>
        </>

    )
}