export function findCardById(id, dataByStatuses) {
    let card = null;
            
    dataByStatuses && Object.values(dataByStatuses).find(array => (
        card = array.find(item => item._id === id)             
    ));
    
    return card || null;
}

export function changeStatusCard(id, newStatus, {statuses, dataByStatuses}) {
    let card = findCardById(id, dataByStatuses);
    let {_id, status} = card;

    let arrayChange = dataByStatuses[status].filter(item => item._id !== _id);
    let newCard = {
        ...card,
        status: newStatus
    };
    let dataByStatusesNew = {
        ...dataByStatuses,
        [status]: arrayChange,
        [newStatus]: [...dataByStatuses[newStatus], newCard]
    };
    
    return ({
        dataByStatuses: dataByStatusesNew,
        statuses
    });
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