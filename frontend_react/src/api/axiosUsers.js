import axios from 'axios';
const apiUrl = process.env.REACT_APP_BACKEND_URL;

export const get_users = async () => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.get(`${apiUrl}/auth/users/`, config);
        return res;
    } catch (error) {
        console.error('Error al obtener los usuarios:', error);
        throw error;
    }
}

export const post_users = async (first_name, last_name, email, password) => {
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
        const res = await axios.post(`${apiUrl}/api/user/users/`, data, config);
        console.log('Respuesta de la creación del usuario:', res);
        return res;
    } catch (error) {
        console.error('Error al crear el usuario:', error);
        throw error;
    }
    
}

export const update_user = async (userId, first_name, last_name, email) => {
    console.log('userId recibido en update_user:', userId);
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
    };

    try {
        const res = await axios.patch(`${apiUrl}/api/user/users/${userId}/`, data, config);
        console.log('Respuesta de la actualización del usuario:', res);
        return res;
    } catch (error) {
        console.error('Error al actualizar el usuario:', error);
        throw error;
    }
}

export const desactivateUser = async (studentId) => {
    const config = {
      headers: {
        'Authorization': `JWT ${localStorage.getItem('access')}`,
        'Accept': 'application/json'
      }
    };
  
    try {
      console.log('userId a pasar:', studentId);
      const res = await axios.delete(`${apiUrl}/api/user/users/${studentId}/`, config);
      return res;
    } catch (err) {
      console.error('Error al desactivar el estudiante:', err);
      throw err;
    }
  };




  export const activateUser = async (id) => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };

    
    try {
        const res = await axios.delete(`${apiUrl}/api/user/activate/${id}/`,  config);
        return res;
    } catch (error) {
        console.error('Error al obtener los usuarios:', error);
        throw error;
    }
}

export const deactivateUser = async (id) => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };

    
    try {
        const res = await axios.delete(`${apiUrl}/api/user/deactivate/${id}/`,  config);
        return res;
    } catch (error) {
        console.error('Error al obtener los usuarios:', error);
        throw error;
    }
}

export const directorDash = async () => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.get(`${apiUrl}/api/user/director/dashboard/`, config);
        return res;
    } catch (error) {
        console.error('Error al obtener los usuarios:', error);
        throw error;
    }
}