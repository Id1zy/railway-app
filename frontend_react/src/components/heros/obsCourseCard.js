import React, { useState, useEffect } from "react";
import { getCourseStudentObservations } from "../../api/axiosObservations";
import TableObs from "./obsSectionTable";
import { Doughnut } from 'react-chartjs-2';

const List = ({ courseId }) => {
  const classes = {
    titular: 'text-xl2 text-blue font-semibold text-center border-b border-admin-green mb-2',
    button: "w-full p-2 bg-blue text-white rounded transform transition-transform duration-300 hover:scale-105 hover:bg-blue-600",
    first: 'text-xl text-blue font-semibold text-center mb-6',
    second: 'text-xl3 text-blue font-medium text-center',
    third: 'text-xl text-blue font-semibold text-center mt-20',
    fourth: 'text-xl text-blue font-semibold text-left mb-6',
    courseCon: 'bg-UTP-comp border-l-[10px] border-UTP-des rounded-[20px] p-3 shadow-md sm:grid-cols-2 py-2 mb-4',
    total_an: 'bg-white rounded-lg grid shadow-md col-start-1 col-end-3',
    anotacion: 'bg-white rounded-lg grid shadow-md col-start-1 col-end-3',
  };

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    async function loadCourses(courseId) {
      try {
        const res = await getCourseStudentObservations(courseId);
        if (res && res.data) {
          setCourses(res.data);
        }
      } catch (error) {
        console.error(error);
      }
    }

    loadCourses(courseId);
  }, [courseId]); // Incluye courseId en el array de dependencias

  const [mostrarDesplegar, setDesplegar] = useState({});

  const toggleSection = (courseId) => {
    const updatedDesplegar = { ...mostrarDesplegar };
    updatedDesplegar[courseId] = !updatedDesplegar[courseId];
    setDesplegar(updatedDesplegar);
  };

  const HEAD = ["Seccion", "Positivas", "Negativas"];
  const ROW = courses.flatMap((course) =>
    mostrarDesplegar[course.id_course] ? course.secciones : []
  );

  return (
    <div>
      {Array.isArray(courses) && courses.length > 0 ? (
        courses.map((course) => (
          <div className={classes.courseCon} key={course.id_course}>
            <p className={classes.titular}>Curso: {course.curso}</p>
            <div className="grid grid-cols-4 grid-rows-2 gap-2">
              <div class="col-span-2 row-span-2 ">
                {course.anotaciones_positivas > 0 || course.anotaciones_negativas > 0 ? (
                  <Doughnut
                    data={{
                      labels: ['Positivas', 'Negativas'],
                      datasets: [
                        {
                          data: [course.anotaciones_positivas, course.anotaciones_negativas],
                          backgroundColor: ['#36A2EB', '#FF6384'],
                        },
                      ],
                    }}
                    options={{
                      plugins: { legend: { display: false } },
                      maintainAspectRatio: false,
                      responsive: true,
                    }}
                    width={300}
                    height={200}
                  />
                ) : (
                  <p className={classes.third}>No hay anotaciones en el curso</p>
                )}
              </div>
              <div class="col-span-2 row-span-1">
                <div className={classes.total_an}>
                  <p className={classes.first}>Total Anotaciones</p>
                  <p className={classes.second}>{course.total_anotaciones}</p>
                </div>
              </div>
              <div class="col-span-1 row-span-1">
                <div className={classes.anotacion}>
                  <p className={classes.first}>Positivas</p>
                  <p className={classes.second}>{course.anotaciones_positivas}</p>
                </div>
              </div>
              <div class="col-span-1 row-span-1">
                <div className={classes.anotacion}>
                  <p className={classes.first}>Negativas</p>
                  <p className={classes.second}>{course.anotaciones_negativas}</p>
                </div>
              </div>
              <div class="col-span-4 row-span-1">
                <button className={classes.button} onClick={() => toggleSection(course.id_course)}>
                  {mostrarDesplegar[course.id_course] ? "Ocultar Secciones" : "Mostrar Secciones"}
                </button>
              </div>
            </div>
            {mostrarDesplegar[course.id_course] && (
              course.anotaciones_positivas > 0 || course.anotaciones_negativas > 0 ? (
                <TableObs head={HEAD} row={course.secciones} />
              ) : (
                <p className={classes.fourth}>No hay anotaciones en el curso</p>
              )
            )}
          </div>
        ))
      ) : (
        <p>No hay datos de cursos disponibles</p>
      )}
    </div>
  );
};

export default List;