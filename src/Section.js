import React from 'react';
import {Droppable, Draggable} from 'react-beautiful-dnd';

import './App.css';

import {Card} from './Card';
import {Header} from './Header';
import {CreatePanel} from './CreatePanel'
import {sortCardsByTitle} from './appFunctions';

export class Section extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            sortAscending: false,
            createPanel: false,
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

    onClickSort = () => {
        this.setState({
            sortAscending: !this.state.sortAscending
        })
    }

    render() {
        let {status, cards, onModalInfo, onDeleteCard} = this.props;
        const {createPanel, sortAscending} = this.state;

        return (
            <div class="section flex-column">
                <Header 
                    text={status}
                    amount={cards.length}
                    sortAscending={sortAscending}
                    onClickNewCard={this.onClickNewCard} 
                    onClickSort={this.onClickSort}
                />  
                {createPanel && (
                    <CreatePanel 
                        onCreate={this.onCreateCard}
                        onChange={this.onChangeTitleOrDescription}
                    />)}
                <Droppable droppableId={status}>
                    {(provided) => (
                        <div class="section-cards" ref={provided.innerRef} >
                            {cards && sortCardsByTitle(cards, sortAscending).map((card, index) => (
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