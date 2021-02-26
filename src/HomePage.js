import React, {Fragment} from 'react';
import {connect} from 'react-redux';

import {
    changeCardStatusForDrag, 
    changeCardStatus, 
    changeCardTitle, 
    changeCardDescription, 
    changeCardChildren,
    addCard
} from './store/actionsCreators/cards';
import {
    addStatus, 
    deleteStatus, 
    enableStatus,
    enableWebSocket
} from './store/actionsCreators/settings';
import Modal from './Modal';
import CardInfo from './CardInfo';
import Panel from './Panel';
import UserMenu from './UserMenu';
import UserEditor from './UserEditor';
import AreaAvatar from './components/AreaAvatar/AreaAvatar';
import SettingsPanel from './components/SettingsPanel/SettingsPanel';
import TableSections from './components/TableSections/TableSections';

class HomePage extends React.Component {
    state = {
        idCard: null,
        userMenu: false,
        userEditor: false,
        openCreatePanel: null,
        settingsPanel: false,
    }
    
    handleCloseUserMenu = () => {
        this.setState({
            userMenu: false
        });
    }

    handleOpenUserMenu = () => {
        this.setState({
            userMenu: true
        });
    }

    handleModalInfo = (idCard) => {
        document.body.style.overflow = 'hidden';
        
        this.setState({idCard});        
    }

    handleCloseModal = () => {
        document.body.style.overflow = 'visible';

        this.setState({
            idCard: null
        });
    }

    handleOpenUserEditor = () => {
        this.setState({
            userMenu: false,
            userEditor: true
        });
    }

    handleOpenSettings = () => {
        this.setState({
            userMenu: false,
            settingsPanel: true
        });
    }

    handleCloseUserEditor = () => {
        this.setState({
            userEditor: false
        });
    }

    handleCloseSettingsPanel = () => {
        this.setState({
            settingsPanel: false
        });
    }

    handleControlCreatePanel = (status) => {
        this.setState({
            openCreatePanel: (this.state.openCreatePanel === status) ? null : status
        });
    }

    handleCreateNewCard = (card) => {
        this.setState({
            openCreatePanel: null
        });

        this.props.addCard(card);
    }

    handleChangeCardStatusForDrag = (data) => {
        this.props.changeCardStatusForDrag(data);
    }

    render() {
        const {idCard, userMenu, userEditor, openCreatePanel, settingsPanel} = this.state;
        const {
            userInfo, 
            statuses, 
            webSocket,
            cards, 
            changeCardChildren,
            changeCardStatus, 
            changeCardTitle, 
            changeCardDescription,
            addCard,
            addStatus,
            deleteStatus,
            enableStatus,
            enableWebSocket,
            animation
        } = this.props; 
        const {_id, avatar, name} = userInfo;  

        return (
            <Fragment>
                <div className="homepage-overlay flex-row">
                    <div className="flex-row">
                        <TableSections 
                            onDragEnd={this.handleChangeCardStatusForDrag}
                            statuses={statuses}
                            cards={cards}
                            openCreatePanel={openCreatePanel}
                            onControlCreatePanel={this.handleControlCreatePanel}                 
                            onModalInfo={this.handleModalInfo}
                            onCreateNewCard={this.handleCreateNewCard}
                            animation={animation}
                        />                        
                    </div>
                    <div className="homepage-region-logout flex-column">
                        <div className="flex-center">
                            <div>
                                {name}
                            </div>
                            <div className="homepage-region-avatar">
                                <AreaAvatar 
                                    onClickAvatar={this.handleOpenUserMenu}
                                    size={50}
                                    id={_id}
                                    name={name}
                                    avatar={avatar}
                                />
                            </div>
                        </div>
                        {userMenu && 
                            <Panel onClickOutside={this.handleCloseUserMenu}>
                                <UserMenu 
                                    onClickPreferences={this.handleOpenUserEditor} 
                                    onClickSettings={this.handleOpenSettings}
                                />
                            </Panel>
                        }
                    </div>
                </div>                           
                {idCard && 
                    <Modal onCloseModal={this.handleCloseModal}>
                        {() => (
                            <CardInfo 
                                isChanging 
                                id={idCard} 
                                cards={cards}
                                statuses={statuses}
                                onRedirect={this.handleModalInfo}
                                changeCardChildren={changeCardChildren}
                                changeCardStatus={changeCardStatus}
                                changeCardTitle={changeCardTitle}
                                changeCardDescription={changeCardDescription}
                                addCard={addCard}
                            />
                        )}
                    </Modal>
                }
                {userEditor && 
                    <Modal onCloseModal={this.handleCloseUserEditor}>
                        {() => <UserEditor />}
                    </Modal>
                } 
                {settingsPanel &&
                    <Modal onCloseModal={this.handleCloseSettingsPanel}>
                        {() => (
                            <SettingsPanel 
                                statuses={statuses}
                                webSocket={webSocket}
                                onDeleteStatus={deleteStatus}
                                onCreateStatus={addStatus}
                                onEnabledStatus={enableStatus}
                                onEnableWebSocket={enableWebSocket}
                            />
                        )}
                    </Modal>
                }  
            </Fragment>
        )        
    }
}

const mapStateToProps = state => ({
    statuses: state.settings.data.statuses,
    webSocket: state.settings.data.webSocket,
    userInfo: state.userInfo.data,
    cards: state.cards.data,
    animation: state.cards.animation
});

const mapDispatchToProps = {
    changeCardStatusForDrag,
    changeCardChildren,
    changeCardStatus,
    changeCardTitle,
    changeCardDescription,
    addCard,
    addStatus,
    deleteStatus,
    enableStatus,
    enableWebSocket
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);