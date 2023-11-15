import {
    GET_COURSE_SUCCESS,
    GET_COURSE_FAILURE,
    CREATE_COURSE_SUCCESS,
    CREATE_COURSE_FAILURE,
    UPDATE_COURSE_SUCCESS,
    UPDATE_COURSE_FAILURE,
    DELETE_COURSE_SUCCESS,
    DELETE_COURSE_FAILURE,
  } from '../actions/types';
  
const initialState = {
    course: null,
    courses: [],
    loading: true,
    error: {}
};
  
export default function(state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case GET_COURSE_SUCCESS:
        return {
          ...state,
          courses: payload,
          loading: false
        };
      case CREATE_COURSE_SUCCESS:
        return {
          ...state,
          courses: [...state.courses, payload],
          loading: false
        };
      case UPDATE_COURSE_SUCCESS:
        return {
          ...state,
          courses: state.courses.map(course => 
            course.id === payload.id ? { ...course, ...payload } : course
          ),
          loading: false
        };
      case DELETE_COURSE_SUCCESS:
        return {
          ...state,
          courses: state.courses.filter(course => course.id !== payload),
          loading: false
        };
      case GET_COURSE_FAILURE:
      case CREATE_COURSE_FAILURE:
      case UPDATE_COURSE_FAILURE:
      case DELETE_COURSE_FAILURE:
        return {
          ...state,
          error: payload,
          loading: false
        };
      default:
        return state;
    }
}