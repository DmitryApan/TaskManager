import React, { Fragment } from 'react';

import {ModalCard} from './ModalCard';
import {CardInfo} from './CardInfo';
import {Section} from './Section';
import {CardAddPanel} from './CardAddPanel';

import {findCardById} from './appFunctions';
import {cardCreate, cardDelete, cardChange} from './networkFunctions';

export class HomePage extends React.Component {
    handleCreateCard = async(description) => {        
        const {statuses, dataByStatuses} = this.props.dataCard;
        let body = {
            description
        }        
          
        let card = await cardCreate(body);
        
        let {status} = card;        
        let updateDataByStatuses = {
            ...dataByStatuses,
            [status]: [...(dataByStatuses[status] || []), card]
        }       
        
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

    handleChangeCard = async(changeCard, card) => {
        const {statuses, dataByStatuses} = this.props.dataCard;
        let {status: changeStatusCard, description: changeDescriptionCard} = changeCard;
        let {_id: idCard, status: statusCard} = card;      

        let body = {
            status: changeStatusCard,
            description: changeDescriptionCard
        };        
        let tempDataByStatuses = {
            ...dataByStatuses                
        } 
        let arrayChange = null;

        await cardChange(idCard, body);

        if (changeStatusCard === statusCard) {
            arrayChange = dataByStatuses[statusCard].map(item => item._id === idCard 
                ? {...item, description: changeDescriptionCard}
                : item
            );
        }
        else {
            arrayChange = dataByStatuses[statusCard].filter(({_id}) => _id !== idCard);

            if (!tempDataByStatuses[changeStatusCard]) {
                tempDataByStatuses[changeStatusCard] = [];
            }

            tempDataByStatuses[changeStatusCard].push(changeCard);
        }

        tempDataByStatuses[statusCard] = arrayChange;

        this.props.updateData({
            dataCard: {
                dataByStatuses: tempDataByStatuses,
                statuses
            }
        });      
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

    render() {
        const {idCard} = this.props;   
        const {statuses, dataByStatuses} = this.props.dataCard;               

        return (
            <Fragment>
                <CardAddPanel onCreateCard={this.handleCreateCard} />

                <div class = "flex-row">
                    {statuses && statuses.map(status => ( 
                        <Section 
                            status={status} 
                            cards={dataByStatuses[status] || []}                        
                            onDeleteCard={this.handleDeleteCard}
                            onModalInfo={this.handleModalInfo}
                        />)) }
                </div>                           
                
                {idCard && 
                <ModalCard 
                    onCloseModal={this.handleCloseModal}                    
                    forChildren={
                        {
                            changeDescription: true,
                            statuses,
                            card: {...findCardById(idCard, dataByStatuses)},
                            onChangeCard: this.handleChangeCard
                        }
                    }                    
                >
                    {props => <CardInfo {...props} />}
                </ModalCard>} 
            </Fragment>
        )        
    }
}