import axios from "axios";
const apiUrl = process.env.REACT_APP_BACKEND_URL;


export const listUTP = async () => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };

    
    try {
        const res = await axios.get(`${apiUrl}/api/user/list/utp/`, config);
        return res;
    } catch (error) {
        console.error('Error al obtener los usuarios:', error);
        throw error;
    }
}

export const postUTP= async (first_name, last_name, email, password) => {
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
        password
    };
    
    try {
        const res = await axios.post(`${apiUrl}/api/user/create/utp/`, data, config);
        return res;
    } catch (error) {
        console.error('Error al obtener los usuarios:', error);
        throw error;
    }
}

export const editUTP = async (id, first_name, last_name, email, password) => {
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
        password
    };
    
    try {
        const res = await axios.put(`${apiUrl}/api/user/edit/utp/${id}/`, data, config);
        return res;
    } catch (error) {
        console.error('Error al obtener los usuarios:', error);
        throw error;
    }
}

export const getUTP = async (id) => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };


    
    try {
        const res = await axios.get(`${apiUrl}/api/user/get/utp/${id}/`,  config);
        return res;
    } catch (error) {
        console.error('Error al obtener los usuarios:', error);
        throw error;
    }
}


export const uploadUTP= async (File) => {
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
        const res = await axios.post(`${apiUrl}/api/user/utp/upload/`, data, config);
        return res;
    } catch (error) {
        console.error('Error al obtener los usuarios:', error);
  
    }
  }

  export const downloadUTP= async () => {
    const headersList = {
        'Authorization': `JWT ${localStorage.getItem('access')}`,
        'Accept': '*/*',
        
    }


    const options = {
        url: `${apiUrl}/api/user/utp/download/`,
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
