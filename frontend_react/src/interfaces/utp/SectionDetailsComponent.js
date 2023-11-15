import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getSectionDetails } from "../../api/axiosSection";
import PageUser from '../../hocs/layouts/PageUser';
import SideBar from '../../components/users/sidebar';
import PageHeading from '../../components/heros/pageHeading';
import { utp_maps } from '../../helpers/users_helpers';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import { PaginationWhite2 } from '../../components/users/pagination';

export default function SectionDetails() {
  const { sectionId } = useParams();
  const navigate = useNavigate();
  const [section, setSection] = useState(null);
  const [courses, setCourses] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 8; 

  const [searchTerm, setSearchTerm] = useState('');
  

  const classes = {
    container: 'grid grid-cols-1 gap-2',
    listItem: 'bg-white border-l-[10px] border-blue rounded-[20px] p-3 shadow-md',
    listItemContent: 'grid grid-cols-2 gap-1 text-blue font-medium',
  };

  const goBack = () => {
    navigate(-1);
  };

  const fetchSectionDetails = async () => {
    try {
      const response = await getSectionDetails(sectionId);
      if (response.status === 200) {
        setSection(response.data);
      }
    } catch (err) {
      console.error("Error al obtener los detalles de la sección:", err);
    }
  };

  useEffect(() => {
    fetchSectionDetails();
  }, [sectionId]);

  if (!section) {
    return <div>Cargando detalles de la sección...</div>;
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredStudents = section.studentsection_set.filter((student) =>
  student.student_rut.rut.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);

  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);


  return (
    <PageUser color='bg-white text-blue' colorInput='bg-white text-blue'>
      <SideBar color='bg-blue' userData={courses} useRol="UTP" mapeo={utp_maps}>
        <div className="flex flex-col w-full md:w-4/5 bg-fondo p-4 h-full shadow-md overflow-y-auto">
        <PageHeading colorText='text-grey text-center md:text-left' colorButton='invisible bg-admin-black' border='border-admin-green' title='Cursos UTP' button='' />

        <button onClick={goBack} className="mb-4">
            <ArrowLeftIcon className="h-6 w-9 text-blue  hover:text-white hover:rounded-full hover:bg-new-blue"/>
        </button>
            <div className={classes.container}>
            <div className={classes.listItem}>
                <h2 className='text-xl2 text-blue font-medium mb-3 text-center md:text-left'>Información de la Sección</h2>
                <div className={classes.listItemContent}>
                <p>Nombre: {section.name}</p>
                <p>Profesor: {section.professor.full_name}</p>
                <p>Asignatura: {section.subject_name}</p>
                </div>
            </div>
            <div className={classes.listItem}>
              <div className="flex justify-between items-center mb-4">
                  <h3 className='text-xl2 text-blue font-medium text-center md:text-left'>Estudiantes</h3>
              </div>
              <div className="flex justify-center mb-4">
                  <input
                      type="text"
                      placeholder="Buscar por RUT"
                      value={searchTerm}
                      onChange={handleSearchChange}
                      className="p-2 border-2 border-blue rounded-full focus:outline-none focus:ring-2 focus:ring-blue focus:border-transparent"
                      style={{ maxWidth: "300px" }}
                  />
              </div>
        <table className="w-full table-auto">
        <thead className="bg-blue text-white">
            <tr>
                <th className="px-4 py-2 text-left">Nombre del Estudiante</th>
                <th className="px-4 py-2 text-left">RUT</th>
                <th className="px-4 py-2 text-left">Estado</th>
            </tr>
        </thead>
        <tbody>
      {currentStudents.map((student, index) => (
        <tr key={index} className={`border-b border-gray-300 ${index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"}`}>
          <td className="px-4 py-2 text-blue font-semibold text-left">{student.student_rut.full_name}</td>
          <td className="px-4 py-2 text-blue font-semibold text-left">{student.student_rut.rut}</td>
          <td className="px-4 py-2 text-blue font-semibold text-left">{student.student_rut.is_active ? "Activo" : "Inactivo"}</td>
        </tr>
      ))}
    </tbody>
    </table>
    <PaginationWhite2 page={currentPage} setPage={setCurrentPage} totalPages={totalPages} />
</div>
            </div>
            </div>
      </SideBar>
    </PageUser>
  );
}