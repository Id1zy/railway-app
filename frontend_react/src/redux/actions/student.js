// actions.js
import axios from 'axios';
import {
  GET_STUDENT_SUCCESS,
  GET_STUDENT_FAILURE,
  CREATE_STUDENT_SUCCESS,
  CREATE_STUDENT_FAILURE,
  UPDATE_STUDENT_SUCCESS,
  UPDATE_STUDENT_FAILURE,
  DELETE_STUDENT_SUCCESS,
  DELETE_STUDENT_FAILURE
} from './types';


// GET
export const getStudent = () => async dispatch => {
  const config = {
    headers: {
        'Authorization': `JWT ${localStorage.getItem('access')}`,
        'Accept': 'application/json'
    }
  };
  try {
    const res = await axios.get('http://127.0.0.1:8000/api/estudiante/estudiantes/', config);
    dispatch({
      type: GET_STUDENT_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_STUDENT_FAILURE,
      payload: err.response.data
    });
  }
};

// CREATE
export const createStudent = (formData) => async dispatch => {
  try {
    const res = await axios.post('http://127.0.0.1:8000/api/estudiante/nuevo-estudiante/', formData);
    dispatch({
      type: CREATE_STUDENT_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: CREATE_STUDENT_FAILURE,
      payload: err.response.data
    });
  }
};

// UPDATE
export const updateStudent = (formData) => async dispatch => {
  try {
    const res = await axios.put('http://127.0.0.1:8000/api/estudiante/actualizar-estudiante/', formData);
    dispatch({
      type: UPDATE_STUDENT_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: UPDATE_STUDENT_FAILURE,
      payload: err.response.data
    });
  }
};

// DELETE
export const deleteStudent = (id) => async dispatch => {
  try {
    await axios.delete(`http://127.0.0.1:8000/api/estudiante/eliminar-estudiante/${id}/`);
    dispatch({
      type: DELETE_STUDENT_SUCCESS,
      payload: id
    });
  } catch (err) {
    dispatch({
      type: DELETE_STUDENT_FAILURE,
      payload: err.response.data
    });
  }
};