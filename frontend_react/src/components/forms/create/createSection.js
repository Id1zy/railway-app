import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { createSection, SectionListProfAPI } from "../../../api/axiosSection";
import { getCourseById } from "../../../api/axiosCourses"
import { listCourse, getUtpInfo } from "../../../api/axiosCourses";
import { connect } from "react-redux";
import "../../../components/heros/portals.css";

 function Modal({ isOpen, onClose, children }){
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-inner">
          {children}
          <button onClick={onClose}className={`mr-2 px-4 py-2 bg-blue text-white rounded transform transition-transform duration-300 hover:scale-105 hover:bg-blue-600`}>
            Cancelar</button>
        </div>
      </div>
    </div>,
    document.getElementById('portal')
  );
};

const CreateSectionForm = ({ user, courseId }) => {
  const classes = {
    first: 'flex content-center items-center justify-between mx-2 my-6 border-b-4 pb-4',
    second: 'text-xl2 sm:text-xl3 font-bold leading-7 text-blue',
    third: 'w-full md:w-40 mb-2 md:mb-0 sm:mr-2 bg-UTP-des rounded-lg py-2 px-4',
    fourth: 'w-full md:w-40 mb-2 md:mb-0 sm:mr-2 bg-UTP-des text-white rounded-lg py-0.5 px-4 ',
    Btn_crecer: "mr-2 px-4 py-2 bg-blue text-white rounded transform transition-transform duration-300 hover:scale-105 hover:bg-blue-600",
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userSchool, setUserSchool] = useState(null); 
  const [sectionData, setSectionData] = useState({
    period: '',
    name: '',
    is_active: true,
    course: '',
    professor_rut: '',
    subject: '',
  });

  const [data, setData] = useState({
    academic_period: [],
    courses: [],
    subjects: [],
    professors: [],
  });

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSectionData({
      ...sectionData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { academic_period, ...sectionDataSinAcademicPeriod } = sectionData;
      const res = await createSection(sectionDataSinAcademicPeriod);
      if (res.status === 201) {
        closeModal();
        reloadPage();
      } else {
      }
    } catch (err) {
    }
  };

  const reloadPage = () => {
    window.location.reload();
  };
  const Get_User_School = async () => {
    try {
      const res = await getUtpInfo(user.id);
      if (res && res.data && res.data.utp && res.data.utp.school) {
        setUserSchool(res.data.utp.school);
        console.log("Valor de userSchool:", userSchool);
      }
    } catch (err) {
      console.log("error:", userSchool);
      return err;
    }
  };
  useEffect(() => {
    Get_User_School();
  }, [user.id]);

  useEffect(() => {
    console.log("Valor de userSchool:", user.id);
    console.log("Valor de userSchool:", userSchool);
    SectionListProfAPI()
      .then(response => {
        const filteredPeriod = response.data.academic_period;
        const filteredCourses = response.data.cursos;
        const filteredSubjects = response.data.asignaturas;
        const filteredProfessors = response.data.profesor;

        const filteredprofessorsBySchool = filteredProfessors.filter(profesor => profesor.school === userSchool);
        const filteredCoursesBySchool = filteredCourses.filter(course => course.school === userSchool);
        const filteredSubjectsBySchool = filteredSubjects.filter(subject => subject.school === userSchool);

        setData({
          academic_period: filteredPeriod,
          courses: filteredCoursesBySchool,
          subjects: filteredSubjectsBySchool,
          professors: filteredprofessorsBySchool,
        });
      })
      .catch(error => {
        console.error("Error al cargar datos:", error);
      });
  }, [user.school, userSchool]);

  return (
    <div>
      <div className="grid grid-cols-1 py-2">
        <button className={`${classes.Btn_crecer} py-2 my-2 `} onClick={openModal}>
          Crear Sección
        </button>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div className="modal-form">
            <div className="input-label">
              <label htmlFor="academic_period">Período:</label>
              <select
                className="input-select"
                name="period"
                value={sectionData.period}
                onChange={handleInputChange}
              >
                <option value="">Selecciona un período</option>
                {data.academic_period &&
                  data.academic_period.map(period => (
                    <option key={period.id} value={period.id}>
                      {period.period_name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="input-label">
              <label htmlFor="name">Nombre de la sección:</label>
              <input
                className="input-text"
                type="text"
                name="name"
                value={sectionData.name}
                onChange={handleInputChange}
                placeholder="Nombre de la sección"
              />
            </div>
            <div className="input-label">
              <label htmlFor="course">Curso de la sección:</label>
              <select
                className="input-select"
                name="course"
                value={sectionData.course}
                onChange={handleInputChange}
              >
                <option value="">Selecciona un curso</option>
                {data.courses &&
                  data.courses
                    .filter(course => course.is_active)
                    .map(course => (
                      <option key={course.id_course} value={course.id_course}>
                        {course.nivel}
                      </option>
                    ))}
              </select>
            </div>
            <div className="input-label">
              <label htmlFor="subject">Asignatura:</label>
              <select
                className="input-select"
                name="subject"
                value={sectionData.subject}
                onChange={handleInputChange}
              >
                <option value="">Selecciona una asignatura</option>
                {data.subjects &&
                  data.subjects
                    .filter(subject => subject.is_active)
                    .map(subject => (
                      <option key={subject.id_subject} value={subject.id_subject}>
                        {subject.name}
                      </option>
                    ))}
              </select>
            </div>
            <div className="input-label">
              <label htmlFor="professor_rut">RUT del Profesor:</label>
              <select
                className="input-select"
                name="professor_rut"
                value={sectionData.professor_rut}
                onChange={handleInputChange}
              >
                <option value="">Selecciona un profesor</option>
                {data.professors &&
                  data.professors.map(professor => (
                    <option key={professor.professor_rut} value={professor.professor_rut}>
                      {`${professor.first_name} ${professor.last_name}`}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          <button type="submit" className={`mr-2 px-4 py-2 bg-blue text-white rounded transform transition-transform duration-300 hover:scale-105 hover:bg-blue-600`}>
            Crear Sección</button>
        </form>
      </Modal>
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.Auth.user,
});
const ConnectedModal = connect(mapStateToProps, {})(Modal);
const ConnectedCreateSectionForm = connect(mapStateToProps, {})(CreateSectionForm);

export { ConnectedModal, ConnectedCreateSectionForm };
