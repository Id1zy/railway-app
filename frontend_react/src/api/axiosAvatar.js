import axios from "axios";
const apiUrl = process.env.REACT_APP_BACKEND_URL;

export const put_avatar = async (avatar) => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data'
        }
    };
    const data = {
        avatar
    };
    try {
        const res = await axios.put(`${apiUrl}/api/user/avatar/`, data, config);
        return res;
    } catch (error) {
        console.error('Error al Actualizar el Avatar:', error);
        throw error;
    }
}

export const get_avatar = async () => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data'
        }
    };

    try {
        const res = await axios.get(`${apiUrl}/api/user/avatar/get/`,  config);
        return res;
    } catch (error) {
        console.error('Error al obtener el avatar:', error);
        throw error;
    }
}
