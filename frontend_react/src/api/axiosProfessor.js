import axios from 'axios';
const apiUrl = process.env.REACT_APP_BACKEND_URL;

export const listProfessor = async () => {
  const config = {
      headers: {
          'Authorization': `JWT ${localStorage.getItem('access')}`,
          'Accept': 'application/json'
      }
  };

  
  try {
      const res = await axios.get(`${apiUrl}/api/professor/list/`, config);
      return res;
  } catch (error) {
      console.error('Error al obtener los usuarios:', error);
      throw error;
  }
}

export const postProfessor= async (first_name, last_name, email, rut, phone) => {
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
      phone
  };
  
  try {
      const res = await axios.post(`${apiUrl}/api/professor/create/`, data, config);
      return res;
  } catch (error) {
      console.error('Error al obtener los usuarios:', error);
      throw error;
  }
}

export const editProfessor= async (id, first_name, last_name, email, rut, phone) => {
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
      phone
  };
  
  try {
      const res = await axios.put(`${apiUrl}/api/professor/edit/${id}/`, data, config);
      return res;
  } catch (error) {
      console.error('Error al obtener los usuarios:', error);
      throw error;
  }
}

export const getProfessor = async (id) => {
  const config = {
      headers: {
          'Authorization': `JWT ${localStorage.getItem('access')}`,
          'Accept': 'application/json'
      }
  };


  
  try {
      const res = await axios.get(`${apiUrl}/api/professor/get/${id}/`,  config);
      return res;
  } catch (error) {
      console.error('Error al obtener los usuarios:', error);
      throw error;
  }
}


export const uploadProfessor= async (File) => {
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
        const res = await axios.post(`${apiUrl}/api/professor/upload/`, data, config);
        return res;
    } catch (error) {
        console.error('Error al obtener los usuarios:', error);
  
    }
  }

  export const downloadProfessor= async () => {
    const headersList = {
        'Authorization': `JWT ${localStorage.getItem('access')}`,
        'Accept': '*/*',
        
    }


    const options = {
        url: `${apiUrl}/api/professor/download/`,
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
// Available_time's blocks
export const newAvailableTime = async (form) => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
      };

    try {
        const res = await axios.post(`${apiUrl}/api/professor/new-available-time/`, form, config);
        return res;
    } catch (error) {
        throw error;
    }
}

export const listAvailableTime = async (professorId, sectionId) => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };
  
    
    try {
        const res = await axios.get(`${apiUrl}/api/professor/list-available-time/${professorId}/${sectionId}/`, config);
        return res;
    } catch (error) {
        throw error;
    }
}

export const availableTimeDetails = async (availableTimeId, sectionId) => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };
  
    
    try {
        const res = await axios.get(`http://127.0.0.1:8000/api/professor/details-available-time/${availableTimeId}/${sectionId}/`, config);
        return res;
    } catch (error) {
        throw error;
    }
}

export const updateAvailableTime= async (id_available_time, form) => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };
    
    try {
        const res = await axios.patch(`http://127.0.0.1:8000/api/professor/update-available-time/${id_available_time}/`, form, config);
        return res;
    } catch (error) {
        throw error;
    }
}

export const deactiveOrReactiveAT = async (id_available_time) => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.delete(`http://127.0.0.1:8000/api/professor/del-or-rec-available-time/${id_available_time}/`, config);
        return res;
    } catch (error) {
        throw error;
    }
}

export const cancelMeetingRequest = async (meetReqId) => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.delete(`http://127.0.0.1:8000/api/professor/cancel-meet/${meetReqId}/`, config);
        return res;
    } catch (error) {
        throw error;
    }
}

export const acceptMeetingRequest = async (meetReqId) => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.get(`http://127.0.0.1:8000/api/professor/accept-meet/${meetReqId}/`, config);
        return res;
    } catch (error) {
        throw error;
    }
}

// GET Professors
export const getProfessors = async () => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };
    try {
        const res = await axios.get('http://127.0.0.1:8000/api/professor/api/professors/', config);
        return res;
    } catch (err) {
        return err;
    }

}


export const dashboardData = async () => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };

    try{
        const res = await axios.get(`${apiUrl}/api/professor/dashboard-info/`, config);
        return res;
    } catch (error) {
        throw error;
    }


};