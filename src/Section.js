import React from 'react';
import {Droppable, Draggable} from 'react-beautiful-dnd';

import './App.css';

import {Card} from './Card';
import {Header} from './Header';
import {CreatePanel} from './CreatePanel'

export class Section extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            description: ''
        }
    }    

    onCreateCard = () => {
        let {onCreateCard, onControlCreatePanel} = this.props;
        const {title, description} = this.state;

        onCreateCard(title, description);

        onControlCreatePanel(null);
    }

    onChangeTitleOrDescription = ({target}) => {
        this.setState({
            [target.name]: target.value
        })
    }

    onClickNewCard = () => {
        let {onControlCreatePanel, status} = this.props;

        onControlCreatePanel(status);
    }

    render() {
        let {status, cards, onModalInfo, onDeleteCard, createPanel} = this.props;

        return (
            <div class="section flex-column">
                <Header 
                    text={status}
                    amount={cards.length}
                    onClickNewCard={this.onClickNewCard} 
                />  
                {createPanel && (
                    <CreatePanel 
                        onCreate={this.onCreateCard}
                        onChange={this.onChangeTitleOrDescription}
                    />)}
                <Droppable droppableId={status}>
                    {(provided) => (
                        <div class="section-cards" ref={provided.innerRef} >
                            {cards && cards.map((card, index) => (
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
                                            <Card 
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