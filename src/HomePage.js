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

    handleChangeCard = async(body, {_id, status}) => {
        const {statuses, dataByStatuses} = this.props.dataCard;

        await cardChange(_id, body);

        let arrayChange = dataByStatuses[status].map(item => item._id === _id 
            ? {...item, description: body.description}
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
                    onChangeCard={this.handleChangeCard}
                    {...findCardById(idCard, dataByStatuses)}
                >
                    { card => (
                        <CardInfo 
                            changeDescription={true}
                            {...card} 
                        />
                    )}
                </ModalCard>} 
            </Fragment>
        )        
    }
}