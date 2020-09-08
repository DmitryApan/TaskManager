import {USER_INFO_REQUEST, USER_INFO_RECEIVE, USER_INFO_DATA_CHANGE} from '../actions/userInfo';

export default function(state = null, action) {
    switch(action.type) {
        case USER_INFO_REQUEST:
            return Object.assign({}, state, {
                isFetching: true
            });

        case USER_INFO_RECEIVE:
            return Object.assign({}, state, {
                isFetching: false,
                data: action.userInfo
            });

        case USER_INFO_DATA_CHANGE: 
            return Object.assign({}, state, {
                data: action.userInfo
            });

        default: 
            return state;
    }
}