import axios from 'axios';
import {
  GET_COURSE_SUCCESS,
  GET_COURSE_FAILURE,
  CREATE_COURSE_SUCCESS,
  CREATE_COURSE_FAILURE,
  UPDATE_COURSE_SUCCESS,
  UPDATE_COURSE_FAILURE,
  DELETE_COURSE_SUCCESS,
  DELETE_COURSE_FAILURE
} from './types';

// Obtener Courses
export const getCourses = () => async dispatch => {
  try {
    const res = await axios.get('http://127.0.0.1:8000/api/courses/');
    dispatch({
      type: GET_COURSE_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_COURSE_FAILURE,
      payload: err.response.data
    });
  }
};

// Crear Course
export const createCourse = (formData) => async dispatch => {
  try {
    const res = await axios.post('http://127.0.0.1:8000/api/courses/', formData);
    dispatch({
      type: CREATE_COURSE_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: CREATE_COURSE_FAILURE,
      payload: err.response.data
    });
  }
};

// Editar Course
export const updateCourse = (id, formData) => async dispatch => {
  try {
    const res = await axios.put(`http://127.0.0.1:8000/api/courses/${id}/`, formData);
    dispatch({
      type: UPDATE_COURSE_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: UPDATE_COURSE_FAILURE,
      payload: err.response.data
    });
  }
};

// Eliminar Course
export const deleteCourse = (id) => async dispatch => {
  try {
    await axios.delete(`http://127.0.0.1:8000/api/courses/${id}/`);
    dispatch({
      type: DELETE_COURSE_SUCCESS,
      payload: id
    });
  } catch (err) {
    dispatch({
      type: DELETE_COURSE_FAILURE,
      payload: err.response.data
    });
  }
};
