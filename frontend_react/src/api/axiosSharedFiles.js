import axios from "axios";
const apiUrl = process.env.REACT_APP_BACKEND_URL;
// GET
export const getFolders = async (id) => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data'
        }
    };
    try {
        const res = await axios.get(`${apiUrl}/api/folder/list/subject/${id}/`, config);
        return res;
        
    } catch (err) {
        return err;
    }
  };
// GET
export const postFolder = async (id, name, description) => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };
    const body = {
        name,
        description
    };
    try {
        const res = await axios.post(`${apiUrl}/api/folder/create/subject/${id}/`, body, config);
        return res;
    } catch (err) {
        return err;
    }
  };

export const postFiles= async (id, files) => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data'
        }
    };
    const body = {
        files
    };
    try {
        const res = await axios.post(`${apiUrl}/api/folder/create/file/${id}/`, body, config);
        return res;
    } catch (err) {
        return err;
    }
  };

export const getFolder= async (id) => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data'
        }
    };

    try {
        const res = await axios.post(`${apiUrl}/api/folder/get/${id}/`,  config);
        return res;
    } catch (err) {
        return err;
    }
  };

  export const getFile= async (id) => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data'
        }
    };

    try {
        const res = await axios.get(`${apiUrl}/api/folder/get/file/${id}/`,  config);
        return res;
    } catch (err) {
        return err;
    }
  };

  export const editFolder = async (id, name, description) => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };
    const body = {
        name,
        description
    };
    try {
        const res = await axios.patch(`${apiUrl}/api/folder/edit/${id}/`, body, config);
        return res;
    } catch (err) {
        return err;
    }
  };
  export const editFile = async (id, name, description) => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };
    const body = {
        name,
        description
    };

    try {
        const res = await axios.patch(`${apiUrl}/api/folder/edit/file/${id}/`, body, config);
        return res;
    } catch (err) {
        return err;
    }
  };

  export const deactivateFolder = async (id) => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };


    try {
        const res = await axios.delete(`${apiUrl}/api/folder/deactivate/${id}/`, config);
        return res;
    } catch (err) {
        return err;
    }
  };

  export const deactivateFile= async (id) => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };


    try {
        const res = await axios.delete(`${apiUrl}/api/folder/deactivate/file/${id}/`, config);
        return res;
    } catch (err) {
        return err;
    }
  };

  export const deleteFolder= async (id) => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };


    try {
        const res = await axios.delete(`${apiUrl}/api/folder/delete/${id}/`, config);
        return res;
    } catch (err) {
        return err;
    }
  };

  export const deleteFile= async (id) => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };


    try {
        const res = await axios.delete(`${apiUrl}/api/folder/delete/file/${id}/`, config);
        return res;
    } catch (err) {
        return err;
    }
  };

  export const downloadFile= async (id) => {
        const headersList = {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': '*/*',
            
        }


        const options = {
            url: `http://localhost:8000/api/folder/download/file/${id}/`,
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
