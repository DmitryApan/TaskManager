import React from 'react';
import {useParams} from 'react-router-dom';

import {CardInfo} from './CardInfo';

import {findCardById} from './appFunctions';

export function CardPage({dataByStatuses}) { 
    let {id} = useParams();           
    let card = findCardById(id, dataByStatuses);      

    return (        
        card && 
            <div>
                <CardInfo card={card} />                   
            </div>                            
    )    
}