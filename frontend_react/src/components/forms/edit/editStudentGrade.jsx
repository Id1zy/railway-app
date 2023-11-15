// React's imports
import { useState, useEffect, useContext } from "react";
import { useParams, Link, useNavigate} from "react-router-dom";
import React from "react";
import {useForm} from "react-hook-form";
// Redux's imports
import { connect } from "react-redux";
//Components
import PageUser from "../../../hocs/layouts/PageUser";
import SideBar from "../../../components/users/sidebar";

// Tabs Tailwind Components
import { Button, Card, CardBody, CardHeader, CardFooter } from "@material-tailwind/react";
// Helpers
import { profesor_maps } from "../../../helpers/users_helpers";

// Functionalities
import { getStudentsOfSection } from "../../../api/axiosStudentSection";
import { getDetailSection } from "../../../api/axiosSection";
import { getGradesOfStudent } from "../../../api/axiosStudentGrades";
import {getSingleStudentGrade} from "../../../api/axiosStudentGrades";
import {getSingleStudent} from "../../../api/axiosStudent";
import { getAllWAverage } from "../../../api/axiosWAverage";
import { ProfessorRoutes } from "../../../helpers/users_routes";
import { updateStudentGrades } from "../../../api/axiosStudentGrades";
import toast from "react-hot-toast";


const EditStudentGrades = () => {
    const [userData, setUserData] = useState('');
    const [gradeDetails, setGradesDetails] = useState([]);
    const [WAverage, setWAverage] = useState([]);
    const params = useParams();
    const navigate = useNavigate();

    const {register, handleSubmit, formState: { errors }, setValue} = useForm();
    const [isUpdating, setIsUpdating] = useState(false);
    

    const onSubmit = async (data) => {
      setIsUpdating(true);
      const res = await updateStudentGrades(data, params.stid);
      if(res.status === 200){
        toast.success("Calificación actualizada")
      }
      navigate(-1);



      
  };


    useEffect(() => {
      const getGradeDetails = async () => {
        try{
          const res = await getSingleStudentGrade(params.stid);
          if(res.data && res.data.results){
            setGradesDetails(res.data.results[0]);
            console.log(res.data.results[0]);
            setValue("student_grade", res.data.results[0].grade.student_grade);
            setValue("id_weighted_average", res.data.results[0].grade.id_weighted_average);
            setValue("coefficient", res.data.results[0].grade.coefficient);
          }
        } catch(err) {
          return err;
        }
      }

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

      getGradeDetails();
      weighted_average();

    }, []);




    return(
      <>

          <PageUser color={'bg-fondo text-blue'} colorInput={'bg-fondo text-blue placeholder-blue'}>
            <SideBar  color={'bg-blue'} colorSecond={'deep-blue'} useRol={'Profesor'} mapeo={profesor_maps}>
            {/* Parte Central */}
            <div className="w-full md:w-4/5 bg-fondo p-4 h-full">    
            <div className="mx-auto max-w-7xl mt-4">
            <div className="gap-4 mb-5">

            {/* PageHeading but it's modified */}
            <div className=''>
                <div className={'flex content-center items-center justify-center md:justify-between mx-2 my-6 border-b-4 pb-4'}>
                <div className="min-w-0 flex-1">
                    <h2 className={`text-xl2 sm:text-xl3 font-bold leading-7 text-blue`}>
                      {gradeDetails.length !==  0 ?  `Editando calificación de ${gradeDetails.full_name}`: `cargando...`}
                    </h2>
                </div>
                <div className="flex lg:ml-4 lg:mt-0">
                </div>
                </div>
            </div>
            
            <Card>
          <form onSubmit={handleSubmit(onSubmit)}>
              <CardHeader className='text-center'>
                  <h2 className="font-bold text-lg mt-5">Ingrese los nuevos valores</h2>
              </CardHeader>
              <CardBody className="flex">
                  <div className="flex flex-col w-full">
                      <div className="inline-flex flex-wrap md:flex-nowrap w-full justify-center md:justify-evenly">
                          <div className="mb-4 max-w-min">
                              <p className="">Calificación</p>
                          </div>
                          <div className="mb-4 w-full md:max-w-md">
                              <input type="text" className="text-center rounded-lg w-full" 
                              {...register("student_grade",{
                                  required: {
                                      value: true,
                                      message: "Debe ingresar una calificación"
                                  }
                              })} 
                              
                              />
                          </div>

                      </div>
                      {errors.student_grade && 
                              <div className="flex justify-center">
                                  <span className="text-red-600">{errors.student_grade.message}</span>
                              </div>
                          }
                      <div className="inline-flex flex-wrap md:flex-nowrap w-full justify-evenly">
                          <div className="flex mb-4 max-w-min">
                              <p className="">Ponderación</p>
                          </div>
                          <div className="flex mb-4 w-full md:max-w-md">
                              <select className="flex text-center rounded-lg w-full" 
                                  {...register("id_weighted_average")}
                                  selected={gradeDetails.length !== 0 ? `${gradeDetails.grade.weighted_average}`: '0'}
                                  >

                                    {WAverage.length !== 0 ? WAverage.map((wa) => (
                                        <option value={wa.id_weighted_average}>{wa.weighted_average}%</option>
                                    )) : <option>cargando...</option>}
                                
                              </select>
                          </div>
                      </div>
                      <div className="inline-flex flex-wrap md:flex-nowrap justify-evenly">
                          <div className="flex max-w-min">
                              <p className="">Coeficiente</p>
                          </div>
                          <div className="flex w-full md:max-w-md">
                              <input type="text" className="text-center rounded-lg w-full" 
                                {...register("coefficient")}

                                />
                          </div>
                      </div>
                  </div>
                  
              </CardBody>
              <CardFooter className="flex justify-evenly">
                  <Button className="bg-green-600" type="submit">Confirmar cambios</Button>
                  <Link className="bg-pink-900 w-40 h-10 rounded-lg pt-2 font-semibold text-center align-middle text-white text-sm" to={ProfessorRoutes.Grades.replace(":uid", params.snid)}>CANCELAR</Link>
              </CardFooter>
          </form>
      </Card>



            </div>
            </div>
            </div>


          </SideBar>

   </PageUser>
      </>
);
}


const mapStateToProps = state => ({
  });
  export default connect(mapStateToProps,{
  })(EditStudentGrades);