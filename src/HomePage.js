import React, { Fragment } from 'react';
import { DragDropContext} from 'react-beautiful-dnd';

import {ModalCard} from './ModalCard';
import {CardInfo} from './CardInfo';
import {Section} from './Section';
import {CardAddPanel} from './CardAddPanel';

import {findCardById, changeStatusCard} from './appFunctions';
import {cardCreate, cardDelete, cardChange} from './networkFunctions';

export class HomePage extends React.Component {
    handleCreateCard = async(title) => {        
        const {statuses, dataByStatuses} = this.props.dataCard;
        let body = {title}        
          
        let card = await cardCreate(body);
        
        let {status} = card;        
        let updateDataByStatuses = {
            ...dataByStatuses,
            [status]: [...(dataByStatuses[status] || []), card]
        };       
        
        this.props.updateData({   
            dataCard: {
                dataByStatuses: updateDataByStatuses,
                statuses
            },           
        });               
    }

    handleDeleteCard = async({_id, status}) => {
        const {statuses, dataByStatuses} = this.props.dataCard;

        if (!(await cardDelete(_id))) {
            return;
        }
        
        let arrayCards = dataByStatuses[status].filter(item => item._id !== _id);
        let updateDataByStatuses = {
            ...dataByStatuses,
            [status]: arrayCards
        }
        
        if (!arrayCards.length) {
            delete updateDataByStatuses[status];            
        }
        
        this.props.updateData({       
            dataCard: {
                dataByStatuses: updateDataByStatuses,
                statuses
            },                       
        });
    }

    handleChange = (key) => (async(value, {_id, status}) => {
        const {statuses, dataByStatuses} = this.props.dataCard;

        await cardChange(_id, {[key]: value});

        let arrayChange = dataByStatuses[status].map(item => item._id === _id
            ? {...item, [key]: value}
            : item
        );

        this.props.updateData({
            dataCard: {
                dataByStatuses: {
                    ...dataByStatuses,
                    [status]: arrayChange
                },
                statuses
            }
        });
    })

    handleChangeStatus = async(newStatus, card) => {
        let {dataCard} = this.props;
        let {_id} = card;

        await cardChange(_id, {status: newStatus});

        this.props.updateData({
            dataCard: changeStatusCard(_id, newStatus, dataCard)
        });
    }

    onDragEnd = async({draggableId, destination, source}) => {
        let {dataCard} = this.props;
        const {droppableId: oldStatus} = source;
        const {droppableId: newStatus} = destination;

        if (!destination || (newStatus === oldStatus)) {
            return;
        }

        let newDataCard = changeStatusCard(draggableId, newStatus, dataCard);

        this.props.updateData({
            dataCard: newDataCard
        });

        let response = await cardChange(draggableId, {status: newStatus});

        if (!response) {
            this.props.updateData({dataCard});
        }        
    }

    handleModalInfo = ({_id}) => {
        document.body.style.overflow = 'hidden';
        
        this.props.updateData({            
            idCard: _id
        });        
    }

    handleCloseModal = () => {
        document.body.style.overflow = 'visible';

        this.props.updateData({            
            idCard: null                
        });
    }

    handleLogout = () => {
        localStorage.removeItem('email');

        this.props.updateData({            
            isLogin: false           
        });
    }

    render() {
        const {idCard} = this.props;   
        const {statuses, dataByStatuses} = this.props.dataCard;               

        return (
            <Fragment>
                <CardAddPanel onCreateCard={this.handleCreateCard} />
                <div class="homepage-overlay flex-row">
                    <div class="flex-row">
                        <DragDropContext onDragEnd={this.onDragEnd} onDragStart={this.onDragStart}>
                            {statuses && statuses.map(status => ( 
                                <Section 
                                    status={status} 
                                    cards={dataByStatuses[status] || []}                        
                                    onDeleteCard={this.handleDeleteCard}
                                    onModalInfo={this.handleModalInfo}
                                />))}    
                        </DragDropContext>
                    </div>
                    <div class="homepage-region-logout flex-column">
                        <button onClick={this.handleLogout} class="button-logout">Logout</button>
                    </div>
                </div>                           
                {idCard && 
                    <ModalCard 
                        onCloseModal={this.handleCloseModal}                   
                    >
                        {() => <CardInfo 
                            isChanging={true}
                            statuses={statuses}
                            card={findCardById(idCard, dataByStatuses)}
                            onChangeStatus={this.handleChangeStatus}
                            onChangeTitle={this.handleChange('title')}
                            onChangeDescription={this.handleChange('description')}                            
                        />}
                    </ModalCard>}   
            </Fragment>
        )        
    }
}