import React from 'react';

import './App.css';

export class CardInfo extends React.Component {
    render() {
        return (
            <div> 
                <p>{`Status: ${this.props.status}`}</p>                   
                <p>{this.props.description}</p>
            </div>
        )
    }
}