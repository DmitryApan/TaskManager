import React, {Fragment, useCallback, useMemo} from 'react';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';

import {filterStatusesByEnabled, findCardsByStatus, findCardsByDisabledStatuses, sortCardsByTitle} from '../../appFunctions';
import Section from '../../Section';
import Card from '../../Card';

export default function TableSections({statuses, cards, openCreatePanel, onDragEnd, onControlCreatePanel, onModalInfo}) {
    
    const cardsByStatus = useCallback((name) => (
        findCardsByStatus(name, cards)
    ), [findCardsByStatus, cards]);

    const cardsByDisabledStatus = useMemo(() => (
        findCardsByDisabledStatuses(statuses, cards)
    ), [findCardsByDisabledStatuses, statuses, cards]);

    return(
        <Fragment>
            <DragDropContext onDragEnd={onDragEnd}>                            
                {filterStatusesByEnabled(statuses).map((status, index) => (  
                    <Droppable key={index} droppableId={status.name}>
                        {(provided) => ( 
                            <div ref={provided.innerRef}>
                                <Section 
                                    amount={cardsByStatus(status.name).length}
                                    status={status}
                                    createPanel={openCreatePanel} 
                                    onControlCreatePanel={onControlCreatePanel}  
                                    abilityAddCard = {true}               
                                >
                                    {(sortAscending) => (
                                        sortCardsByTitle(cardsByStatus(status.name), sortAscending).map((card, index) => (
                                            <Draggable key={card._id} draggableId={card._id} index={index}>
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
                                        ))
                                    )}                     
                                </Section>
                            </div>
                        )}    
                    </Droppable>                    
                ))} 
            </DragDropContext>
            <Section
                amount={cardsByDisabledStatus.length}
                status={{name: 'Other', color: 'grey'}}
            >
                {(sortAscending) => (
                    sortCardsByTitle(cardsByDisabledStatus, sortAscending).map((card) => (
                        <Card onModalInfo={onModalInfo} {...card} />                      
                    ))
                )}
            </Section>
        </Fragment>                   
    )
}