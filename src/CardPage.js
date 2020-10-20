import React from 'react';
import {connect} from 'react-redux';
import {useParams, Redirect} from 'react-router-dom';

import {findCardById} from './appFunctions';
import CardInfo from './CardInfo';

function CardPage(props) { 
    const {cards, statuses} = props;

    const {id} = useParams();           
    const card = findCardById(id, cards);  
    
    return (        
        card ? (
            <div>
                <CardInfo 
                    id={card._id}
                    cards={cards}
                    statuses={statuses}
                />                   
            </div>
        ) : (
             <Redirect to="/" />
        )                           
    )    
}

const mapStateToProps = (state) => ({
    cards: state.cards.data,
    statuses: state.statuses.data
});

export default connect(mapStateToProps)(CardPage);