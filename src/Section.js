import React from 'react';
import './App.css';

import {Card} from './Card';
import {Header} from './Header';

export class Section extends React.Component {
    
    render() {
        
        const headerInfo = {};

        headerInfo.text = this.props.cards[0].status;
        headerInfo.amount = this.props.cards.length;

        const cards = this.props.cards;
        
        return (
            <div class="section flex-column">
                <Header {...headerInfo} />        
  
                {
                    cards && cards.map(card => ( <Card {...card} />))
                }
            </div>
        )
    }
}