import React, { useState, useEffect } from "react";
// Components
import PageUser from "../../hocs/layouts/PageUser";
import SideBar from "../../components/users/sidebar";
// Helpers
import { director_maps } from "../../helpers/users_helpers";
import PageHeading from "../../components/heros/pageHeading";
import { getAllStudentObservations } from "../../api/axiosObservations";
import { getAllCoursesId } from "../../api/axiosStudentGrades";
import "../../components/heros/portals.css";
import SearchBar from "../../components/heros/searchBarDirector";
import List from "../../components/heros/obsCourseCard";
import PositiveChart from "../../components/chart/positiveObsChart";
import NegativeChart from "../../components/chart/negativeObsChart";

const DirectorObs = () => {
  const [courses, setCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [coursesgrf, setCoursesgrf] = useState([]);
  const [filteredCoursesgrf, setFilteredCoursesgrf] = useState([]);
  const itemsPerPage = 4;

  useEffect(() => {
    async function loadCourses() {
      try {
        const res = await getAllCoursesId();
        if (res && res.data && Array.isArray(res.data.courses)) {
          setCourses(res.data.courses);
          setFilteredCourses(res.data.courses);
        }
      } catch (error) {
        console.error(error);
      }
    }

    loadCourses();
  }, []);

  useEffect(() => {
    async function loadCourses() {
      try {
        const res = await getAllStudentObservations();
        if (res && res.data) {
          setCoursesgrf(res.data);
          setFilteredCoursesgrf(res.data);
        }
      } catch (error) {
        console.error(error);
      }
    }

    loadCourses();
  }, []);

  const filterCourses = () => {
    if (searchTerm.trim() === "") {
      setFilteredCourses(courses);
    } else {
      const filtered = courses.filter((course) =>
        course.nivel.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCourses(filtered);
    }
  };

  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);

  return (
    <PageUser color={'bg-white text-blue'} colorInput={'bg-white text-blue'}>
      <SideBar color={'bg-blue'} colorSecond={'blue'} useRol={'Director'} mapeo={director_maps}>
        <div className="w-full bg-fondo p-4 h-full overflow-y-auto">
          <div className="mx-auto max-w-7xl mt-1">
            <div className="grid grid-cols-1 gap-1 mb-5">
              <PageHeading colorText={'text-blue'} border={'border-blue my-0'} title='Detalles de Cursos' />
              
              <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} filterCourses={filterCourses} />

              <div>
                {filteredCourses.length === 0 ? (
                  <p className="text-xl bg-white text-blue font-semibold text-left rounded-lg px-2 p-1 rounded-[20px]">No se encontraron resultados</p>
                ) : (
                  filteredCourses.map((course) => (
                    <div className="mb-4 flex flex-col" key={course.id_course}>
                      <List
                        colorText={"text-blue text-center md:text-left pl-[70px] md:pl-0"}
                        colorButton={"bg-blue"}
                        courseName={course.nivel}
                        subtitle={course.school}
                        courseId={course.id_course}
                        button="Desplegar"
                      />
                    </div>
                  ))
                )}
              </div>

              <div className="bg-gradient-to-r rounded from-blue to-white flex justify-center">
                {generatePageNumbers(currentPage, totalPages).map((pageNumber, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      if (pageNumber !== currentPage) setCurrentPage(pageNumber);
                    }}
                    className={pageNumber === currentPage ? "text-white" : "text-black"}
                  >
                    {pageNumber}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </SideBar>
    </PageUser>
  );
};

const generatePageNumbers = (currentPage, totalPages) => {
  const pageNumbers = [];

  if (totalPages <= 3) {
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  } else {
    if (currentPage <= 2) {
      pageNumbers.push(1, 2, 3, "...");
    } else if (currentPage >= totalPages - 1) {
      pageNumbers.push("...", totalPages - 2, totalPages - 1, totalPages);
    } else {
      pageNumbers.push("...", currentPage - 1, currentPage, currentPage + 1, "...");
    }
  }

  return pageNumbers;
};

export default DirectorObs;