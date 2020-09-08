import React from 'react';
import {useParams, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import CardInfo from './CardInfo';
import {findCardById} from './appFunctions';

function CardPage(props) { 
    let {id} = useParams();           
    let card = findCardById(id, props.cards);  
    
    return (        
        card ? 
            <div>
                <CardInfo id={card._id} />                   
            </div>
        : <Redirect to="/" />                           
    )    
}

const mapStateToProps = (state) => ({
    cards: state.cards.data
});

export default connect(mapStateToProps, null)(CardPage);