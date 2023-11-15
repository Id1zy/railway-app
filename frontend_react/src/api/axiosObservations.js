import axios from 'axios';
const apiUrl = process.env.REACT_APP_BACKEND_URL;

// GET
export const getStudentObservations = async () => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.get(`${apiUrl}/api/student_observations/student_observations/`, config);
        return res;
    } catch (err) {
        return err;
    }
};

export const getObsFilteredBySection = async (section_id) => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.get(`${apiUrl}/api/student_observations/observations-of-section/${section_id}/`, config);
        return res;
    } catch (err) {
        return err;
    }
};


export const updateStudentObservation = async (id, data) => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };

    try {
        const res = await axios.patch(`${apiUrl}/api/student_observations/actualizar-observacion/${id}/`, JSON.stringify(data), config);
        return res;
    } catch (err) {
        return err;
    }
};

export const desactivateStudentObservation = async (id) => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.delete(`${apiUrl}/api/student_observations/desactivar-observacion/${id}/`, config);
        return res;
    } catch (err) {
        return err;
    }
};

export const createStudentObservation = async (data) => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };

    try {
        const res = await axios.post(`${apiUrl}/api/student_observations/crear-observacion/`, JSON.stringify(data), config);
        return res;
    } catch (err) {
        return err;
    }
};

// GET All
export const getAllStudentObservations = async () => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.get(`${apiUrl}/api/student_observations/all-observacio/`, config);
        return res;
    } catch (err) {
        return err;
    }
};

// GET All
export const getCourseStudentObservations = async (pk) => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.get(`${apiUrl}/api/student_observations/course-obs/${pk}/`, config);
        return res;
    } catch (err) {
        return err;
    }
};