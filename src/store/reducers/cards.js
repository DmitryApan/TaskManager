import {CARDS_REQUEST, CARDS_RECEIVE, CARDS_DATA_CHANGE} from '../actions/cards';

export default function(state = null, action) {
    switch(action.type) {
        case CARDS_REQUEST:
            return Object.assign({}, state, {
                isFetching: true
            });

        case CARDS_RECEIVE:
            return Object.assign({}, state, {
                isFetching: false,
                data: action.cards                
            });
            
        case CARDS_DATA_CHANGE:
            return Object.assign({}, state, {
                data: action.cards
            });
        
        default: 
            return state;
    }
}