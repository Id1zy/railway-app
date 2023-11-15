import axios from "axios";
const apiUrl = process.env.REACT_APP_BACKEND_URL;

// GET
export const listAssignment= async (section_id) => {

    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data'
        }
    };
    try {
        const res = await axios.get(`${apiUrl}/api/assignment/list/${section_id}/`, config);
        return res;
    } catch (err) {
        return err;
    }
  };

export const getAssignment = async (assignment_id) => {

    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data'
        }
    };
    try {
        const res = await axios.get(`${apiUrl}/api/assignment/get/${assignment_id}/`, config);
        return res;
    } catch (err) {
        return err;
    }
  };

  export const createAssignment = async (section, title, description, deadline) => {

    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data'
        }
    };

    const data = {
        section,
        title,
        description,
        deadline
    };

    try {
        const res = await axios.post(`${apiUrl}/api/assignment/create/`, data, config);
        return res;
    } catch (err) {
        return err;
    }
  };



  export const statusAssignment = async (assignment_id, status) => {

    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };
    const data = {
        status
    }
    try {
        const res = await axios.post(`${apiUrl}/api/assignment/status/${assignment_id}/`,data, config);
        return res;
    } catch (err) {
        return err;
    }
  };


  export const editAssingment = async (assignment_id, title, description, deadline) => {

    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data'
        }
    };
    const data = {
        title,
        title,
        description,
        deadline
    };
    try {
        const res = await axios.put(`${apiUrl}/api/assignment/edit/${assignment_id}/`,data, config);
        return res;
    } catch (err) {
        return err;
    }
  };