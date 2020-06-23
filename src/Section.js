import React from 'react';
import {Droppable, Draggable } from 'react-beautiful-dnd';

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
                <Droppable droppableId={status}>
                    {(provided) => (
                        <div
                            ref={provided.innerRef}>
                            {cards && cards.map((card, index) => (
                                <Draggable 
                                    key={card._id}
                                    draggableId={card._id} 
                                    index={index}>
                                    {(provided) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}>                                            
                                            <Card 
                                                key={card._id}                            
                                                onDeleteCard={onDeleteCard} 
                                                onModalInfo={onModalInfo}
                                                {...card} 
                                            />
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