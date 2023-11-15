// studentReducer.js
import {
  GET_STUDENT_SUCCESS,
  GET_STUDENT_FAILURE,
  CREATE_STUDENT_SUCCESS,
  CREATE_STUDENT_FAILURE,
  UPDATE_STUDENT_SUCCESS,
  UPDATE_STUDENT_FAILURE,
  DELETE_STUDENT_SUCCESS,
  DELETE_STUDENT_FAILURE
} from '../actions/types';

const initialState = {
  student: null,
  students: [],
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_STUDENT_SUCCESS:
    case CREATE_STUDENT_SUCCESS:
    case UPDATE_STUDENT_SUCCESS:
      return {
        ...state,
        students: payload,
        loading: false
      };
    case DELETE_STUDENT_SUCCESS:
      return {
        ...state,
        students: state.students.filter(student => student.id !== payload),
        loading: false
      };
    case GET_STUDENT_FAILURE:
    case CREATE_STUDENT_FAILURE:
    case UPDATE_STUDENT_FAILURE:
    case DELETE_STUDENT_FAILURE:
      return {
        ...state,
        error: payload,
        loading: false
      };
    default:
      return state;
  }
}
  