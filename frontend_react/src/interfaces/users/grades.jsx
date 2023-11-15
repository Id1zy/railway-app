// React Functions
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
//Components
import PageUser from "../../hocs/layouts/PageUser";
import SideBar from "../../components/users/sidebar";
import { StudentRoutes } from "../../helpers/users_routes";
// Images
import { index_maps } from "../../helpers/users_helpers";
import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/20/solid'
import { Chip } from "@material-tailwind/react";
import { getGrades } from "../../api/axiosGrades";
import { getDetailSection } from "../../api/axiosSection";
import { Link } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

  // Función para calcular el promedio
  const calculateAverage = (grades) => {
    console.log('Datos de entrada:', grades);
  
    const allHaveWeighting = grades.every(
      (grade) => parseFloat(grade.weighted_average) !== 0
    );
  
    console.log('Todos tienen ponderación:', allHaveWeighting);
  
    if (allHaveWeighting) {
      // Calcula el promedio ponderado
      const totalWeightedSum = grades.reduce(
        (sum, grade) =>
          sum +
          parseFloat(grade.student_grade) *
            (parseFloat(grade.weighted_average) / 100),
        0
      );
  
      console.log('Suma ponderada:', totalWeightedSum);
  
      const totalWeight = grades.reduce(
        (sum, grade) => sum + parseFloat(grade.weighted_average) / 100,
        0
      );
  
      console.log('Total de ponderación:', totalWeight);
  
      // Redondea el resultado a 2 decimales
      return totalWeightedSum.toFixed(2)
    } else {
      // Calcula el promedio aritmético simple
      const sum = grades.reduce(
        (sum, grade) => sum + parseFloat(grade.student_grade),
        0
      );
  
      console.log('Suma simple:', sum);
  
      // Redondea el resultado a 2 decimales
      return (sum / grades.length).toFixed(2);
    }
  };


const Grades = ({  user }) => {
  const [userData, setUserData] = useState('');
  const [gradeList, setGrade] = useState([]);
  const [subjectDetail, setSubject] = useState([]);
  const [average, setAverage] = useState(0);
  const params = useParams()
  
 

  useEffect(() => {

    if (user) {
      setUserData(user);
    }

    async function loadGrades() {
      try {
        const res = await getGrades(params.uid);
        console.log("Datos recibidos:", res.data.results);
        if (res && Array.isArray(res.data.results)) {
          setGrade(res.data.results);
          setAverage(calculateAverage(res.data.results));
          
        } else {
          // Manejar la situación en que res.data.results no es un array
          console.error('res.data.results no es un array', res.data.results);
        }
    
        const res2 = await getDetailSection(params.uid);
        if (res2 && Array.isArray(res2.data.results)) {
          setSubject(res2.data.results);
        } else {
          // Manejar la situación en que res2.data.results no es un array
          console.error('res2.data.results no es un array', res2.data.results);
        }

        console.log("Grade list:", gradeList);
        console.log("Subject detail:", subjectDetail);
      } catch (error) {
        console.error('Error al cargar los datos:', error);
      }
    }
    loadGrades();
  }, [user,params.uid]);


  const GradeCard = ({ item }) => (
    <div className="rounded-2xl bg-white shadow-md p-4 m-2" key={item.id}>
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className="flex justify-between items-center rounded-lg p-2 hover:bg-purple-200 focus:outline-none">
              <span className="text-blue font-semibold">Evaluación N°{item.id_student_grades}</span>
              <div className="flex items-center">
                <span className="bg-blue rounded-full p-3 text-white font-bold mr-2">{item.student_grade}</span>
                <ChevronUpIcon className={`${open ? 'transform rotate-180' : ''} w-5 h-5 text-purple-500`} />
              </div>
            </Disclosure.Button>
            <Disclosure.Panel className="p-4 text-sm text-gray-500">
              Detalles de la evaluación aquí.
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );

 

    return(
        <PageUser color={'bg-white text-blue'} colorInput={'bg-white text-blue'} >

          <SideBar  color={'bg-blue'} userData={userData} useRol="Estudiante" mapeo={index_maps}>
            {/* Parte Central */}
           
            <div className="w-full md:w-4/5 bg-fondo p-4 h-full shadow-md overflow-y-auto"> 
            <div className=''>
    <div className='flex content-center items-center justify-between mx-2 my-6 border-b-4 pb-4 border-blue'>
    <div className="flex items-center">
            <Link to={StudentRoutes.Subject}><ArrowLeftIcon className="h-6 w-6 text-blue hover:text-white hover:rounded-full hover:bg-blue"/></Link>

        </div>
      <div className="min-w-0 flex-1">
        <h2 className='text-xl2 sm:text-xl3 text-center font-bold leading-7 text-blue '>
          Calificaciones
        </h2>
      </div>
    </div>
    </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
    
    {/* Card para "Promedio" */}
    <div className="rounded-xl shadow-lg p-3 bg-white border-b-4 border-blue">
    <div className="w-full grid place-items-center text-left">
        <p className="text-blue font-bold">Promedio</p>
        <div
            className="w-[150px] h-[150px] rounded-full 
                inline-flex items-center justify-center  bg-blue animate-pulse"
>
            <div
                className="w-[100px] h-[100px] rounded-full 
                    inline-flex items-center justify-center 
                    bg-white text-blue text-xl font-bold">
                {average}
            </div>
        </div>
    </div>
</div>

    {/* Card para los detalles del profesor y el curso */}
    <div className="flex flex-col rounded-xl shadow-lg p-5 bg-white border-b-4 border-blue space-y-3">
        <div className="flex justify-between items-center w-full">
            <h3 className="font-bold text-gray-800 md:text-2xl text-xl">Seccion: {subjectDetail.length > 0 ? subjectDetail[0].name : null}</h3>
            <Chip value="Activado" className="bg-admin-green text-white rounded-full text-sm py-1 px-3"/>
        </div>
        <p className="text-lg text-gray-600">Rut Profesor: {subjectDetail.length > 0 ? subjectDetail[0].professor_rut : null}</p>
        <p className="text-lg text-gray-600">Periodo: {subjectDetail.length > 0 ? subjectDetail[0].period : null}</p>
    </div>
</div>
    <div className="w-full md:max-w-8xl  mx-auto p-4">
    {gradeList.length > 0 ? (
        gradeList.map((item) => (
            <div className="evaluationBox my-4 " key={item.id}>
<Disclosure>
    {({ open }) => (
        <>
            <Disclosure.Button className="flex w-full items-center justify-between px-6 py-3 bg-white shadow-md hover:shadow-lg transition-shadow duration-300 rounded-lg focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                <p className="text-lg font-bold text-gray-700">Evaluación N°{item.id_student_grades}</p>
                
                {/* Aquí está la nota rodeada con un círculo de color */}
                <div className="gradeCircle">
                    <div className={`w-[70px] h-[70px] border-4 ${item.student_grade < 4 ? 'border-red-400' : 'border-blue'} rounded-full flex items-center justify-center`}>
                        <div className="w-[60px] h-[60px] bg-white rounded-full inline-flex items-center justify-center text-lg font-bold">
                            {item.student_grade}
                        </div>
                    </div>
                </div>
                
                <ChevronUpIcon className={`${open ? 'rotate-180 transform' : ''} h-5 w-5 text-purple-500 transition-transform duration-300`} />
            </Disclosure.Button>
            <Disclosure.Panel className="px-6 pt-4 pb-2 text-sm text-gray-500">
            <p className="text-lg font-medium text-gray-700">Nota Coeficiente {item.coefficient}</p>
              
            </Disclosure.Panel>
        </>
    )}
</Disclosure>
            </div>
        ))
    ) : (
        <p className="text-center text-gray-700">No hay calificaciones disponibles.</p>
    )}
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
  })(Grades);