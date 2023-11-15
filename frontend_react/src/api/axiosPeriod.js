import axios from 'axios';
const apiUrl = process.env.REACT_APP_BACKEND_URL;

export const getAcademicPeriods = async () => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.get(`${apiUrl}/api/seccion/academic-periods/`, config);
        return res;
    } catch (err) {
        return err;
    }
};

export const createAcademicPeriod = async (data) => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };

    try {
        const res = await axios.post(`${apiUrl}/api/seccion/academic-periods/create/`, JSON.stringify(data), config);
        return res;
    } catch (err) {
        return err;
    }
};

export const updateAcademicPeriod = async (id, data) => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    };

    try {
        const res = await axios.patch(`${apiUrl}/api/seccion/academic-periods/update/${id}/`, JSON.stringify(data), config);
        return res;
    } catch (err) {
        return err;
    }
};

export const activateAcademicPeriod = async (id) => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.delete(`${apiUrl}/api/seccion/academic-periods/activate/${id}/`, config);
        return res;
    } catch (err) {
        return err;
    }
};

export const deleteAcademicPeriod = async (id) => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.delete(`${apiUrl}/api/seccion/academic-periods/delete/${id}/`, config);
        return res;
    } catch (err) {
        return err;
    }
};

