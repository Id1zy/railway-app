import axios from 'axios';
const apiUrl = process.env.REACT_APP_BACKEND_URL;

export const listStudent = async () => {
  const config = {
      headers: {
          'Authorization': `JWT ${localStorage.getItem('access')}`,
          'Accept': 'application/json'
      }
  };

  
  try {
      const res = await axios.get(`${apiUrl}/api/student/list/`, config);
      return res;
  } catch (error) {
      console.error('Error al obtener los usuarios:', error);
      throw error;
  }
}

export const postStudent= async (first_name, last_name, email, rut, rutGuardian) => {
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
      rutGuardian
  };
  
  try {
      const res = await axios.post(`${apiUrl}/api/student/create/`, data, config);
      return res;
  } catch (error) {
      console.error('Error al obtener los usuarios:', error);

  }
}

export const editStudent= async (id, first_name, last_name, email, rut, rutGuardian) => {
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
      rutGuardian
  };
  
  try {
      const res = await axios.put(`${apiUrl}/api/student/edit/${id}/`, data, config);
      return res;
  } catch (error) {
      console.error('Error al obtener los usuarios:', error);
  }
}

export const getStudent = async (id) => {
  const config = {
      headers: {
          'Authorization': `JWT ${localStorage.getItem('access')}`,
          'Accept': 'application/json'
      }
  };


  
  try {
      const res = await axios.get(`${apiUrl}/api/student/get/${id}/`,  config);
      return res;
  } catch (error) {
      console.error('Error al obtener los usuarios:', error);
      throw error;
  }
}


export const uploadStudent= async (File) => {
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
        const res = await axios.post(`${apiUrl}/api/student/upload/`, data, config);
        return res;
    } catch (error) {
        console.error('Error al obtener los usuarios:', error);
  
    }
  }

  export const downloadStudent= async () => {
    const headersList = {
        'Authorization': `JWT ${localStorage.getItem('access')}`,
        'Accept': '*/*',
        
    }


    const options = {
        url: `${apiUrl}/api/student/download/`,
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

export const getDashboardStudent = async () => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };
  
    
    try {
        const res = await axios.get(`${apiUrl}/api/student/dashboard/`, config);
        return res;
    } catch (error) {
        console.error('Error al obtener los usuarios:', error);
        throw error;
    }
  }