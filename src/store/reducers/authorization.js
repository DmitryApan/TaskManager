import {
    AUTHORIZATION_REQUEST, 
    AUTHORIZATION_LOGIN, 
    AUTHORIZATION_LOGOUT, 
    AUTHORIZATION_ERROR
} from '../actions/authorization';

export default function (state = null, action) {
    switch(action.type) {
        case AUTHORIZATION_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                isLogin: false,
                error: ''
            });
        
        case AUTHORIZATION_LOGIN: 
            return Object.assign({}, state, {
                isFetching: false,
                isLogin: true,
            });

        case AUTHORIZATION_LOGOUT:
            return Object.assign({}, state, {
                isLogin: false,
            });

        case AUTHORIZATION_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                error: action.error
            })

        default: 
            return state;
    }
}