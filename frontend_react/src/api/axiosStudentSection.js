import axios from 'axios';
const apiUrl = process.env.REACT_APP_BACKEND_URL;

export const getStudentsOfSection = async (section_id) => {
    const config = {
      headers: {
        'Authorization': `JWT ${localStorage.getItem('access')}`,
        'Accept': 'application/json'
      }
    };
  
    try {
      const res = await axios.get(`${apiUrl}/api/student_section/list-of-section/${section_id}/`, config);
      return res;
    } catch (err) {
      return err;
    }
  };

export const getStudentsWithoutCourse = async () => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.get(`${apiUrl}/api/student_section/students-without-course/`, config);
        return res;
    } catch (err) {
        return err;
    }
};

export const addStudentsToCourseSections = async (course_id, studentsList) => {
  const config = {
      headers: {
          'Authorization': `JWT ${localStorage.getItem('access')}`,
          'Accept': 'application/json'
      }
  };

  const body = {
      course_id: course_id,
      students: studentsList 
  };

  try {
      const res = await axios.post(`${apiUrl}/api/student_section/asignar_estudiantes_a_secciones/`, body, config);
      return res;
  } catch (err) {
      return err;
  }
};