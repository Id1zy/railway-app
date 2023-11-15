import React, { useState, useEffect } from "react";
import { getCourseForum } from "../../api/axiosForum";
import Directortable from "./directorCoursesTab";

const ForumCourse = ({ courseId }) => {
  const classes = {
    contenedor: "bg-fondo rounded-lg shadow-md mb-2 p-1 rounded-[20px] grid grid-cols-4 gap-4",
    cont_0: "bg-white rounded-lg shadow-md mb-4 p-4 border-[2px] border-admin-green ",
    cont_2: "col-span-4 rounded-lg relative",
    cont_3: "grid grid-cols-4 col-span-2",
    button: " w-full p-2 bg-blue text-white rounded transform transition-transform duration-300 hover:scale-105 hover:bg-blue-600",
    first: 'text-xl bg-white text-blue font-semibold text-left rounded-l-lg px-2 p-1 ',
    second: 'text-xl bg-white text-blue font-semibold text-left px-2 p-1 ',
    third: 'text-xl bg-white text-blue font-semibold text-left rounded-r-lg px-2 p-1 ',
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
        const res = await getCourseForum(courseId);
        if (res && res.data) {
          setCourseData(res.data);
          const initialShowForums = {};
          res.data.secciones.forEach((seccion) => {
            initialShowForums[seccion.section_id] = false;
          });
          setShowSections(initialShowForums);
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

  const HEAD = [
    "Id",
    "Titulo",
    "Autor",
    "Descripción",
    "Categoria",
    "Estado",
  ];
  const formatForumData = (foro) => {
    return {
      "Id": foro.foro_id,
      "Titulo": foro.title,
      "Autor": foro.author,
      "Descripción": foro.description,
      "Categoria": foro.category,
      "Estado": foro.status,
    };
  };

  let ROW = [];

  if (courseData && courseData.secciones) {
    ROW = courseData.secciones.flatMap((seccion) =>
      seccion.estudiantes.map((foro) => formatForumData(foro))
    );
  }

  return (
    <div className={classes.cont_0}>
      <h3 className={classes.titular}>Curso: {courseData && courseData.course_name}</h3>
      <p className={classes.sub}>Foros Totales: {courseData && courseData.total_foros}</p>
  
      {courseData && courseData.sections.map((section) => (
        <div key={section.section_id} className={classes.contenedor}>
          <div className={classes.cont_2}>
            <div className={classes.cont_3}>
              <h4 className={classes.first}>Sección: {section.section_name}</h4>
              <p className={classes.second}>Foros Publicados: {section.foros_publicados}</p>
              <p className={classes.third}>Borradores: {section.foros_borradores}</p>
              <button
                className={classes.button}
                onClick={() => toggleSection(section.section_id)}
              >
                {showSections[section.section_id] ? "Ocultar Detalles" : "Mostrar Detalles"}
              </button>
            </div>
          </div>
          <div className={classes.cont_2}>
            {showSections[section.section_id] ? (
              section.foros && section.foros.length > 0 ? (
                <Directortable head={HEAD} row={section.foros.map(formatForumData)} />
              ) : (
                <p className={classes.first}>No hay Foros en esta sección.</p>
              )
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ForumCourse;