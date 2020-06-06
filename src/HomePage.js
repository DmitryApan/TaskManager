import React from 'react';
import {Link} from 'react-router-dom';

import {ModalCard} from './ModalCard';
import {CardInfo} from './CardInfo';
import {Section} from './Section';
import {CardAddPanel} from './CardAddPanel';

import {findCardById} from './appFunctions';
import {cardCreate, cardDelete} from './networkFunctions';

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
            <>
            <CardAddPanel onCreateCard={this.handleCreateCard} />

            <div class="homepage-overlay flex-row">
                <div class="flex-row">
                    {statuses && statuses.map(status => ( 
                        <Section 
                            status={status} 
                            cards={dataByStatuses[status] || []}                        
                            onDeleteCard={this.handleDeleteCard}
                            onModalInfo={this.handleModalInfo}
                        />))}
                </div>
                <div class="homepage-region-logout flex-column">
                    <Link class="button-logout" to="/logout" >Logout</Link>
                </div>
            </div>                           
            
            {idCard && 
            <ModalCard onCloseModal={this.handleCloseModal} {...findCardById(idCard, dataByStatuses)}>
                { card => (
                    <CardInfo {...card} />
                )}
            </ModalCard>} 
            </>
        )        
    }
}