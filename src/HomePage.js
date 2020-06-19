import React, { Fragment } from 'react';

import {ModalCard} from './ModalCard';
import {CardInfo} from './CardInfo';
import {Section} from './Section';
import {CardAddPanel} from './CardAddPanel';

import {findCardById} from './appFunctions';
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
        let {statuses, dataByStatuses} = this.props.dataCard;
        let {_id, status} = card;

        await cardChange(_id, {status: newStatus});

        let arrayChange = dataByStatuses[status].filter(item => item._id !== _id);
        let newCard = {
            ...card,
            status: newStatus
        };
        let dataByStatusesNew = {
            ...dataByStatuses,
            [status]: arrayChange,
            [newStatus]: [...dataByStatuses[newStatus], newCard]
        };
        
        this.props.updateData({
            dataCard: {
                dataByStatuses: dataByStatusesNew,
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
                        {statuses && statuses.map(status => ( 
                            <Section 
                                status={status} 
                                cards={dataByStatuses[status] || []}                        
                                onDeleteCard={this.handleDeleteCard}
                                onModalInfo={this.handleModalInfo}
                            />))}
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