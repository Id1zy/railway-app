import React, { useState, useEffect } from "react";
import { getCourseAttendance } from "../../api/axiosStudentAttendance";
import Directortable from "./directorCoursesTab";

const AttendanceCourse = ({ courseName, courseId }) => {
  const classes = {
    contenedor: "bg-fondo rounded-lg shadow-md mb-2 p-1 rounded-[20px] grid grid-cols-4 gap-4",
    cont_0: "bg-white rounded-lg shadow-md mb-4 p-4 border-[2px] border-admin-green ",
    cont_2: "col-span-4 rounded-lg relative",
    cont_3: "grid grid-cols-3 col-span-2",
    button: "w-full p-2 bg-blue text-white rounded transform transition-transform duration-300 hover:scale-105 hover:bg-blue-600",
    first: 'text-xl bg-white text-blue font-semibold text-left rounded-l-lg px-2 p-1 ',
    second: 'text-xl bg-white text-blue font-semibold text-left rounded-r-lg px-2 p-1 ',
    titular: "text-xl3 text-blue font-semibold text-left border-b border-admin-green mb-1",
    sub: 'text-xl text-blue font-semibold text-left ',
  };

  const [courseData, setCourseData] = useState(null);
  const [showSections, setShowSections] = useState({});

  const toggleStudents = (sectionId) => {
    setShowSections((prevState) => ({
      ...prevState,
      [sectionId]: !prevState[sectionId],
    }));
  };

  useEffect(() => {
    async function loadCourses() {
      try {
        const res = await getCourseAttendance(courseId);
        if (res && res.data) {
          setCourseData(res.data);
          const initialShowStudents = {};
          res.data.sections.forEach((section) => {
            initialShowStudents[section.section_id] = false;
          });
          setShowSections(initialShowStudents);
        }
      } catch (error) {
        console.error(error);
      }
    }

    loadCourses();
  }, [courseId]);

  const toggleSection = (sectionId) => {
    setShowSections((prevState) => ({
      ...prevState,
      [sectionId]: !prevState[sectionId],
    }));
  };

  const getTextColorStyle = (percentage) => {
    if (percentage < 50) {
      return { color: "red" };
    } else if (percentage >= 50 && percentage < 75) {
      return { color: "blue" };
    } else {
      return { color: "green" };
    }
  };

  const HEAD = [
    "Nombre del Estudiante",
    "RUT",
    "Asistencias",
    "Inasistencias",
    "Porcentaje",
  ];

  return (
    <div className={classes.cont_0}>
      <h3 className={classes.titular}>Curso: {courseData && courseData.course_name}</h3>
      <p className={classes.sub}>
        Promedio de Asistencia:{" "}
        <span style={getTextColorStyle(courseData && courseData.course_attendance_percentage_avg)}>
          {courseData && courseData.course_attendance_percentage_avg ? `${courseData.course_attendance_percentage_avg}%` : "N/A"}
        </span>
      </p>

      {courseData && courseData.sections && courseData.sections.map((section) => (
        <div key={section.section_id} className={classes.contenedor}>
          <div className={classes.cont_2}>
            <div className={classes.cont_3}>
              <h4 className={classes.first}>Sección: {section.section_name}</h4>
              <p className={classes.second}>
                Promedio Asistencia:{" "}
                <span style={getTextColorStyle(section.attendance_percentage_avg)}>
                  {section.attendance_percentage_avg ? `${section.attendance_percentage_avg}%` : "N/A"}
                </span>
              </p>
              <button
                className={classes.button}
                onClick={() => toggleSection(section.section_id)}
              >
                {showSections[section.section_id] ? "Ocultar Detalles Sección" : "Mostrar Detalles Sección"}
              </button>
            </div>
          </div>
          <div className={classes.cont_2}>
            {showSections[section.section_id] && (
              section.students.length > 0 ? (
                <Directortable head={HEAD} row={section.students.map((student) => ({
                  "Nombre del Estudiante": student.student_name,
                  "RUT": student.student_rut,
                  "Asistencias": student.attendance_count,
                  "Inasistencias": student.absence_count,
                  "Porcentaje": student.attendance_percentage,
                }))} />
              ) : (
                <p className={classes.first}>No hay alumnos inscritos en esta sección</p>
              )
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AttendanceCourse;
