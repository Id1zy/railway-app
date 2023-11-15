import React, { useState, useEffect } from "react";
import { getDirectorInfo } from "../../api/axiosCourses";
import Directortable from "./directorCoursesTab";

const CoursesCourse = ({ courseId, courseName }) => {
  const classes = {
    contenedor: "bg-fondo rounded-lg mb-2 p-1 rounded-[20px] grid grid-cols-4 gap-4",
    contenedor1: "bg-fondo rounded-lg mb-1 p-1 rounded-[20px] grid grid-cols-3 gap-4",
    cont_0: "bg-white rounded-lg shadow-md mb-4 p-4 border-[2px] border-admin-green ",
    cont_2: "col-span-4 rounded-lg relative",
    cont_3: "grid grid-cols-4 col-span-2",
    button: "w-full p-2 bg-blue text-white rounded transform transition-transform duration-300 hover:scale-105 hover:bg-blue-600",
    first: 'text-xl bg-white text-blue font-semibold text-left rounded-lg px-2 p-1 rounded-[20px] ',
    second: 'text-x bg-white text-blue font-semibold text-left rounded-lg px-2 p-1 rounded-[20px] ',
    titular: "text-xl3 text-blue font-semibold text-left border-b border-admin-green mb-1",
    sub: 'text-xl text-blue font-semibold text-left ',
  };

  const [courseData, setCourseData] = useState(null);
  const [showSections, setShowSections] = useState(false);
  const [students, setStudents] = useState([]);
  const [sections, setSections] = useState([]);
  const [professors, setProfessors] = useState([]);

  const toggleStudents = () => {
    setShowSections(!showSections);
  };

  useEffect(() => {
    async function loadCourses() {
      try {
        const res = await getDirectorInfo(courseId);
        if (res && res.data) {
          setCourseData(res.data.Course);
          setStudents(res.data.Course.Students);
          setSections(res.data.Course.Sections);
          setProfessors(res.data.Course.Professors);
        }
      } catch (error) {
        console.error(error);
      }
    }

    loadCourses();
  }, [courseId]);

  const HEAD = [
    "Nombre del Estudiante",
    "Correo Electrónico",
    "Rut",
  ];

  let ROW = [];

  if (students.length > 0) {
    students.forEach((student, index) => {
      const assignedProfessor = professors.find(
        (professor) => professor.Rut === student.Rut
      );

      const studentName = assignedProfessor
        ? `${student.Name} (Profesor: ${assignedProfessor.Name})`
        : student.Name;

      const rowData = {
        "Nombre del Estudiante": studentName,
        "Correo Electrónico": student.correo,
        "Rut": student.Rut,
      };
      ROW.push(rowData);
    });
  }

  return (
    <div className={classes.cont_0}>
      <h3 className={classes.titular}>Curso: {courseName}</h3>
      <h4 className={classes.first}>Información del Profesor:</h4>
      <div className={classes.contenedor1}>
        <p className={classes.second}>Nombre: {professors[0]?.Name}</p>
        <p className={classes.second}>Email: {professors[0]?.Email}</p>
        <p className={classes.second}>Rut: {professors[0]?.Rut}</p>
      </div>

      <h4 className={classes.first}>Secciones:</h4>

      <div className={classes.contenedor}>
        {sections.map((section, index) => (
          <div key={index}>
            <p className={classes.second}>{section}</p>
          </div>
        ))}
      </div>

      <button
        className={classes.button}
        onClick={toggleStudents}
      >
        {showSections ? "Ocultar Alumnos" : "Mostrar Alumnos"}
      </button>
      
      {showSections && (
        students.length > 0 ? (
          <Directortable head={HEAD} row={ROW} />
        ) : (
          <p className={classes.first}>No hay alumnos inscritos en este curso.</p>
        )
      )}
    </div>
  );

};

export default CoursesCourse;