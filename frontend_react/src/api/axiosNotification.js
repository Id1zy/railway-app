import axios from "axios";
const apiUrl = process.env.REACT_APP_BACKEND_URL;

export const listNotification = async () => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };

    
    try {
        const res = await axios.get(`${apiUrl}/api/notification/list/`, config);
        return res;
    } catch (error) {
        console.error('Error al obtener los usuarios:', error);
        throw error;
    }
}


export const listNotificationResume = async () => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };

    
    try {
        const res = await axios.get(`${apiUrl}/api/notification/listResume/`, config);
        return res;
    } catch (error) {
        console.error('Error al obtener los usuarios:', error);
        throw error;
    }
}

export const postNotification= async (type, issue, message) => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };
    const data = {
        type,
        issue,
        message
    };
    
    try {
        const res = await axios.post(`${apiUrl}/api/notification/create/`, data, config);
        return res;
    } catch (error) {
        console.error('Error al obtener los usuarios:', error);
        throw error;
    }
}

export const postNotificationSection= async (id, type, issue, message) => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };
    const data = {
        type,
        issue,
        message
    };
    
    try {
        const res = await axios.post(`${apiUrl}/api/notification/create/section/${id}/`, data, config);
        return res;
    } catch (error) {
        console.error('Error al obtener los usuarios:', error);
        throw error;
    }
}

export const postNotificationTo= async (id, type, issue, message) => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };
    const data = {
        type,
        issue,
        message
    };
    
    try {
        const res = await axios.post(`${apiUrl}/api/notification/create/user/${id}/`, data, config);
        return res;
    } catch (error) {
        console.error('Error al obtener los usuarios:', error);
        throw error;
    }
}

export const updateNotificationsStatus = async () => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.patch(`${apiUrl}/api/notification/update-notifications/`, {}, config);
        return res;
    } catch (error) {
        console.error('Error al actualizar el estado de las notificaciones:', error);
        throw error;
    }
}
