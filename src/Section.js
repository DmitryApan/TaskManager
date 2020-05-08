import React from 'react';
import './App.css';

import {Card} from './Card';
import {Header} from './Header';

export class Section extends React.Component {
    
    render() {
        
        const headerInfo = {};

        headerInfo.text = this.props.section[0].status;
        headerInfo.amount = this.props.section.length;

        const cards = this.props.section;
        
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