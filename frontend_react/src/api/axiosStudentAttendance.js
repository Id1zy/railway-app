import axios from 'axios';
const apiUrl = process.env.REACT_APP_BACKEND_URL;


export const registerStAttendance = async (section_id, schedule_id, list) => {
    const config = {
      headers: {
          'Authorization': `JWT ${localStorage.getItem('access')}`,
          'Accept': 'application/json'
      }
    };
    const body = {
      section_id,
      schedule_id,
      list
    }
  
    try {
      const res = await axios.post(`${apiUrl}/api/student_attendance/create/`, body, config);
      return res;
    } catch (err) {
      return err;
    }
  };

  export const getStAttendance = async (section_id, schedule_id) => {
    const config = {
      headers: {
          'Authorization': `JWT ${localStorage.getItem('access')}`,
          'Accept': 'application/json'
      }
    };
  
    try {
        // attendances-of-section/<int:section_id>
      const res = await axios.get(`${apiUrl}/api/student_attendance/attendances-of-section/${section_id}/${schedule_id}/`, config);
      return res;
    } catch (err) {
      return err;
    }
  };

  export const editStAttendance = async (attendance_id, form) => {
    const config = {
      headers: {
          'Authorization': `JWT ${localStorage.getItem('access')}`,
          'Accept': 'application/json'
      }
    };
  
    try {
        // attendances-of-section/<int:section_id>
      const res = await axios.patch(`${apiUrl}/api/student_attendance/edit-attendance/${attendance_id}/`, form, config);
      return res;
    } catch (err) {
      return err;
    }
  };


  export const deleteStAttendance = async (attendance_id) => {
    const config = {
      headers: {
          'Authorization': `JWT ${localStorage.getItem('access')}`,
          'Accept': 'application/json'
      }
    };
  
    try {
        // attendances-of-section/<int:section_id>
      const res = await axios.delete(`${apiUrl}/api/student_attendance/delete-attendance/${attendance_id}/`, config);
      return res;
    } catch (err) {
      return err;
    }
  };

  export const getCourseAttendance = async (id_course) => {
    const config = {
      headers: {
          'Authorization': `JWT ${localStorage.getItem('access')}`,
          'Accept': 'application/json'
      }
    };
  
    try {
      const res = await axios.get(`${apiUrl}/api/student_attendance/course/${id_course}/`, config);
      return res;
    } catch (err) {
      return err;
    }
  };


//NUEVOO

export const getStudentAttendance = async (user_id) => {
  const config = {
    headers: {
        'Authorization': `JWT ${localStorage.getItem('access')}`,
        'Accept': 'application/json'
    }
  };
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/student_attendance/student_subject_absences/${user_id}/`,config);
    console.log("asdas",response)
    return response;
  } catch (error) {

    console.error('Hubo un error al obtener la asistencia del estudiante:', error.response);
  }
};

export const getStudentAttendanceBySection = async (user_id) => {
  const config = {
    headers: {
        'Authorization': `JWT ${localStorage.getItem('access')}`,
        'Accept': 'application/json'
    }
  };
  try {
    const response = await axios.get(`${apiUrl}/api/student_attendance/student_subject/${user_id}/`,config);
    console.log("asdas",response)
    return response;
  } catch (error) {

    console.error('Hubo un error al obtener la asistencia del estudiante:', error.response);
  }
};

export const getAttendanceOfDate = async (form) => {
  const config = {
    headers: {
        'Authorization': `JWT ${localStorage.getItem('access')}`,
        'Accept': 'application/json'
    }
  };
  

  try {
    const res = await axios.post('http://127.0.0.1:8000/api/student_attendance/attendance-of-date/', form, config);
    return res;
  } catch (err) {
    return err;
  }
};


  export const getStAttendanceEdit = async (section_id, schedule_id, date) => {
    const config = {
      headers: {
        'Authorization': `JWT ${localStorage.getItem('access')}`,
        'Accept': 'application/json'
      }
    };
  
    const body = {
      section_id,
      date
    }
    try {
      // Use query parameters for the data
      const res = await axios.post(`http://127.0.0.1:8000/api/student_attendance/get/${schedule_id}/`, body, config);
      return res;
    } catch (err) {
      return err;
    }
  };
  

  export const Edit_date = async (section_id, schedule_id, date, list) => {
    const config = {
      headers: {
          'Authorization': `JWT ${localStorage.getItem('access')}`,
          'Accept': 'application/json'
      }
    };
    const body = {
      section_id,
      schedule_id,
      date,
      list
    }
  
    try {
      const res = await axios.put('http://127.0.0.1:8000/api/student_attendance/edit/', body, config);
      return res;
    } catch (err) {
      return err;
    }
  };
