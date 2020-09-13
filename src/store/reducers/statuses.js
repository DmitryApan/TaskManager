import {STATUSES_REQUEST, STATUSES_RECEIVE} from '../actions/statuses';

export default function(state = {
    isFetching: false,
    data: []
}, action) {
    switch(action.type) {
        case STATUSES_REQUEST:
            return {
                ...state,
                isFetching: true
            };

        case STATUSES_RECEIVE:
            return {
                ...state,
                isFetching: false,
                data: action.statuses
            };

        default: 
            return state;
    }
}