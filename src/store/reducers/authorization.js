import {
    AUTHORIZATION_REQUEST, 
    AUTHORIZATION_LOGIN, 
    AUTHORIZATION_LOGOUT, 
    AUTHORIZATION_ERROR
} from '../actions/authorization';

const defaultState = {
    isFetching: false,
    isLogin: false,
    error: ''
};

export default function (state = defaultState, action) {
    switch(action.type) {
        case AUTHORIZATION_REQUEST:
            return {
                ...state, 
                isFetching: true,
                isLogin: false,
                error: ''
            };
        
        case AUTHORIZATION_LOGIN: 
            return {
                ...state,
                isFetching: false,
                isLogin: true
            };

        case AUTHORIZATION_LOGOUT:
            return {
                ...state,
                isLogin: false
            };

        case AUTHORIZATION_ERROR:
            return {
                ...state,
                isFetching: false,
                error: action.error
            };

        default: 
            return state;
    }
}