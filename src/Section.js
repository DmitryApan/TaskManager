import React from 'react';
import './App.css';

import {Card} from './Card';
import {Header} from './Header';

export class Section extends React.Component {
    
    render() {
        const {status, cards} = this.props;

        let headerInfo = {
            text: status,
            amount: cards.length
        };        

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