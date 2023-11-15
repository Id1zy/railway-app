import axios from "axios";
const apiUrl = process.env.REACT_APP_BACKEND_URL;
// GET
export const getForum = async (id) => {

    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data'
        }
    };
    try {
        const res = await axios.get(`${apiUrl}/api/foro/list/${id}/`, config);
        return res;
    } catch (err) {
        return err;
    }
  };

export const getForumPost = async (id) => {

    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data'
        }
    };
    try {
        const res = await axios.get(`${apiUrl}/api/foro/list/post/${id}/`, config);
        return res;
    } catch (err) {
        return err;
    }
  };

  export const createForumPost = async (title, thumbnail, description, excerpt, category, section, content) => {

    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data'
        }
    };

    const data = {
        title,
        thumbnail,
        description,
        excerpt,
        category,
        section,
        content
    };

    try {
        const res = await axios.post(`${apiUrl}/api/foro/create/`, data, config);
        return res;
    } catch (err) {
        return err;
    }
  };

  export const createComment = async (id, pk, title, content) => {

    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json',
        }
    };

    const data = {
        pk,
        title,
        content
    };

    try {
        const res = await axios.post(`${apiUrl}/api/foro/${id}/create/comment`, data, config);
        return res;
    } catch (err) {
        return err;
    }
  };

  export const getComment = async (id) => {

    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data'
        }
    };
    try {
        const res = await axios.get(`${apiUrl}/api/foro/${id}/list/comment/`, config);
        return res;
    } catch (err) {
        return err;
    }
  };

  export const createSubComment = async (id, title, content) => {

    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json',
        }
    };

    const data = {
        title,
        content
    };

    try {
        const res = await axios.post(`${apiUrl}/api/foro/comment/${id}/create/subcomment/`, data, config);
        return res;
    } catch (err) {
        return err;
    }
  };

  export const deactivateForum = async (id) => {

    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };
    try {
        const res = await axios.delete(`${apiUrl}/api/foro/deactivate/${id}/`, config);
        return res;
    } catch (err) {
        return err;
    }
  };

  export const getForumOne = async (id) => {

    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data'
        }
    };
    try {
        const res = await axios.get(`${apiUrl}/api/foro/get/${id}/`, config);
        return res;
    } catch (err) {
        return err;
    }
  };

  export const editForum = async (id, title, thumbnail, description, excerpt, category, content) => {

    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data'
        }
    };
    const data = {
        title,
        thumbnail,
        description,
        excerpt,
        category,
        content
    };
    try {
        const res = await axios.put(`${apiUrl}/api/foro/edit/${id}/`,data, config);
        return res;
    } catch (err) {
        return err;
    }
  };

// GET
export const getCourseForum = async (id) => {

    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data'
        }
    };
    try {
        const res = await axios.get(`${apiUrl}/api/foro/course/${id}/`, config);
        return res;
    } catch (err) {
        return err;
    }
  };