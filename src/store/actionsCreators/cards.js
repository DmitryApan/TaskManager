import {CARDS_REQUEST, CARDS_RECEIVE, CARDS_DATA_CHANGE} from '../actions/cards';
import {backendCardCreate, backendCardDelete, backendCardChange} from '../../networkFunctions';
import {findCardById} from '../../appFunctions';

function changeDataCards(cards) {
    return {
        type: CARDS_DATA_CHANGE,
        cards
    }
}

export function cardsRequest() {
    return {
        type: CARDS_REQUEST
    }
}

export function cardsReceive(cards) {
    return {
        type: CARDS_RECEIVE,
        cards: cards.reduce((acc, card) => ({
            ...acc,
            [card.status]: [...(acc[card.status] || []), card]
        }), {})
    }
}

export function addCard(card) {
    return (dispatch, getState) => {

        backendCardCreate(card).then(card => {
            const cards = getState().cards.data;
            const {status} = card;

            dispatch(changeDataCards({
                ...cards,
                [status]: [...(cards[status] || []), card]
            }));
        });
    }     
}

export function deleteCard(id) {
    return (dispatch, getState) => {
        
        backendCardDelete(id).then(({status}) => {
            let cards = getState().cards.data;

            let arrayCards = cards[status].filter(card => card._id !== id);
            let updateCards = {
                ...cards,
                [status]: arrayCards
            }
            
            if (!arrayCards.length) {
                delete updateCards[status];            
            }

            dispatch(changeDataCards(updateCards));
        });
    }    
}

function changeCardLocal(key, id, value) {
    return (dispatch, getState) => {
        const cards = getState().cards.data;        
        const card = findCardById(id, cards);
        
        const arrayCards = cards[card.status].filter(item => item._id !== card._id);
        const newCard = {...card, [key]: value}

        const newCards = {...cards, [card.status]: arrayCards}

        dispatch(changeDataCards({
            ...newCards,
            [newCard.status]: [...(newCards[newCard.status] || []), newCard] 
        }));
    }
}

function changeCard(key) {
    return (id, value) => {

        return dispatch => {
            backendCardChange(id, {[key]: value}).then(() => {
                dispatch(changeCardLocal(key, id, value));
            });
        }
    }
}

export function changeCardStatus(id, status) {
    return dispatch => {
        dispatch(changeCard('status')(id, status));
    }    
}

export function changeCardTitle(id, title) {
    return dispatch => {
        dispatch(changeCard('title')(id, title));
    }
}

export function changeCardDescription(id, description) {
    return dispatch => {
        dispatch(changeCard('description')(id, description));
    }
}

export function changeCardOwners(id, owners) {
    return dispatch => {
        dispatch(changeCard('owners')(id, owners));
    }
}

export function changeCardChildren(id, children) {
    return dispatch => {
        dispatch(changeCard('children')(id, children));
    }
}

export function deleteCardOwner(idCard, idOwner) {
    return (dispatch, getState) => {
        const {owners} = findCardById(idCard, getState().cards.data);

        dispatch(changeCardOwners(idCard, owners.filter(id => id !== idOwner)));
    }
}

export function addCardOwner(idCard, idOwner) {
    return (dispatch, getState) => {
        const {owners} = findCardById(idCard, getState().cards.data);

        dispatch(changeCardOwners(idCard, [...owners, idOwner]));
    }
}

export function changeCardStatusForDrag({draggableId, destination, source}) {
    return dispatch => {
        const {droppableId: oldStatus} = source;
        const {droppableId: newStatus} = destination;

        if (destination && (newStatus !== oldStatus)) {
            dispatch(changeCardLocal('status', draggableId, newStatus));

            backendCardChange(draggableId, {status: newStatus}).then((response) => {
                if (!response) {
                    dispatch(changeCardLocal('status', draggableId, oldStatus));
                }     
            }); 
        }
    }
}