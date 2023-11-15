import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { connect } from "react-redux";
import PageUser from "../../hocs/layouts/PageUser";
import SideBar from "../../components/users/sidebar";
import PageHeading from "../../components/heros/pageHeading";
import Modal from "../../components/core/Modal";
import { index_maps } from "../../helpers/users_helpers";
import { Chip } from "@material-tailwind/react";
import { getStudentAttendance, getStAttendance, getCourseAttendance } from "../../api/axiosStudentAttendance";

const Attendance = ({ user }) => {
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

  const { uid } = useParams();
  const [userData, setUserData] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState({});
  const [absenceCount, setAbsenceCount] = useState(null);
  const [attendanceCount, setAttendanceCount] = useState(null);
  const [attendancePercentage, setAttendancePercentage] = useState(null);
  const [subjectName, setSubjectName] = useState("");
  const [attendanceData, setAttendanceData] = useState([]);
  const [selectedAbsenceDates, setSelectedAbsenceDates] = useState([]);

  useEffect(() => {
    async function loadStudentData() {
      try {
        if (user) {
          const user_id = user.id;
          const response = await getStudentAttendance(user_id);

          if (response && response.data) {
            const { attendance_data } = response.data;

            // Filtrar los datos basándonos en el section_id recibido como uid
            const selectedSubjectData = attendance_data.find(subject => subject.section_id === Number(uid));

            if (selectedSubjectData) {
              const { subject_name, attendance_percentage, attendance_count, absence_count } = selectedSubjectData;

              setSubjectName(subject_name);
              setAttendancePercentage(attendance_percentage);
              setAttendanceCount(attendance_count);
              setAbsenceCount(absence_count);

              console.log('Asignatura:', subject_name);
              console.log('Porcentaje de asistencia:', attendance_percentage);
              console.log('Días asistidos:', attendance_count);
              console.log('Ausencias:', absence_count);

              setAttendanceData([selectedSubjectData]); // Establecer los datos filtrados
            } else {
              console.error('No se encontró la asignatura con el section_id:', uid);
            }
          } else {
            console.error('La respuesta no contiene datos válidos:', response);
          }
        }
      } catch (error) {
        console.error('Error al cargar los datos del estudiante:', error);
      }
    }

    loadStudentData()
  }, [user, uid]);

  const openModalWithExample = (absenceDates, subject) => {
    setSelectedAbsenceDates(absenceDates);
    setSelectedSubject(subject);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const roundedPercentage = attendancePercentage !== null ? attendancePercentage.toFixed(2) : null;

  return (
    <PageUser color={'bg-white text-blue'} colorInput={'bg-white text-blue'}>
      <SideBar color={'bg-blue'} userData={userData} useRol="Estudiante" mapeo={index_maps}>
        <div className="w-full bg-fondo p-4 h-full shadow-md overflow-y-auto ">
          <PageHeading colorText={'text-blue'} colorButton={'hidden'} border={'border-blue'} title='Asistencia' />
          <div className="my-6 bg-fondo">
            <div className="flex flex-col md:flex-row justify-between space-y-4 md:space-y-0 md:space-x-4 mb-4  bg-fondo">
              <div className="flex-1 rounded-xl shadow-lg p-3 bg-white border-b-4 border-blue flex md:flex-row items-center ">
                <div className="w-[150px] h-[150px] rounded-full inline-flex items-center justify-center bg-blue ">
                  <div className="w-[100px] h-[100px] rounded-full inline-flex items-center justify-center bg-white text-blue text-xl font-bold ">
                  <p className="text-xl text-gray-600">{roundedPercentage !== null ? `${roundedPercentage}%` : 'N/A'}</p>
                  </div>
                </div>
                <div className="mt-4 md:mt-0 md:ml-4 flex-grow">
  <h3 className="text-xl2 text-blue font-bold text-left">Resumen de Asistencia</h3>
  <p className="text-lg text-blue font-semibold text-left">Porcentaje de asistencia: {roundedPercentage}%</p>
  <p className="text-lg text-blue font-semibold text-left">Asistencias: {attendanceCount !== null ? attendanceCount : ""}</p>
  <p className="text-lg text-blue font-semibold text-left">Ausencias: {absenceCount !== null ? absenceCount : ""}</p>
</div>
              </div>
              <div className="flex-1 rounded-xl shadow-lg p-3 bg-white border-b-4 border-blue">
              <div className="flex justify-between items-start mb-2">
              <div className="mt-4 md:mt-0 md:ml-4 flex-grow">
                <h3 className="text-white" >""</h3>
  <h3 className="text-xl2 text-blue font-bold text-left">Detalles de Asignatura</h3>
  {subjectName !== null ? (
    <div className="subject-name">
      <p className="text-lg text-blue font-semibold text-left">{subjectName}</p>
    </div>
  ) : (
    ""
  )}
</div>
                <div className="text-right">
                  <Chip value="Activado" className="bg-admin-green text-white text-center rounded-full text-xs py-0.5 px-1" />
                </div>
              </div>
            </div>
            </div>
            <div className="w-full">
            <div className=" space-y-4">
            {attendanceData.map((attendanceItem, index) => (
  <div key={index} className="w-full min-h-screen bg-gray-100 p-0 m-0">
    <div className="flex flex-col items-stretch mt-4 space-y-4">
      {attendanceItem.absence_dates && attendanceItem.absence_dates.length > 0 && (
        attendanceItem.absence_dates.map((date, dateIndex) => (
<div key={dateIndex} className="flex w-full justify-between bg-white shadow-md hover:shadow-lg transition-shadow duration-300 rounded-lg">
  <div className="w-full p-6">
    <div className="flex justify-between items-center">
      <div>
        <Chip value="INASISTENCIA" className="bg-admin-red text-white text-center rounded-full text-xs py-0.5 px-1 mb-2" />
        <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '10px' }}>
          <p className="text-sm text-blue font-semibold text-center">Fecha de Inasistencia:</p>
          <p className="text-sm text-blue font-semibold text-center">{date}</p>
        </div>
      </div>
      <div>
        {/* Más contenido puede ir aquí */}
        <div className="text-box">
  <p className="text-lg text-blue font-semibold text-center px-10">Este es solo un resumen de las Inasistencias. Si tiene alguna duda, póngase en contacto con el Profesor a cargo de la Asignatura.</p>
</div>
      </div>
      <button
        onClick={() =>
          openModalWithExample(
            attendanceItem.absence_dates, // Usar absence_dates en lugar de attendance_dates
            attendanceItem.subject_name
          )
        }
      >
        <div className="bg-purple-600 px-5 py-2 text-white rounded-full hover:bg-purple-700 transition ease-in-out duration-150">
          Ver Detalles</div>

      </button>
    </div>
  </div>
</div>
        ))
      )}
    </div>
  </div>
))}
  </div>
</div>
</div>
</div>
      </SideBar>
      <Modal open={isModalOpen} onClose={closeModal}>
  <div className="p-6 bg-white rounded-lg shadow-xl max-w-md mx-auto">
  <h4 className="text-xl2 text-blue font-bold text-center">Detalles de Inasistencia</h4>
  <p className="text-lg text-blue font-semibold text-center">Asignatura: {selectedSubject}</p>
  <div>
    <h5 className="text-xl2 text-blue font-bold text-center mt-2">Fechas de Inasistencia:</h5>
    <ul>
      {selectedAbsenceDates.map((date, dateIndex) => (
        <li key={dateIndex} className="text-lg text-blue font-semibold text-center">{date}</li>
      ))}
    </ul>
  </div>
</div>
</Modal>
    </PageUser>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.Auth.isAuthenticated,
  user: state.Auth.user
});

export default connect(mapStateToProps)(Attendance);