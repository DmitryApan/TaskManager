import {USERS_APP_REQUEST, USERS_APP_RECEIVE} from '../actions/usersApp';

export default function(state = null, action) {
    switch(action.type) {
        case USERS_APP_REQUEST:
            return Object.assign({}, state, {
                isFetching: true
            });

        case USERS_APP_RECEIVE:
            return Object.assign({}, state, {
                isFetching: false,
                data: action.usersApp
            });

        default:
            return state;
    }
}