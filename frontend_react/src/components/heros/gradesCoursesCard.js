import React, { useState, useEffect } from "react";
import { getCourseGrades } from "../../api/axiosStudentGrades";
import Directortable from "./directorCoursesTab";

const GradeCourse = ({ courseName, courseId }) => {
  const classes = {
    contenedor: "bg-fondo rounded-lg shadow-md mb-4 p-1 rounded-[20px] grid grid-cols-4 gap-4",
    cont_0: "bg-white rounded-lg shadow-md mb-4 p-4 border-[2px] border-admin-green ",
    cont_1: "col-span-2 bg-white rounded-lg shadow-md relative",
    cont_2: "col-span-4 bg-white rounded-lg shadow-md relative",
    cont_3: "col-span-2 bg-white rounded-lg shadow-md relative",
    button: "w-full p-1 bg-blue text-white rounded transform transition-transform duration-300 hover:scale-105 hover:bg-blue-600",
    first: 'text-xl2 text-blue font-semibold text-center',
    second: 'text-xl text-blue font-semibold text-center ',
    titular: "text-xl3 text-blue font-semibold text-left border-b border-admin-green mb-1",
  };

  const [courseData, setCourseData] = useState(null);
  const [showStudents, setShowStudents] = useState({});

  const toggleStudents = (sectionId) => {
    setShowStudents((prevState) => ({
      ...prevState,
      [sectionId]: !prevState[sectionId],
    }));
  };

  const getPromedioColor = (promedio) => {
    if (promedio < 4) {
      return "red";
    } else if (promedio >= 4 && promedio < 6) {
      return "blue";
    } else {
      return "green";
    }
  };

  useEffect(() => {
    async function loadCourses() {
      try {
        const res = await getCourseGrades(courseId);
        if (res && res.data) {
          setCourseData(res.data);
          const initialShowStudents = {};
          res.data.secciones.forEach((seccion) => {
            initialShowStudents[seccion.section_id] = false;
          });
          setShowStudents(initialShowStudents);
        }
      } catch (error) {
        console.error(error);
      }
    }

    loadCourses();
  }, [courseId]);

  const HEAD = [
    "Nombre del Estudiante",
    "RUT",
    "Promedio",
    "Desempeño",
  ];

  const formatStudentData = (student) => {
    return {
      "Nombre del Estudiante": student.student_name,
      "RUT": student.student_id,
      "Promedio": student.promedio_seccion,
      "Desempeño": student.estado,
    };
  };

  return (
    <div className={classes.cont_0}>
      <h3 className={classes.titular}>Curso: {courseName}</h3>
      <div className="grid grid-cols-4 gap-2 col-span-2 mb-1">
        {courseData && (
          <>
            <div className={classes.cont_3}>
              <p className={classes.second}>Estudiantes</p>
              <h3 className={classes.second}>{courseData.cantidad_alumnos_curso}</h3>
            </div>
            <div className={classes.cont_3}>
              <p className={classes.second}>Promedio General Curso</p>
              <h3 className={classes.second} style={{ color: getPromedioColor(courseData.promedio_general_curso) }}>
                {courseData.promedio_general_curso}
              </h3>
            </div>
          </>
        )}
      </div>

      {courseData && (
        <div>
          {courseData.secciones.map((seccion) => (
            <div key={seccion.section_id} className={classes.contenedor}>
              <div className={classes.cont_2}>
                <h4 className={classes.first}>Sección: {seccion.section_name}</h4>
              </div>

              <div className="grid grid-cols-2 gap-2 col-span-2">
                <div className={classes.cont_3}>
                  <p className={classes.second}>Alumnos Destacados: {seccion.alumnos_sobresalientes}</p>
                </div>
                <div className={classes.cont_3}>
                  <p className={classes.second}>Alumnos Promedio: {seccion.alumnos_promedio}</p>
                </div>
                <div className={classes.cont_3}>
                  <p className={classes.second}>Alumnos en Peligro: {seccion.alumnos_en_peligro}</p>
                </div>
              </div>
              <div className={classes.cont_3}>
                <p className={classes.second}>Promedio General</p>
                <p className={classes.first} style={{ color: getPromedioColor(seccion.promedio_general_seccion) }}>
                  {seccion.promedio_general_seccion}
                </p>
              </div>
              <div className="col-span-4 p-1 text-center">
                <button
                  className={classes.button}
                  onClick={() => toggleStudents(seccion.section_id)}
                >
                  {showStudents[seccion.section_id] ? "Ocultar Estudiantes" : "Mostrar Estudiantes"}
                </button>
                {showStudents[seccion.section_id] ? (
                  seccion.estudiantes.length === 0 ? (
                    <p className={classes.second}>No hay estudiantes inscritos en esta sección</p>
                  ) : (
                    <Directortable head={HEAD} row={seccion.estudiantes.map(formatStudentData)} />
                  )
                ) : null}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GradeCourse;
