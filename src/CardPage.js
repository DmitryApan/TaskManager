import React from 'react';
import {connect} from 'react-redux';
import {useParams, Redirect} from 'react-router-dom';

import {findCardById} from './appFunctions';
import CardInfo from './CardInfo';

function CardPage(props) { 
    const {cards, usersApp, statuses} = props;

    const {id} = useParams();           
    const card = findCardById(id, cards);  
    
    return (        
        card ? (
            <div>
                <CardInfo 
                    id={card._id}
                    cards={cards}
                    usersApp={usersApp}
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
    usersApp: state.usersApp.data,
    statuses: state.settings.data.statuses
});

export default connect(mapStateToProps)(CardPage);