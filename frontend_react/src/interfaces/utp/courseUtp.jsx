import React, { useState, useEffect } from 'react';
import PageUser from '../../hocs/layouts/PageUser';
import SideBar from '../../components/users/sidebar';
import PageHeading from '../../components/heros/pageHeading';
import { getUTPCourses } from '../../api/axiosSection';
import { utp_maps } from '../../helpers/users_helpers';
import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/20/solid';
import { useNavigate } from 'react-router-dom';
import { PaginationWhite2 } from '../../components/users/pagination';
import Portal from "../../components/core/Portal";
import CreateCourse from '../../components/forms/createCourse';
import CreateSection from '../../components/forms/createSection';
import EditSection from '../../components/forms/edit/editSection';
import EditCourse from '../../components/forms/edit/editCourse';
import { deactivateCourse } from '../../api/axiosCourses';
import { activateCourse } from '../../api/axiosCourses';
import { desactivateSection } from '../../api/axiosSection';
import { activateSection } from '../../api/axiosSection';
import { toast } from "react-hot-toast";


const UTPCoursesComponent = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 5;

  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isCreateSectionModalOpen, setCreateSectionModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState({ nivel: "", id_course: null });
  const [isEditSectionModalOpen, setIsEditSectionModalOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState(null);
  const [isEditCourseModalOpen, setIsEditCourseModalOpen] = useState(false);
  const [selectedEditCourse, setSelectedEditCourse] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');


  const openModalCreate = () => {
      setCreateModalOpen(true);
  };

  const closeModalCreate = () => {
      setCreateModalOpen(false);
  };

  const openModalCreateSection = (course) => {
    setSelectedCourse(course);
    setCreateSectionModalOpen(true);
  };

  const closeModalCreateSection = () => {
      setCreateSectionModalOpen(false);
      setSelectedCourse(null);
  };
  const openModalEditSection = (section) => {
    setSelectedSection(section);
    setIsEditSectionModalOpen(true);
  };

  const closeModalEditSection = () => {
      setIsEditSectionModalOpen(false);
      setSelectedSection(null);
  };
  const openModalEditCourse = (course) => {
    setSelectedEditCourse(course);
    setIsEditCourseModalOpen(true);
  };

  const closeModalEditCourse = () => {
    setIsEditCourseModalOpen(false);
    setSelectedEditCourse(null);
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUTPCourses(currentPage, coursesPerPage);
        if (response.data.results) {
          setCourses(response.data.results);
        } else {
          setError('No se encontraron cursos.');
        }
      } catch (err) {
        setError(err.message || 'Ocurrió un error al cargar los cursos');
      }
    };

    fetchData();
  }, [currentPage]);

  const reloadCourses = async () => {
    try {
        const response = await getUTPCourses(currentPage, coursesPerPage);
        if (response.data.results) {
            setCourses(response.data.results);
        } else {
            setError('No se encontraron cursos.');
        }
    } catch (err) {
        setError(err.message || 'Ocurrió un error al recargar los cursos');
    }
  };

  useEffect(() => {
    reloadCourses();
  }, [currentPage]);


  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const toggleCourseActivation = async (course) => {
    try {
      if (course.is_active) {
        await deactivateCourse(course.id_course);
        toast.success('Curso desactivado con éxito');
      } else {
        await activateCourse(course.id_course);
        toast.success('Curso activado con éxito');
      }
      reloadCourses();
    } catch (error) {
      toast.error('Ocurrió un error al cambiar el estado del curso');
      console.error('Error al cambiar el estado del curso:', error);
    }
  };

  const toggleSectionActivation = async (section) => {
    try {
      if (section.is_active) {
        await desactivateSection(section.section_id);
        toast.success('Sección desactivada con éxito');
      } else {
        await activateSection(section.section_id);
        toast.success('Sección activada con éxito');
      }
      reloadCourses();
    } catch (error) {
      toast.error('Ocurrió un error al cambiar el estado de la sección');
      console.error('Error al cambiar el estado de la sección:', error);
    }
  };

  const navigate = useNavigate();

  const viewSectionDetails = (sectionId) => {
      navigate(`/utp/section/details/${sectionId}`);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredCourses = courses.filter((course) =>
    course.nivel.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);

  return (
    <PageUser color='bg-white text-blue' colorInput='bg-white text-blue'>
      <SideBar color='bg-blue' userData={courses} useRol="UTP" mapeo={utp_maps}>
        <div className="flex flex-col w-full md:w-4/5 bg-fondo p-4 h-full shadow-md overflow-y-auto">
          <PageHeading colorText='text-grey text-center md:text-left' colorButton='invisible bg-admin-black' border='border-admin-green' title='Cursos UTP' button='' />
          <div className="flex justify-center my-4">
            <input
              type="text"
              placeholder="Buscar por nombre"
              value={searchTerm}
              onChange={handleSearchChange}
              className="p-2 border-2 border-blue rounded-full focus:outline-none focus:ring-2 focus:ring-blue focus:border-transparent"
              style={{ maxWidth: "300px" }}
            />
          </div>
          <div className="flex justify-end">
            <button 
                className="px-4 py-2 bg-blue text-white rounded transform transition-transform duration-300 hover:scale-105 hover:bg-blue-600"
                onClick={openModalCreate}
            >
                Crear Cursos
            </button>
          </div>
          {currentCourses.map((course) => (
            <div className="mt-4 flex items-start" key={course.id_course}>
              <div className="flex-1">
                <Disclosure>
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex justify-between items-center rounded-lg bg-blue px-4 py-4 text-left text-lg font-medium text-white drop-shadow-lg hover:cursor-pointer transition ease-in-out duration-300 w-full">
                        <span>id: {course.id_course} <span className="mr-2"></span> Curso: {course.nivel}</span>
                        <ChevronDownIcon
                          className={`${open ? 'transform rotate-180' : ''} w-5 h-5 text-blue`}
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className="mt-2 p-3 rounded-md w-full">
                      <div className="flex justify-end">
                        <button
                          className="px-4 py-2 bg-blue text-white rounded transform transition-transform duration-300 hover:scale-105 hover:bg-blue-600"
                          onClick={() => openModalCreateSection(course)}
                        >
                          Crear Secciones
                        </button>
                      </div>
                        <ul>
                          {course.sections.map((section) => (
                            <li key={section.section_id} className="mx-auto max-w-7xl mt-4 sm:grid-cols-2">
                              <div className="bg-white border-l-[10px] border-blue rounded-[20px] p-3 shadow-md sm:grid-cols-2">
                                <div className="bg-white rounded-lg shadow-lg p-4">
                                  <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-2xl font-bold text-blue">Sección: {section.name}</h2>
                                    <div className="flex items-center space-x-2">                    
                                      <button onClick={() => viewSectionDetails(section.section_id)} className="px-4 py-2 bg-admin-green hover:bg-new-dark-green text-white rounded-lg transition duration-300">Ver</button>
                                      <button
                                          className="px-4 py-2 bg-light-blue hover:bg-light-blue-600 text-white rounded-lg transition duration-300"
                                          onClick={() => openModalEditSection(section)}
                                        >
                                          Editar
                                      </button>
                                      <button 
                                        className={`px-4 py-2 text-white rounded-lg transition duration-300 ${
                                          section.is_active ? 'bg-red-500 hover:bg-red-600' : 'bg-admin-green hover:bg-new-dark-green'
                                        }`}
                                        onClick={() => toggleSectionActivation(section)}
                                      >
                                        {section.is_active ? 'Desactivar' : 'Activar'}
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              </div>
              <div className="flex items-center space-x-2 ml-2">
                  <button 
                    className="px-4 py-4 bg-blue hover:bg-blue-600 text-white rounded-lg transition duration-300"
                    onClick={() => openModalEditCourse(course)}
                    >
                    Editar Curso
                </button>
                <button 
                  className={`px-4 py-4 text-white rounded-lg transition duration-300 ${
                    course.is_active ? 'bg-red-500 hover:bg-red-600' : 'bg-admin-green hover:bg-new-dark-green'
                  }`}
                  onClick={() => toggleCourseActivation(course)}
                >
                  {course.is_active ? 'Desactivar' : 'Activar'} Curso
                </button>
              </div>
            </div>
          ))}

          <PaginationWhite2 page={currentPage} setPage={handlePageChange} totalPages={Math.ceil(courses.length / coursesPerPage)} />
        </div>
      </SideBar>
        <Portal open={isCreateModalOpen} onClose={closeModalCreate}>
        <div className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle transition-all transform duration-300 ease-in-out">
                  <div className="w-full mb-3">
                      <p className="text-blue text-xl font-bold text-center">Crear Curso</p>
                  </div>
                <CreateCourse 
                    onClose={closeModalCreate}
                    reloadCourses={reloadCourses}     
                />
            </div>
        </Portal>
        <Portal open={isCreateSectionModalOpen} onClose={closeModalCreateSection}>
            <div className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle transition-all transform duration-300 ease-in-out">
                <div className="w-full mb-3">
                    <p className="text-blue text-xl font-bold text-center">Crear Sección</p>
                </div>
                {selectedCourse && (
                    <CreateSection 
                        courseId={selectedCourse.id_course}
                        courseName={selectedCourse.nivel}
                        onClose={closeModalCreateSection}
                        reloadSections={reloadCourses}     
                    />
                )}
            </div>
        </Portal>
        <Portal open={isEditSectionModalOpen} onClose={closeModalEditSection}>
                <div className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle transition-all transform duration-300 ease-in-out">
                    <div className="w-full mb-3">
                        <p className="text-blue text-xl font-bold text-center">Editar Sección</p>
                    </div>
                    <EditSection 
                        sectionData={selectedSection}
                        onClose={closeModalEditSection}
                        reloadSections={reloadCourses} 
                    />
                </div>
        </Portal>
        <Portal open={isEditCourseModalOpen} onClose={closeModalEditCourse}>
          <div className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle transition-all transform duration-300 ease-in-out">
            <div className="w-full mb-3">
              <p className="text-blue text-xl font-bold text-center">Editar Curso</p>
            </div>
            {selectedEditCourse && (
              <EditCourse 
                courseData={selectedEditCourse}
                onClose={closeModalEditCourse}
                reloadCourses={reloadCourses}
              />
            )}
          </div>
        </Portal>
            
    </PageUser>
  );
};

export default UTPCoursesComponent;
