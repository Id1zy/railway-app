import axios from 'axios';
const apiUrl = process.env.REACT_APP_BACKEND_URL;

// CREATE
export const createStudentGrade = async (section_id, id_weighted_average, coefficient, form) => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };
    const body = {
        section_id,
        id_weighted_average,
        coefficient,
        form
    }
    try {
        const res = await axios.post(`${apiUrl}/api/grades/create/${section_id}/`, body, config);
        return res;
    } catch (err) {
        return err;
    }

};

// GET
export const getStudentGradesForProfessor = async (grade_id) => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    }; 
    try {
        const res = await axios.get(`${apiUrl}/api/grades/list_grades/${grade_id}/`, config);
        return res;
    } catch (err) {
        return err;
    }
};

// UPDATE
export const updateStudentGrades = async (form, grade_id) => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    }; 
    try {
        const res = await axios.patch(`${apiUrl}/api/grades/update/${grade_id}/`, form, config);
        return res;
    } catch (err) {
        return err;
    }
};

export const getSingleStudentGrade = async (grade_id) => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    }; 
    try {
        const res = await axios.get(`${apiUrl}/api/grades/detail/${grade_id}/`, config);
        return res;
    } catch (err) {
        return err;
    }
};

export const deleteSingleStudentGrade = async (grade_id) => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    }; 
    try {
        const res = await axios.delete(`${apiUrl}/api/grades/delete/${grade_id}/`, config);
        return res;
    } catch (err) {
        return err;
    }
}

export const getGradesOfStudent = async (student_rut) => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    }; 
    try {
        const res = await axios.get(`${apiUrl}/api/grades/grades-of-student/${student_rut}/`, config);
        return res;
    } catch (err) {
        return err;
    }
}


//lista id  todos los cursos
export const getAllCoursesId = async () => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };
    try {
        const res = await axios.get(`${apiUrl}/api/grades/courses/`, config);
        return res;
    } catch (err) {
        return err;
    }
  };

// lista promedio general por curso
export const getCourseGrades = async (pk) => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    }; 
    try {
        const res = await axios.get(`${apiUrl}/api/grades/average_course/${pk}/`, config);
        return res;
    } catch (err) {
        return err;
    }
};

export const uploadGradesStudent= async (File, section_id) => {
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
        const res = await axios.post(`${apiUrl}/api/grades/upload/${section_id}/`, data, config);
        return res;
    } catch (error) {
        console.error('Error al obtener los usuarios:', error);
  
    }
  }

  export const downloadStudentTemplate= async (section_id) => {
    const headersList = {
        'Authorization': `JWT ${localStorage.getItem('access')}`,
        'Accept': '*/*',
        
    }


    const options = {
        url: `${apiUrl}/api/grades/download/${section_id}/`,
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