import axios from "axios";
const apiUrl = process.env.REACT_APP_BACKEND_URL;

export const listDirector = async () => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };

    
    try {
        const res = await axios.get(`${apiUrl}/api/user/list/director/`, config);
        return res;
    } catch (error) {
        console.error('Error al obtener los usuarios:', error);
        throw error;
    }
}

export const postDirector= async (first_name, last_name, email, password) => {
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
        const res = await axios.post(`${apiUrl}/api/user/create/director/`, data, config);
        return res;
    } catch (error) {
        console.error('Error al obtener los usuarios:', error);
        throw error;
    }
}

export const editDirector = async (id, first_name, last_name, email, password) => {
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
        const res = await axios.put(`${apiUrl}/api/user/edit/director/${id}/`, data, config);
        return res;
    } catch (error) {
        console.error('Error al obtener los usuarios:', error);
        throw error;
    }
}

export const getDirector = async (id) => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };


    
    try {
        const res = await axios.get(`${apiUrl}/api/user/get/director/${id}/`,  config);
        return res;
    } catch (error) {
        console.error('Error al obtener los usuarios:', error);
        throw error;
    }
}


export const uploadDirector= async (File) => {
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
        const res = await axios.post('${apiUrl}/api/user/director/upload/', data, config);
        return res;
    } catch (error) {
        console.error('Error al obtener los usuarios:', error);
  
    }
  }

  export const downloadDirector= async () => {
    const headersList = {
        'Authorization': `JWT ${localStorage.getItem('access')}`,
        'Accept': '*/*',
        
    }


    const options = {
        url: `${apiUrl}/api/user/director/download/`,
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

