import React, {useCallback, useMemo} from 'react';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import {TransitionGroup, CSSTransition} from 'react-transition-group';

import {filterStatusesByEnabled, findCardsByStatus, findCardsByDisabledStatuses, sortCardsByTitle} from '../../appFunctions';
import Section from '../../Section';
import Card from '../../Card';

import './styles.css';

export default function TableSections({statuses, cards, usersApp, openCreatePanel, onDragEnd, onControlCreatePanel, onModalInfo, onCreateNewCard, animation}) {
    
    const cardsByStatus = useCallback((name) => (
        findCardsByStatus(name, cards)
    ), [findCardsByStatus, cards]);

    const cardsByDisabledStatus = useMemo(() => (
        findCardsByDisabledStatuses(statuses, cards)
    ), [findCardsByDisabledStatuses, statuses, cards]);

    return(        
        <DragDropContext onDragEnd={onDragEnd}>                
            <Droppable isDropDisabled={true} droppableId={'Other'}>
                {provided => (
                    <div ref={provided.innerRef}>
                        <Section
                            amount={cardsByDisabledStatus.length}
                            status={{name: 'Other', color: 'grey'}}
                        >
                            {(sortAscending) => (
                                sortCardsByTitle(cardsByDisabledStatus, sortAscending).map((card, index) => (
                                    <Draggable key={card._id} draggableId={card._id} index={index}>
                                        {provided => (
                                            <div 
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                    <Card 
                                                        {...card}
                                                        onModalInfo={onModalInfo} 
                                                        cards={cards}
                                                        usersApp={usersApp}
                                                    />
                                            </div>                                                    
                                        )}
                                    </Draggable>  
                                ))
                            )}
                        </Section>
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>            
            {filterStatusesByEnabled(statuses).map((status, index) => (  
                <Droppable key={index} droppableId={status.name}>
                    {provided => ( 
                        <div ref={provided.innerRef}>
                            <Section 
                                amount={cardsByStatus(status.name).length}
                                status={status}
                                createPanel={openCreatePanel} 
                                onControlCreatePanel={onControlCreatePanel}  
                                abilityAddCard = {true} 
                                onCreateNewCard = {onCreateNewCard}              
                            >
                                {(sortAscending) => (
                                    <TransitionGroup enter={animation} exit={animation}>
                                        {sortCardsByTitle(cardsByStatus(status.name), sortAscending).map((card, index) => (
                                            <CSSTransition
                                                key={card._id}
                                                timeout={700}
                                                classNames="item"
                                            >
                                                <Draggable key={card._id} draggableId={card._id} index={index}>
                                                    {(provided) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                        >   
                                                            <Card 
                                                                {...card}
                                                                onModalInfo={onModalInfo} 
                                                                cards={cards} 
                                                                usersApp={usersApp}
                                                            />                       
                                                        </div>
                                                    )} 
                                                </Draggable>
                                            </CSSTransition>
                                        ))}
                                    </TransitionGroup>                                      
                                )}                     
                            </Section>
                            {provided.placeholder}
                        </div>
                    )}    
                </Droppable>                    
            ))}            
        </DragDropContext>        
    )
}