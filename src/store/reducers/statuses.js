import {STATUSES_REQUEST, STATUSES_RECEIVE} from '../actions/statuses';

export default function(state = null, action) {
    switch(action.type) {
        case STATUSES_REQUEST:
            return Object.assign({}, state, {
                isFetching: true
            });

        case STATUSES_RECEIVE:
            return Object.assign({}, state, {
                isFetching: false,
                data: action.statuses
            });

        default: 
            return state;
    }
}