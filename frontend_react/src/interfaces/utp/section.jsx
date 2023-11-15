import { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import PageUser from "../../hocs/layouts/PageUser";
import SideBar from "../../components/users/sidebar";
import { utp_maps } from "../../helpers/users_helpers";
import PageHeading from "../../components/heros/pageHeading";
import { getStudentsWithoutCourse } from '../../api/axiosStudentSection';
import AddStudentsToCourseModal from "../../components/forms/createStudentSection";
import Portal from "../../components/core/Portal";
import { Card } from "@material-tailwind/react";
import { PaginationWhite } from "../../components/users/pagination";
import { addStudentsToCourseSections } from "../../api/axiosStudentSection";
import * as XLSX from 'xlsx';
import { toast } from "react-hot-toast";

const SectionUTP = ({ user }) => {
  const [userData, setUserData] = useState('');
  const [students, setStudents] = useState([]);
  const [isAddStudentsModalOpen, setAddStudentsModalOpen] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 8;
  
  const fileInputRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState('');

  const refreshStudentsList = async () => {
    const response = await getStudentsWithoutCourse();
    if (response && response.data && response.data.results) {
      setStudents(response.data.results);
    } else {
      console.warn("API did not return the expected format.");
    }
  };

  useEffect(() => {
    if (user) {
      setUserData(user);
    }

    const fetchStudents = async () => {
      const response = await getStudentsWithoutCourse();
      if (response && response.data && response.data.results) {
        setStudents(response.data.results);
      } else {
        console.warn("API did not return the expected format.");
      }
    }

    refreshStudentsList();
  }, [user]);

  

  const handleCheckboxChange = (rut, isChecked) => {
    if (isChecked) {
      setSelectedStudents((prevStudents) => [...prevStudents, rut]);
    } else {
      setSelectedStudents((prevStudents) => prevStudents.filter((item) => item !== rut));
    }
  };

  const openModalAddStudents = () => {
    setAddStudentsModalOpen(true);
  };

  const closeModalAddStudents = () => {
      setAddStudentsModalOpen(false);
  };

  const handleUploadButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const filteredStudents = students.filter((student) =>
  student.rut.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(worksheet);
      bulkAddStudents(json); 
    };
    reader.readAsArrayBuffer(file);
  };
  
  const bulkAddStudents = async (data) => {
    try {
      for (const row of data) {
        const { course_id, ruts } = row;
        const studentsRuts = ruts.split(','); 
        const response = await addStudentsToCourseSections(course_id, studentsRuts);
        console.log(response.data); 
      }
      toast.success('Carga masiva completada con éxito');
      refreshStudentsList();
    } catch (error) {
      toast.error('Hubo un error durante la carga masiva');
    }
  };
  

  const maxPages = Math.ceil(students.length / studentsPerPage);

  return (
    <PageUser color='bg-white text-blue' colorInput='bg-white text-blue'>
      <SideBar color='bg-blue' userData={userData} useRol="UTP" mapeo={utp_maps}>
        <div className="w-full md:w-4/5 bg-fondo p-4 h-full shadow-md overflow-y-auto">
          <div className="mx-auto max-w-7xl mt-4 sm:grid-cols-2 h-22">
            <PageHeading colorText='text-grey text-center md:text-left pl-[70px] md:pl-0' colorButton='invisible bg-admin-black' border='border-admin-green my-0' title='Añadir Estudiantes a Curso' button='Activo' />
            {/*carga masiva */}
            
            
            <div className="my-6">
              <Card className="bg-white p-5 space-y-2">
                <div className="border-b border-admin-green">
                  <p className="font-bold text-blue text-xl text-center">Carga Masiva</p>
                </div>
                <div className="flex justify-center items-center">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  style={{ display: 'none' }}
                  accept=".xlsx, .xls"
                />
                <button
                  onClick={handleUploadButtonClick}
                  className='w-full font-bold md:flex-1 md:w-40 mb-2 md:mb-0 sm:mr-2 bg-admin-green hover:bg-new-dark-green text-white rounded-lg py-2 px-4'>
                  Cargar Datos
                </button>
                </div>
              </Card>
            </div>
            <div className="mx-auto max-w-7xl mt-4 sm:grid-cols-2">
              <div className="bg-white border-l-[10px] border-blue rounded-[20px] p-3 shadow-md sm:grid-cols-2">
                <div className="bg-white rounded-lg shadow-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-2xl font-bold text-blue">Estudiantes sin curso</h2>
                      <div>
                        <input
                          type="text"
                          placeholder="Buscar por RUT"
                          value={searchTerm}
                          onChange={handleSearchChange}
                          className="p-2 border-2 border-blue rounded-full focus:outline-none focus:ring-2 focus:ring-blue focus:border-transparent"
                          style={{ maxWidth: "300px" }}
                        />
                      </div>
                      <button className="px-3 py-1 bg-blue text-white rounded" onClick={openModalAddStudents}>Añadir a curso</button>
                    </div>
                  <table className="w-full table-auto">
                    <thead>
                      <tr className="bg-blue text-white">
                        <th className="px-4 py-2">Nombre del Estudiante</th>
                        <th className="px-4 py-2">RUT</th>
                        <th className="px-4 py-2">Seleccionar</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentStudents.map((student) => (
                        <tr key={student.rut} className={currentStudents.indexOf(student) % 2 === 0 ? "bg-gray-100 border-b border-gray-300" : "bg-gray-200 border-b border-gray-300"}>
                          <td className="px-4 py-2 text-blue font-semibold">{student.user.first_name} {student.user.last_name}</td>
                          <td className="px-4 py-2 text-blue text-center font-semibold">{student.rut}</td>
                          <td className="px-4 py-2 text-center">
                            <input 
                              type="checkbox"
                              checked={selectedStudents.includes(student.rut)} 
                              onChange={(e) => handleCheckboxChange(student.rut, e.target.checked)} 
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <PaginationWhite page={currentPage} setPage={setCurrentPage} max={maxPages} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </SideBar>
      <Portal open={isAddStudentsModalOpen} onClose={closeModalAddStudents}>
        <div className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle transition-all transform duration-300 ease-in-out">
          <div className="w-full mb-3">
            <p className="text-blue text-xl font-bold text-center">Añadir Estudiantes a Curso</p>
          </div>
          <AddStudentsToCourseModal 
            onClose={closeModalAddStudents}
            selectedStudents={selectedStudents} 
            onCompletion={refreshStudentsList} 
          />
        </div>
    </Portal>
    </PageUser>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.Auth.isAuthenticated,
  user: state.Auth.user
});

export default connect(mapStateToProps)(SectionUTP);
