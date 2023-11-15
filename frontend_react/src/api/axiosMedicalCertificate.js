import axios from "axios";
const apiUrl = process.env.REACT_APP_BACKEND_URL;
// GET
export const listMedicalCertificate = async (student_rut) => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data'
        }
    };
    try {
        const res = await axios.get(`${apiUrl}/api/medical_certificate/list/${student_rut}/`, config);
        return res;
    } catch (err) {
        return err;
    }
  };
// GET
export const postMedicalCertificate = async (student_rut, name, description, File) => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data'
        }
    };
    const data = {
        student_rut,
        name,
        description,
        File
    };
    try {
        const res = await axios.post(`${apiUrl}/api/medical_certificate/create/`, data, config);
        return res;
    } catch (err) {
        return err;
    }
  };


  export const editMedicalCertificate = async (file_id, name, description) => {
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
        const res = await axios.patch(`${apiUrl}/api/medical_certificate/edit/${file_id}/`, body, config);
        return res;
    } catch (err) {
        return err;
    }
  };



  export const deleteFile= async (file_id) => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };


    try {
        const res = await axios.delete(`${apiUrl}/api/medical_certificate/delete/${file_id}/`, config);
        return res;
    } catch (err) {
        return err;
    }
  };

  export const downloadMedicalCertificate= async (file_id) => {
        const headersList = {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': '*/*',
            
        }


        const options = {
            url: `http://localhost:8000/api/medical_certificate/download/${file_id}/`,
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


  export const getMedicalCertificate = async (file_id) => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };
    try {
        const res = await axios.get(`${apiUrl}/api/medical_certificate/get/${file_id}/`, config);
        return res;
    } catch (err) {
        return err;
    }
  };

