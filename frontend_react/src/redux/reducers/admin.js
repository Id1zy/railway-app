import {
    GET_ADMIN_PROFILE_SUCCESS,
    GET_ADMIN_PROFILE_FAILURE,
  } from '../actions/types'

const initialState = {
    adminProfile: null,
};

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_ADMIN_PROFILE_SUCCESS:
            return {
                ...state,
                adminProfile: action.payload,
            };
        case GET_ADMIN_PROFILE_FAILURE:
            return {
                ...state,
                adminProfile: null,
        
            };
        default:
            return state;
    }
}
