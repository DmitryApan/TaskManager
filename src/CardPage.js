import React from 'react';
import {useParams, Redirect} from 'react-router-dom';

import {CardInfo} from './CardInfo';

import {findCardById} from './appFunctions';

export function CardPage({dataByStatuses}) { 
    let {id} = useParams();           
    let card = findCardById(id, dataByStatuses);      

    console.log(card);

    return (        
        card 
        ? <div>
            <CardInfo card={card} />                   
        </div>
        : <Redirect to="/" />                           
    )    
}