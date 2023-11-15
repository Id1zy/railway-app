// actions.js
import axios from 'axios';
const apiUrl = process.env.REACT_APP_BACKEND_URL;


// GET FOR STUDENTS
export const getSectionForStudent = async () => {

    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };
    try {
        const res = await axios.get(`${apiUrl}/api/seccion/secciones-for-student/`, config);
        return res;
    } catch (err) {
        return err;
    }
  };
  export const getSectionForStudentAll = async () => {

    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };
    try {
        const res = await axios.get(`${apiUrl}/api/seccion/secciones-for-student-all/`, config);
        return res;
    } catch (err) {
        return err;
    }
  };
  // GET FOR PROFESSOR 
  export const getSectionForProfessor = async (professorId) => {

    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };
    try {
        const res = await axios.get(`http://127.0.0.1:8000/api/seccion/secciones-for-professor/${professorId}/`, config);
        return res;
    } catch (err) {
        return err;
    }
  };

 // GET FOR PROFESSOR 2
 export const getSectionForProfessor2 = async () => {

  const config = {
      headers: {
          'Authorization': `JWT ${localStorage.getItem('access')}`,
          'Accept': 'application/json'
      }
  };
  try {
      const res = await axios.get('http://127.0.0.1:8000/api/seccion/secciones-for-professor/', config);
      return res;
  } catch (err) {
      return err;
  }
};
  
  // DETAIL
  export const getDetailSection = async (id) => {

    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };
    try {
        const res = await axios.get(`${apiUrl}/api/seccion/detalle/${id}/`, config);
        return res;
    } catch (err) {
        return err;
    }
  };

  // CREATE Ocupada
  export const createSection = async (body) => {
    const config = {
      headers: {
          'Authorization': `JWT ${localStorage.getItem('access')}`,
          'Accept': 'application/json'
      }
  };

    try {
      const res = await axios.post('http://127.0.0.1:8000/api/seccion/nueva-seccion/', body, config);
      return res;
    } catch (err) {
      console.log("error en la obtención de la promesa")
      return err;
    }
  };
  
  // UPDATE
  export const updateSection = async (sectionId, formData) => {
    const config = {
      headers: {
          'Authorization': `JWT ${localStorage.getItem('access')}`,
          'Accept': 'application/json'
      }
  };
    try {
      const res = await axios.patch(`http://127.0.0.1:8000/api/seccion/actualizar-seccion/${sectionId}/`, formData, config);
      console.log("actualizando...")
      return res;
    } catch (err) {
      console.log("ha ocurrido un error")
      return err;
    }
  };

  // UPDATE ocupada
  export const updateSection2 = async (sectionId, updateformData) => {
    const config = {
      headers: {
          'Authorization': `JWT ${localStorage.getItem('access')}`,
          'Accept': 'application/json'
      }
  };
  const formData ={
    name: updateformData.name,
    is_active: updateformData.is_active,
    course: updateformData.course,
    subject: updateformData.subject,
    professor_rut: updateformData.professor_rut,
  };
    try {
      const res = await axios.patch(`http://127.0.0.1:8000/api/seccion/actualizar-seccion/${sectionId}/`, formData, config);
      return res;
    } catch (err) {
      console.log("ha ocurrido un error")
      return err;
    }
  };
  
  // DELETE ocupada
  export const desactivateSection = async (id) => {
      const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };
    try {
      const res = await axios.delete(`${apiUrl}/api/seccion/deactivate/${id}/`,config);
      return res;
    } catch (err) {
      return err;
    }
  };

  // ocupada
  export const activateSection = async (id) => {
    const config = {
      headers: {
          'Authorization': `JWT ${localStorage.getItem('access')}`,
          'Accept': 'application/json'
      }
  };
  try {
    const res = await axios.delete(`${apiUrl}/api/seccion/activate/${id}/`,config);
    return res;
  } catch (err) {
    return err;
  }
};
  // GET + PROFESOR
  export const SectionListProfAPI = async () => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };
    try {
        const res = await axios.get(`${apiUrl}/api/seccion/seccioness/`, config);
        return res;
    } catch (err) {
        return err;
    }
};

// Listado de secciones
export const getSectionUTP = async () => {
  const config = {
      headers: {
          'Authorization': `JWT ${localStorage.getItem('access')}`,
          'Accept': 'application/json'
      }
  };

  try {
      console.log("Fetching courses...");
      const res = await axios.get(`${apiUrl}/api/seccion/seccionesUTP/`, config);
      return res;
  } catch (err) {
      console.error("Error while fetching courses:", err);
      return err;
  }
};

/// obtener alumnos por pk seccion (Funciona)
export const getSectionAlumUTP = async (sectionId) => {
  const config = {
      headers: {
          'Authorization': `JWT ${localStorage.getItem('access')}`,
          'Accept': 'application/json'
      }
  };

  try {
      console.log("Fetching courses...");
      const res = await axios.get(`${apiUrl}/api/seccion/secciones-alumUTP/${sectionId}/`, config);
      return res;
  } catch (err) {
      console.error("Error while fetching courses:", err);
      return err;
  }
};

/// obtener alumnos por pk seccion (Funciona)
export const getSectionInfUTP = async (sectionId) => {
  const config = {
      headers: {
          'Authorization': `JWT ${localStorage.getItem('access')}`,
          'Accept': 'application/json'
      }
  };

  try {
      console.log("Fetching courses...");
      const res = await axios.get(`${apiUrl}/api/seccion/secciones-infUTP/${sectionId}/`, config);
      return res;
  } catch (err) {
      console.error("Error while fetching courses:", err);
      return err;
  }
};


export const getScheduleofSection = async (sectionId, schedule_id) => {
  const config = {
      headers: {
          'Authorization': `JWT ${localStorage.getItem('access')}`,
          'Accept': 'application/json'
      }
  };

  try {
      const res = await axios.get(`http://127.0.0.1:8000/api/seccion/specific-schedule/${sectionId}/${schedule_id}/`, config);
      return res;
  } catch (err) {
      return err;
  }
};

// GET
export const getAcademicPeriods = async () => {
  const config = {
      headers: {
          'Authorization': `JWT ${localStorage.getItem('access')}`,
          'Accept': 'application/json'
      }
  };

  try {
      const res = await axios.get('http://127.0.0.1:8000/api/seccion/academic-periods/', config);
      return res;
  } catch (err) {
      return err;
  }
};


export const getSectionDetails = async (sectionId) => {
  const config = {
      headers: {
          'Authorization': `JWT ${localStorage.getItem('access')}`,
          'Accept': 'application/json'
      }
  };

  try {
      const res = await axios.get(`http://127.0.0.1:8000/api/seccion/sections/${sectionId}/`, config);
      return res;
  } catch (err) {
      return err;
  }
};

// GET
export const getUTPCourses = async () => {
  const config = {
      headers: {
          'Authorization': `JWT ${localStorage.getItem('access')}`,
          'Accept': 'application/json'
      }
  };

  try {
      const res = await axios.get('http://127.0.0.1:8000/api/seccion/utp/courses/', config);
      return res;
  } catch (err) {
      return err;
  }
};
