import axios from 'axios';
const apiUrl = process.env.REACT_APP_BACKEND_URL;

// GET
export const getUTPSubjects = async () => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.get(`${apiUrl}/api/asignatura/utp_subjects/`, config);
        return res;
    } catch (err) {
        return err;
    }
};

// PATCH
export const updateSubjectName = async (subjectId, updatedData) => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };

    const data = updatedData;

    try {
        const res = await axios.patch(`http://127.0.0.1:8000/api/asignatura/subject/edit/${subjectId}/`, data, config);
        return res;
    } catch (err) {
        return err;
    }
};


// POST
export const createSubject = async (subjectData) => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };

    const data = subjectData;

    try {
        const res = await axios.post(`http://127.0.0.1:8000/api/asignatura/subject/create/`, data, config);
        return res;
    } catch (err) {
        return err;
    }
};


// Desactivate
export const desactivateSubject = async (subjectId) => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.delete(`http://127.0.0.1:8000/api/asignatura/subject/desactivate/${subjectId}/`, config);
        return res;
    } catch (err) {
        return err;
    }
};

// Activate
export const activateSubject = async (subjectId) => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.delete(`http://127.0.0.1:8000/api/asignatura/subject/activate/${subjectId}/`, config);
        return res;
    } catch (err) {
        return err;
    }
};