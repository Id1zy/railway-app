import {
    SET_ALERT,
    REMOVE_ALERT,
} from './types';


export const setAlert = (title, msg, alertType, timeout = 5000) => dispatch => {
    dispatch({
        type: SET_ALERT,
        payload: { title,  msg, alertType }
    });

    setTimeout(() => dispatch({ type: REMOVE_ALERT }), timeout);
}