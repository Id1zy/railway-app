import axios from 'axios';
const apiUrl = process.env.REACT_APP_BACKEND_URL;

// GET Events
export const getEvents = async () => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.get(`${apiUrl}/api/event/events/`, config); 
        return res;
    } catch (err) {
        return err;
    }
};

// POST
export const createEvent = async (eventData) => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.post(`http://127.0.0.1:8000/api/event/events/create/`, eventData, config);
        return res;
    } catch (err) {
        return err;
    }
};

// UPDATE para arrastrar
export const updateEventDate = async (eventId, newStartDate) => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    };
    const startTimeData = {
        start_date_time: newStartDate
    };

    console.log("Enviando data:", startTimeData);
    try {
        const res = await axios.patch(`http://127.0.0.1:8000/api/event/events/edit-start-time/${eventId}/`, startTimeData, config);
        return res;
    } catch (err) {
        console.error("Error al actualizar la fecha del evento:", err.response.data);
        return err;
    }
};

// UPDATE event
export const updateEvent = async (eventId, eventData) => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.put(`http://127.0.0.1:8000/api/event/events/edit/${eventId}/`, eventData, config);
        return res;
    } catch (err) {
        return err;
    }
};

// Desactivate event
export const desactivateEvent = async (eventId) => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.put(`http://127.0.0.1:8000/api/event/events/desactivate/${eventId}/`, { is_active: false }, config);
        return res;
    } catch (err) {
        console.error("Error al desactivar el evento:", err.response ? err.response.data : err);
        return err;
    }
};


