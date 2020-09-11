import {CARDS_REQUEST, CARDS_RECEIVE, CARDS_DATA_CHANGE} from '../actions/cards';

export default function(state = {
    isFetching: false,
    data: []
}, action) {
    switch(action.type) {
        case CARDS_REQUEST:
            return {
                ...state,
                isFetching: true
            };

        case CARDS_RECEIVE:
            return {
                ...state,
                isFetching: false,
                data: action.cards                
            };
            
        case CARDS_DATA_CHANGE:
            return {
                ...state,
                data: action.cards
            };
        
        default: 
            return state;
    }
}