import {SETTINGS_REQUEST, SETTINGS_RECEIVE, SETTINGS_CHANGE} from '../actions/settings';

export default function(state = {
    isFetching: false,
    data: {
        statuses: []
    }
}, action) {
    switch(action.type) {
        case SETTINGS_REQUEST:
            return {
                ...state,
                isFetching: true
            };

        case SETTINGS_RECEIVE:
            return {
                ...state,
                isFetching: false,
                data: action.settings
            };

        case SETTINGS_CHANGE:
            return {
                ...state,
                data: action.settings
            }

        default: 
            return state;
    }
}