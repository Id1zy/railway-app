// actions.js
import axios from 'axios';
import {
  GET_ADMIN_PROFILE_SUCCESS,
  GET_ADMIN_PROFILE_FAILURE,
} from './types';



export const getAdminProfile = () => async dispatch => {
    try {
        const res = await axios.get('/api/admin/');
        dispatch({
            type: GET_ADMIN_PROFILE_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: GET_ADMIN_PROFILE_FAILURE,
            payload: err.response.data
        });
    }
};
