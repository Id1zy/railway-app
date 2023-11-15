// reducers.js
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
} from '../actions/types'
  

const initialState = {
  section: null,
  sections: [],
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_SECTION_SUCCESS:
      return {
        ...state,
        sections: payload,
        loading: false
      };
    case CREATE_SECTION_SUCCESS:
      return {
        ...state,
        sections: state.sections.filter(section => section.id !== payload),
        loading: false
      };
    case UPDATE_SECTION_SUCCESS:
      return {
        ...state,
        courses: state.courses.map(course => 
          course.id === payload.id ? { ...course, ...payload } : course
        ),
        loading: false
      };
    case DELETE_SECTION_SUCCESS:
      return {
        ...state,
        courses: state.courses.filter(course => course.id !== payload),
        loading: false
      };
    case GET_SECTION_FAILURE:
    case CREATE_SECTION_FAILURE:
    case UPDATE_SECTION_FAILURE:
    case DELETE_SECTION_FAILURE:
      return {
        ...state,
        error: payload,
        loading: false
      };
    default:
      return state;
  }
}
  