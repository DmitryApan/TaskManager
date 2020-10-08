import React from 'react';
import {connect} from 'react-redux';
import {Droppable, Draggable} from 'react-beautiful-dnd';

import {sortCardsByTitle, findCardsByStatus} from './appFunctions';
import Card from './Card';
import Header from './Header';
import CreatePanel from './CreatePanel';

import './App.css';

class Section extends React.Component {
    
    state = {
        sortAscending: false,
        title: '',
        description: ''
    }

    onClickNewCard = () => {
        let {onControlCreatePanel, status} = this.props;

        onControlCreatePanel(status);
    }

    onClickSort = () => {
        this.setState({
            sortAscending: !this.state.sortAscending
        });
    }

    render() {
        let {status, cards, onModalInfo, createPanel} = this.props;
        let cardsByStatus = findCardsByStatus(status, cards);
        const {sortAscending} = this.state;

        return (
            <div class="section flex-column">
                <Header 
                        text={status}
                        amount={cardsByStatus.length}
                        sortAscending={sortAscending}
                        onClickNewCard={this.onClickNewCard} 
                        onClickSort={this.onClickSort}                        
                />
                {createPanel && <CreatePanel status={status} />}
                <Droppable droppableId={status}>
                    {(provided) => (
                        <div class="section-cards" ref={provided.innerRef} >
                            {cardsByStatus && sortCardsByTitle(cardsByStatus, sortAscending).map((card, index) => (
                                <Draggable 
                                    key={card._id}
                                    draggableId={card._id} 
                                    index={index}
                                >
                                    {(provided) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                        >                                            
                                            <Card onModalInfo={onModalInfo} {...card} />
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                        </div>
                    )}    
                </Droppable>                      
            </div>
        )
    }
}

export default Section;