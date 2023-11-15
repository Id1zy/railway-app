// REDUX's imports
import { connect } from "react-redux";
// REACT's imports
import { Navigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// Tailwind CSS
import { Button, Card, CardBody, CardHeader } from "@material-tailwind/react";

// Routes
import { ProfessorRoutes } from "../../helpers/users_routes";
// Functionalities
// GET
import { getDetailSection } from "../../api/axiosSection";
// Delete
import { deleteSingleStudentGrade } from "../../api/axiosStudentGrades";
// React's icons 
import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/20/solid';
import EditStudentGrade from "../../components/forms/edit/editStudentGrade";

//Components
import Portal from "../../components/core/Portal";
import toast from "react-hot-toast";
import { PaginationWhite } from "../../components/users/pagination";


function StudentGradesDisplay({grades, section_id, update, isAuthenticated, user}) {
    const [userData, setUserData] = useState('');
    const [isOpenEdit, setIsOpenEdit] = useState({});
    const [isOpenDelete, setIsOpenDelete] = useState({});
    const [page, setPage] = useState(1);
    const [forPage, setForPage] = useState(7);
    
    const max = (grades.map((item) => (item)).length / forPage)

    const openModalEdit = (stGradesId) => {
      setIsOpenEdit({ [stGradesId]: true });
    };
  
    const closeModalEdit = (stGradesId) => {
      setIsOpenEdit({ [stGradesId]: false });
    };
  
    const openModalDelete = (stGradesId) => {
      setIsOpenDelete({ [stGradesId]: true });
    };
  
    const closeModalDelete = (stGradesId) => {
      setIsOpenDelete({ [stGradesId]: false });
    };
    const handlerDelete = async (grade_id) => {
      try{
        const res = await deleteSingleStudentGrade(grade_id);
        if(res.status === 200){
          toast.success("Calificación eliminada");
          return update()

        }
      } catch(err){
        return err;
      }
    }

    useEffect(() =>{

        if(!isAuthenticated){
           <Navigate to={'/'} />
         }
      
          if(user){
            setUserData(user);
          }


        
        }, [user]);

        return(
          <>
        <Card className="w-full bg-white p-4 h-full">
          <CardHeader className="w-full text-center"><span className="text-xl2">Lista del curso</span></CardHeader>
          <CardBody className="">
          {grades.length > 0 ? <></> : <>No Hay Estudiantes Activos.</>}
            {grades && grades.length !== 0 ? 
            grades.slice((page-1)*forPage, (page-1)*forPage+forPage).map((g, index) => (
                    <Disclosure className="">
                      {({ open }) => (
                        <div className="w-full gap-4">
                          <Disclosure.Button className="flex w-full justify-between rounded-lg bg-emerald-600 px-4 py-2 mt-2 text-left text-lg font-medium text-white drop-shadow-lg hover:cursor-pointer transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-102 hover:bg-admin-green duration-300">
                     
                            <div className="flex flex-wrap text-white font-bold text-left">
                              <p className="mr-2 bg-admin-blue px-3 rounded-lg">N°- {index+1}</p>
                              <p>{g.full_name}</p> 
                            </div>
                            <ChevronUpIcon
                              className={`${
                                open ? 'rotate-180 transform' : ''
                              } h-5 w-5 text-purple-500`}
                            />
                          </Disclosure.Button>
                          <Disclosure.Panel className="flex flex-col w-full justify-start px-4 py-2 bg-sky-900 text-sm text-gray-500 rounded-lg">
                            {g && g.grade && g.grade.length !== 0 ? g.grade.map((i) =>(
                                
                                  <div className="inline-flex w-full my-2 font-medium text-base text-white">
                                    <p className="mr-2 p-1">Nota</p>
                                    <p className='bg-light-gray rounded-lg p-1 mr-2'>
                                      {i["grade_value"]}
                                    </p>
                                    <p className="p-1 mr-2">
                                      {i["weighted_average"] === "Ninguno" ? `Sin ponderación` : `${i["weighted_average"]}%`}
                                      </p>
                                    <p className="p-1 px-3 mr-2 font-light bg-stone-300 rounded-full text-black">coeficiente x {i["coefficient"]}</p>
                                      <Link className="mr-2 p-1 bg-blue rounded-md" 
                                      to={ProfessorRoutes.ChangingGrades.replace(":stid", i["grade_id"]).replace(":snid", section_id)}>Editar</Link>
                                      <Button className="p-1 bg-pink-900" onClick={() => handlerDelete(i["grade_id"])}>Borrar</Button>
                                  </div>
                                )): <p className="bg-new-blue w-fit rounded-lg p-1 px-2 font-medium text-center text-white">Sin calificaciones aún</p>}
                          </Disclosure.Panel>
                        </div>
                      )}
                    </Disclosure>
                )): <div><p>Cargando...</p></div>}
                <PaginationWhite page={page} setPage={(n)=>setPage(n)} max={max}/>
            </CardBody>
        </Card>

          </>
        )
};

const mapStateToProps = state => ({
    isAuthenticated: state.Auth.isAuthenticated,
    user: state.Auth.user
  });
  export default connect(mapStateToProps,{
  })(StudentGradesDisplay);