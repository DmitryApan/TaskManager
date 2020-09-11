import {USER_INFO_REQUEST, USER_INFO_RECEIVE, USER_INFO_DATA_CHANGE} from '../actions/userInfo';

export default function(state = {
    isFetching: false,
    data: {}
}, action) {
    switch(action.type) {
        case USER_INFO_REQUEST:
            return {
                ...state,
                isFetching: true
            };

        case USER_INFO_RECEIVE:
            return {
                ...state,
                isFetching: false,
                data: action.userInfo
            };

        case USER_INFO_DATA_CHANGE: 
            return {
                ...state,
                data: action.userInfo
            };

        default: 
            return state;
    }
}