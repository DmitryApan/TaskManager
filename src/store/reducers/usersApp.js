import {USERS_APP_REQUEST, USERS_APP_RECEIVE, USERS_APP_DATA_CHANGE} from '../actions/usersApp';

export default function(state = {
    isFetching: false,
    data: []
}, action) {
    switch(action.type) {
        case USERS_APP_REQUEST:
            return {
                ...state,
                isFetching: true
            };

        case USERS_APP_RECEIVE:
            return {
                ...state,
                isFetching: false,
                data: action.usersApp
            };

        case USERS_APP_DATA_CHANGE:
            return {
                ...state,
                data: action.usersApp
            }

        default:
            return state;
    }
}