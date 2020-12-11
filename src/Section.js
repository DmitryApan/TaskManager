import React from 'react';

import Header from './Header';
import CreatePanel from './CreatePanel';

import './App.css';

class Section extends React.Component {
    
    state = {
        sortAscending: false
    }

    onClickNewCard = () => {
        let {onControlCreatePanel, status} = this.props;

        onControlCreatePanel(status.name);
    }

    onClickSort = () => {
        this.setState({
            sortAscending: !this.state.sortAscending
        });
    }

    render() {
        const {children, status, amount, createPanel, abilityAddCard, onCreateNewCard} = this.props;
        const {sortAscending} = this.state;
        
        return (
            <div class="section flex-column">
                <Header 
                    text={status.name}
                    color={status.color}
                    amount={amount}
                    sortAscending={sortAscending}
                    abilityAddCard = {abilityAddCard}
                    onClickNewCard={this.onClickNewCard} 
                    onClickSort={this.onClickSort}                        
                />
                {createPanel === status.name && (
                    <CreatePanel 
                        onCreateNewCard={onCreateNewCard} 
                        status={status.name} 
                    />
                )}
                <div class="section-cards">
                    {children(sortAscending)}
                </div>                                      
            </div>
        )
    }
}

export default Section;