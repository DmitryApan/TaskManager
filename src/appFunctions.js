export function findCardById(id, cards) {
    let card = null;
    
    cards && Object.values(cards).find(array => (
        card = array.find(item => item._id === id)             
    ));
    
    return card;
}

export function findCardsByStatus(status, cards) {
    return cards[status] || [];
}

export function findUserById(id, usersApp) {
    return usersApp.find(item => (item._id === id));
}

export function sortCardsByTitle(cards, ascending) {
    let cardsSort = cards.sort((a, b) => {
        let charA = a.title.toUpperCase();
        let charB = b.title.toUpperCase();

        if ((ascending && (charA < charB)) 
        || (!ascending && (charA > charB))) {
            return 1;
        }
        else {
            return -1;
        }
    });

    return cardsSort;
}