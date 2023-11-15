import React, { useState, useEffect } from 'react';
import DashCard from "../../components/heros/dashboardCard";
import DashGrfCard from "../../components/heros/dashboardGrfCard";
import { getStudentAttendances, getStudentsGrades, getStudentsObservations } from '../../api/axiosGuardian';

const DashboardStudentCard = ({ title, subtitle, quantity, buttonText, color, hovercolor, colortext }) => {
  const [attendanceData, setAttendanceData] = useState(null);
  const [gradesData, setGradesData] = useState(null);
  const [annotationsData, setAnnotationsData] = useState(null);

  const fetchData = async () => {
    try {
      const attendanceResponse = await getStudentAttendances(quantity);
      if (attendanceResponse) {
        setAttendanceData(attendanceResponse);
      } else {
        console.warn('La respuesta no contiene datos de guardian (asistencia):', attendanceResponse.data);
      }

      // Obtener datos de notas
      const gradesResponse = await getStudentsGrades(quantity);
      if (gradesResponse) {
        setGradesData(gradesResponse.data);
      } else {
        console.warn('La respuesta no contiene datos de guardian (notas):', gradesResponse.data);
      }
      const annotationsResponse = await getStudentsObservations(quantity);
      if (annotationsResponse) {
        setAnnotationsData(annotationsResponse.data);
      } else {
        console.warn('La respuesta no contiene datos de guardian (anotaciones):', annotationsResponse.data);
      }
    } catch (error) {
      console.error('Error al obtener datos:', error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const containerStyle = {
    backgroundColor: color,
  };
  
  return (
    <div className="bg-white text-blue font-bold rounded-[20px] p-3 shadow-tech-outer border-[2px] border-blue" style={containerStyle}>
      <div className="justify-between">
      <p className={`${colortext} text-xl bg-blue text-white font-bold text-center mb-2 px-8 rounded-md`}>{title}</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">
      <div>
        <DashCard
          title="Promedio General"
          subtitle1=""
          subtitle2=""
          quantity1={gradesData ? gradesData.promedio_general_estudiante : 0}
          quantity2=""
          buttonText="Click Me"
          color="bg-deep-green"
          hovercolor="bg-deep-green"
          colortext="text-new-green"
        />
      </div>
      <div>
        <DashCard
          title="Asistencia General"
          subtitle1={`${attendanceData ? attendanceData.attendance_percentage : 'N/A'}%`}
          quantity2=""
          color="bg-new-blue"
          hovercolor="text-new-blue"
          colortext="text-new-blue"
        />
      </div>
      <div>
        <DashGrfCard
          title="Asistencia"
          subtitle1="Asistencias: "
          subtitle2="Ausencias: "
          quantity1={`${attendanceData ? attendanceData.attendance_count : 'N/A'}`}
          quantity2={`${attendanceData ? attendanceData.absence_count : 'N/A'}`}
          buttonText="Click Me"
          color="bg-new-blue"
          hovercolor="text-new-blue"
          colortext="text-new-blue"
          color1="rgb(54, 162, 235)"
          color2="rgb(255, 99, 132)"
        />
      </div>
      <div>
        <DashGrfCard
        title="Anotaciones"
        subtitle1="Positivas: "
        subtitle2="Negativas: "
        quantity1={annotationsData ? annotationsData.anotaciones_positivas : 0}
        quantity2={annotationsData ? annotationsData.anotaciones_negativas : 0}
        buttonText="Click Me"
        color="bg-new-red"
        hovercolor="text-new-red"
        colortext="text-new-red"
        color1="rgb(54, 162, 235)"
        color2="rgb(255, 99, 132)"
      />
      </div>
    </div>
  </div>
  );
};

export default DashboardStudentCard;
