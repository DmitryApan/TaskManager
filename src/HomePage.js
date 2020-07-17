import React, {Fragment} from 'react';
import {DragDropContext} from 'react-beautiful-dnd';

import {Modal} from './Modal';
import {CardInfo} from './CardInfo';
import {Section} from './Section';
import {AreaAvatar} from './AreaAvatar';
import {Panel} from './Panel';
import {UserMenu} from './UserMenu';
import {UserEditor} from './UserEditor';

import {findCardById, changeStatusCard} from './appFunctions';
import {cardCreate, cardDelete, cardChange} from './networkFunctions';

export class HomePage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            userMenu: false,
            userEditor: false,
            openCreatePanel: null
        }
    }

    handleCloseUserMenu = () => {
        this.setState({
            userMenu: false
        })
    }

    handleOpenUserMenu = () => {
        this.setState({
            userMenu: true
        })
    }

    handleCreateCard = async(title, description) => {        
        const {statuses, dataByStatuses} = this.props.dataCard;
        let body = {
            title,
            description
        }        
          
        let card = await cardCreate(body);
        
        let {status: statusCard} = card;        
        let updateDataByStatuses = {
            ...dataByStatuses,
            [statusCard]: [...(dataByStatuses[statusCard] || []), card]
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

    handleOpenUserEditor = () => {
        this.setState({
            userMenu: false,
            userEditor: true
        })
    }

    handleCloseUserEditor = () => {
        this.setState({
            userEditor: false
        })
    }

    handleControlCreatePanel = (status) => {
        this.setState({
            openCreatePanel: (this.state.openCreatePanel === status) ? null : status
        })
    }

    render() {
        const {userMenu, userEditor, openCreatePanel} = this.state;
        const {idCard, userInfo, updateData} = this.props;   
        const {statuses, dataByStatuses} = this.props.dataCard;               

        return (
            <Fragment>
                <div class="homepage-overlay flex-row">
                    <div class="flex-row">
                        <DragDropContext onDragEnd={this.onDragEnd} onDragStart={this.onDragStart}>
                            {statuses.map(status => ( 
                                <Section 
                                    status={status}
                                    createPanel={(openCreatePanel === status)} 
                                    cards={dataByStatuses[status] || []}       
                                    onControlCreatePanel={this.handleControlCreatePanel}                 
                                    onDeleteCard={this.handleDeleteCard}
                                    onCreateCard={this.handleCreateCard}
                                    onModalInfo={this.handleModalInfo}
                                />))}    
                        </DragDropContext>
                    </div>
                    <div class="homepage-region-logout flex-column">
                        <div class="flex-center">
                            {userInfo.name}
                            <AreaAvatar 
                                {...userInfo} 
                                onClickAvatar={this.handleOpenUserMenu}
                            />
                        </div>
                        {userMenu && <Panel onClickOutside={this.handleCloseUserMenu}>
                            <UserMenu 
                                onClickLogOut={this.handleLogout}
                                onClickPreferences={this.handleOpenUserEditor} 
                            />
                        </Panel>}
                    </div>
                </div>                           
                {idCard && 
                    <Modal onCloseModal={this.handleCloseModal}>
                        {() => <CardInfo 
                            isChanging={true}
                            statuses={statuses}
                            card={findCardById(idCard, dataByStatuses)}
                            onChangeStatus={this.handleChangeStatus}
                            onChangeTitle={this.handleChange('title')}
                            onChangeDescription={this.handleChange('description')}                            
                        />}
                    </Modal>}
                {userEditor && 
                    <Modal onCloseModal={this.handleCloseUserEditor}>
                        {() => <UserEditor updateData={updateData} {...userInfo} />}
                    </Modal>}   
            </Fragment>
        )        
    }
}