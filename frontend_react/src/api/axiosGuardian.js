import axios from 'axios';
const apiUrl = process.env.REACT_APP_BACKEND_URL;

export const listGuardian = async () => {
  const config = {
      headers: {
          'Authorization': `JWT ${localStorage.getItem('access')}`,
          'Accept': 'application/json'
      }
  };

  
  try {
      const res = await axios.get(`${apiUrl}/api/guardian/list/`, config);
      return res;
  } catch (error) {
      console.error('Error al obtener los usuarios:', error);
      throw error;
  }
}

export const postGuardian= async (first_name, last_name, email, rut, phone, address) => {
  const config = {
      headers: {
          'Authorization': `JWT ${localStorage.getItem('access')}`,
          'Accept': 'application/json'
      }
  };
  const data = {
      first_name,
      last_name,
      email,
      rut,
      phone,
      address
  };
  
  try {
      const res = await axios.post(`${apiUrl}/api/guardian/create/`, data, config);
      return res;
  } catch (error) {
      console.error('Error al obtener los usuarios:', error);
      throw error;
  }
}

export const editGuardian= async (id, first_name, last_name, email, rut, phone, address) => {
  const config = {
      headers: {
          'Authorization': `JWT ${localStorage.getItem('access')}`,
          'Accept': 'application/json'
      }
  };
  const data = {
      first_name,
      last_name,
      email,
      rut,
      phone,
      address
  };
  
  try {
      const res = await axios.put(`${apiUrl}/api/guardian/edit/${id}/`, data, config);
      return res;
  } catch (error) {
      console.error('Error al obtener los usuarios:', error);
      throw error;
  }
}

export const getGuardian = async (id) => {
  const config = {
      headers: {
          'Authorization': `JWT ${localStorage.getItem('access')}`,
          'Accept': 'application/json'
      }
  };


  
  try {
      const res = await axios.get(`${apiUrl}/api/guardian/get/${id}/`,  config);
      return res;
  } catch (error) {
      console.error('Error al obtener los usuarios:', error);
      throw error;
  }
}

//Get Students for guardian

export const getStudent = async (guardian_rut) => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        },
    };

    try {
        const res = await axios.get(`${apiUrl}/api/guardian/guardian/${guardian_rut}/students/`, config);
        return res;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

   
export const getSubject = async (guardian_rut) => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        },
    };
    try {
        const res = await axios.get(`http://127.0.0.1:8000/api/guardian/get_subject/${guardian_rut}/`, config);
        return res;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};
//Get califications by rut 

export const getStudentGrades = async (rut) => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        },
    };
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/guardian/obtener-notas/${rut}/`,config);
        return response;
      } catch (error) {
        console.error('Error al obtener calificaciones del estudiante:', error.message);
      }
};
  

export const getStudentsOfGuardian = async (guardian_id) => {
        const config = {
            headers: {
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            },
        };
    
    try {
        const res = await axios.get(`http://127.0.0.1:8000/api/guardian/student-info/${guardian_id}/`, config);
        return res;
    } catch (error) {
        return error;
    }
};

export const getProfessorsOfStudent = async (student_id) => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };
    try {
        const res = await axios.get(`http://127.0.0.1:8000/api/guardian/professors-of-student/${student_id}/`, config);
        return res;
    } catch (error) {
        return error;
    }
};

export const getForMeetingRequest = async (professor_id, student_id) => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };
  
    try {
        const res = await axios.get(`http://127.0.0.1:8000/api/guardian/details-meeting-request/${professor_id}/${student_id}/`, config);
        return res;
    } catch (error) {
        return error;
    }
};

export const makeMeetingRequest= async (form) => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };
    
    try {
        const res = await axios.post('http://127.0.0.1:8000/api/guardian/create-meeting-request/', form, config);
        return res;
    } catch (error) {
        console.error('Error al obtener los usuarios:', error);
        throw error;
    }
};

export const listMeetingRequest = async (guardianId, professorId) => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        },
    };
    try {
        const res = await axios.get(`http://127.0.0.1:8000/api/guardian/list-meeting-request/${guardianId}/${professorId}/`, config);
        return res;
    } catch (error) {
        return error;
    }
};

  
  //get name by rut

export const getName = async (rut) => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        },
    };
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/guardian/get_student_name_by_rut/${rut}/`,config);
        return response;
      } catch (error) {
        console.error('Error al obtener calificaciones del estudiante:', error.message);
      }
};
  
    


export const cancelMeetGuardian = async ({meetReqId,status}) => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        },
    };
    try {
        const res = await axios.patch(`http://127.0.0.1:8000/api/guardian/cancel-meeting/${meetReqId}/`, status,config);
        return res;
    } catch (error) {
        return error;
    }

};
  
  //get absent day by rut

export const getAbsent = async (student_rut) => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        },
    };

    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/guardian/get_absent_days_for_student/${student_rut}/`,config);
      return response;
    } catch (error) {
      console.error('Error al obtener las inasistencias del estudiante:', error.message);
    }
  };

  
export const getFile = async (file_id, studentName) => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/pdf',
        },
        responseType: 'blob',  // Indica que esperas un archivo binario (blob)
    };

    try {
        const response = await axios.get(`${apiUrl}/api/guardian/download-file/${file_id}/`, {
            params: { student_name: studentName },
            ...config,
        });

        return response.data;  // Devuelve el blob del archivo PDF
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};



export const uploadGuardian= async (File) => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data'
        }
    };
    const data = {
        File
    };
    
    try {
        const res = await axios.post(`${apiUrl}/api/guardian/upload/`, data, config);
        return res;
    } catch (error) {
        console.error('Error al obtener los usuarios:', error);
  
    }
  }

  export const downloadGuardian= async () => {
    const headersList = {
        'Authorization': `JWT ${localStorage.getItem('access')}`,
        'Accept': '*/*',
        
    }


    const options = {
        url: `${apiUrl}/api/guardian/download/`,
        method: "GET",
        headers: headersList,
        responseType: 'blob'  
    }


try {
    const res = await axios.request(options)
    return res
} catch (err) {
    return err;
}
};


export const studentCertificate = async () => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };
  
    
    try {
        const res = await axios.get(`${apiUrl}/api/guardian/medical_certificate/students/`, config);
        return res;
    } catch (error) {
        console.error('Error al obtener los usuarios:', error);
        throw error;
    }
  }

  export const studentForum = async () => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };
  
    
    try {
        const res = await axios.get(`${apiUrl}/api/guardian/forum/students/`, config);
        return res;
    } catch (error) {
        console.error('Error al obtener los usuarios:', error);
        throw error;
    }
  }

  export const getStudentAttendance = async (student_id) => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/guardian/get_students_by_utp/students/`,config);
        console.log("askdjlsada",response)
        return response.data;  // Esta es la lista de estudiantes para el curso dado
    } catch (error) {
        console.error('Error al obtener los estudiantes del curso:', error);
        // Manejo de errores
    }

    
};

export const getStudentAttendances = async (student_id) => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/guardian/${student_id}/attendance/`,config);
        return response.data;
    } catch (error) {
        console.error('Error al obtener los estudiantes del curso:', error);
    }

    
};

export const getStudentsObservations = async (guardian_rut) => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        },
    };

    try {
        const res = await axios.get(`http://127.0.0.1:8000/api/guardian/student_observations/${guardian_rut}/`, config);
        return res;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export const getStudentsGrades = async (guardian_rut) => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        },
    };

    try {
        const res = await axios.get(`http://127.0.0.1:8000/api/guardian/student_grades/${guardian_rut}/`, config);
        return res;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export const getStudentsBy = async (guardian_rut) => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        },
    };

    try {
        const res = await axios.get(`http://127.0.0.1:8000/api/guardian/studentt-guardian/${guardian_rut}/`, config);
        return res;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};


export const fetchStudentsByCourse = async () => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        },
    };

    try {
        const res = await axios.get(`http://127.0.0.1:8000/api/guardian/get_students_by_utp/students/`, config);
        console.log("hola",res)
        return res;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export const fetchStudents = async (courseId) => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/guardian/students/${courseId}/`,config);
        return response.data;  
    } catch (error) {
        console.error('Error al obtener los estudiantes del curso:', error);
    }


};