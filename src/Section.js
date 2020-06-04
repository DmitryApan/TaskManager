import React from 'react';
import './App.css';

import {Card} from './Card';
import {Header} from './Header';

export class Section extends React.Component {
    
    render() {
        const {status, cards, onModalInfo, onDeleteCard} = this.props;

        let headerInfo = {
            text: status,
            amount: cards.length
        };        

        return (
            <div class="section flex-column">
                <Header {...headerInfo} />        
  
                {
                    cards && cards.map(card => ( 
                        <Card 
                            key={card._id}                            
                            onDeleteCard={onDeleteCard} 
                            onModalInfo={onModalInfo}
                            {...card} 
                        />
                    ))
                }
            </div>
        )
    }
}