import axios from "axios";
const apiUrl = process.env.REACT_APP_BACKEND_URL;

export const postSchool = async (data) => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };
    const body = {
        data
    };
    try {
        const res = await axios.post(`${apiUrl}/api/school/create/`, body, config);
        return res;
    } catch (err) {
        return err;
    }
  };

  export const getSchool = async () => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };
    try {
        const res = await axios.get(`${apiUrl}/api/school/list/`, config);
        return res;
    } catch (err) {
        return err;
    }
  };

  export const getOneSchool = async (id) => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };
    try {
        const res = await axios.get(`${apiUrl}/api/school/get/${id}/`, config);
        return res;
    } catch (err) {
        return err;
    }
  };


  export const editSchool = async (id, data) => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };
    const body = {
        data
    };
    try {
        const res = await axios.put(`${apiUrl}/api/school/edit/${id}/`, body, config);
        return res;
    } catch (err) {
        return err;
    }
  };

  export const activateSchool = async (id) => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.delete(`${apiUrl}/api/school/activate/${id}/`, config);
        return res;
    } catch (err) {
        return err;
    }
  };

  export const deactivateSchool = async (id) => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.delete(`${apiUrl}/api/school/deactivate/${id}/`, config);
        return res;
    } catch (err) {
        return err;
    }
  };


  export const getColor = async () => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };
    try {
        const res = await axios.get(`${apiUrl}/api/school/color/`, config);
        return res;
    } catch (err) {
        return err;
    }
  };
