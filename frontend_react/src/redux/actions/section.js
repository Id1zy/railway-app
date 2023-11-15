// actions.js
import axios from 'axios';
import {
    GET_SECTION_SUCCESS,
    GET_SECTION_FAILURE,
    CREATE_SECTION_SUCCESS, 
    CREATE_SECTION_FAILURE, 
    UPDATE_SECTION_SUCCESS, 
    UPDATE_SECTION_FAILURE, 
    DELETE_SECTION_SUCCESS, 
    DELETE_SECTION_FAILURE 
} from './types';


// GET
export const getSection = () => async dispatch => {
    const config = {
      headers: {
          'Authorization': `JWT ${localStorage.getItem('access')}`,
          'Accept': 'application/json'
      }
  };
    try {
      const res = await axios.get('http://127.0.0.1:8000/api/seccion/secciones/', config);
      dispatch({
        type: GET_SECTION_SUCCESS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: GET_SECTION_FAILURE,
        payload: err.response.data
      });
    }
  };
  
  // CREATE
  export const createSection = (formData) => async dispatch => {
    try {
      const res = await axios.post('http://127.0.0.1:8000/api/seccion/nueva-seccion/', formData);
      dispatch({
        type: CREATE_SECTION_SUCCESS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: CREATE_SECTION_FAILURE,
        payload: err.response.data
      });
    }
  };
  
  // UPDATE
  export const updateSection = (formData) => async dispatch => {
    try {
      const res = await axios.put('/api/seccion/actualizar-seccion/', formData);
      dispatch({
        type: UPDATE_SECTION_SUCCESS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: UPDATE_SECTION_FAILURE,
        payload: err.response.data
      });
    }
  };
  
  // DELETE
  export const deleteSection = (id) => async dispatch => {
    try {
      await axios.delete(`/api/seccion/eliminar-seccion/${id}/`);
      dispatch({
        type: DELETE_SECTION_SUCCESS,
        payload: id
      });
    } catch (err) {
      dispatch({
        type: DELETE_SECTION_FAILURE,
        payload: err.response.data
      });
    }
  };