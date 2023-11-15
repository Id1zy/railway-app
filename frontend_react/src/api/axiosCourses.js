import axios from "axios";
const apiUrl = process.env.REACT_APP_BACKEND_URL;


export const listCourse = async () => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };

    
    try {
        const res = await axios.get(`${apiUrl}/api/course/list/`, config);
        return res;
    } catch (error) {
        console.error('Error al obtener los usuarios:', error);
        throw error;
    }
}

//Ocupada
export const postCourse= async (nivel) => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };
    const data = {
        nivel
    };
    
    try {
        const res = await axios.post(`${apiUrl}/api/course/create/`, data, config);
        return res;
    } catch (error) {
        console.error('Error al obtener los usuarios:', error);
        throw error;
    }
}

export const editCourse = async (id, nivel) => {
  const config = {
      headers: {
          'Authorization': `JWT ${localStorage.getItem('access')}`,
          'Accept': 'application/json'
      }
  };
  const data = {
      nivel,
  };
  
  try {
      const res = await axios.put(`${apiUrl}/api/course/edit/${id}/`, data, config);
      return res;
  } catch (error) {
      
      throw error;
  }
}

export const getCourse = async (id) => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };


    
    try {
        const res = await axios.get(`${apiUrl}/api/course/get/${id}/`,  config);
        return res;
    } catch (error) {
        console.error('Error al obtener los usuarios:', error);
        throw error;
    }
}

// Ocupada
export const activateCourse = async (id) => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.delete(`${apiUrl}/api/course/activate/${id}/`,  config);
        return res;
    } catch (error) {
        console.error('Error al obtener los usuarios:', error);
        throw error;
    }
}

// Ocupada
export const deactivateCourse = async (id) => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.delete(`${apiUrl}/api/course/deactivate/${id}/`,  config);
        return res;
    } catch (error) {
        console.error('Error al obtener los usuarios:', error);
        throw error;
    }
}


// DELETE Course
export const deleteCourse = async (id_course) => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.delete(`${apiUrl}/api/curso/eliminar-curso/${id_course}/`, config);
        return res;
    } catch (err) {
        console.error("Error while deleting the course:", err);
        return err;
    }
};

// UPDATE course
export const updateCourse = async (courseId, courseData) => {
  const config = {
    headers: {
      'Authorization': `JWT ${localStorage.getItem('access')}`,
      'Accept': 'application/json'
    }
  };

  try {
    const res = await axios.patch(`${apiUrl}/api/curso/actualizar-curso/${courseId}/`, courseData, config);
    return res;
  } catch (err) {
    console.error('Error al actualizar el curso:', err);
    throw err;
  }
};

// CREATE
export const createCourse = async (courseData) => {
  const config = {
    headers: {
        'Authorization': `JWT ${localStorage.getItem('access')}`,
        'Accept': 'application/json'
    }
  };

  try {
    const res = await axios.post(`${apiUrl}/api/curso/nuevo-curso-utp/`, courseData, config);
    return res;
  } catch (err) {
    console.error('Error al crear el curso:', err);
    throw err;
  }
};


export const getUtpInfo = async (id) => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };

    
    try {
        const res = await axios.get(`${apiUrl}/api/course/utp-info/${id}/`,  config);
        return res;
    } catch (error) {
        console.error('Error al obtener los usuarios:', error);
        throw error;
    }
}

export const getDirectorInfo = async (id) => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };

    
    try {
        const res = await axios.get(`${apiUrl}/api/course/curso-list-director/${id}/`,  config);
        return res;
    } catch (error) {
        console.error('Error al obtener los usuarios:', error);
        throw error;
    }
}

export const dashboardList = async () => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };

    
    try {
        const res = await axios.get(`${apiUrl}/api/course/dashboard/`, config);
        return res;
    } catch (error) {
        console.error('Error al obtener los usuarios:', error);
        throw error;
    }
}

// PATCH ocupada
export const updateCourseName = async (courseId, updatedData) => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };

    const data = updatedData;

    try {
        const res = await axios.patch(`http://127.0.0.1:8000/api/course/course/update/${courseId}/`, data, config);
        return res;
    } catch (err) {
        return err;
    }
};