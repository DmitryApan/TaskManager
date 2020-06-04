export function findCardById(id, dataByStatuses) {
    let card = null;
            
    dataByStatuses && Object.values(dataByStatuses).find(array => (
        card = array.find(item => item._id === id)             
    ));
    
    return card || null;
}