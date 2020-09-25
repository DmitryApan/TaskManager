import React, {Fragment} from 'react';
import {DragDropContext} from 'react-beautiful-dnd';
import Modal from './Modal';
import CardInfo from './CardInfo';
import Section from './Section';
import AreaAvatar from './components/AreaAvatar/AreaAvatar';
import Panel from './Panel';
import UserMenu from './UserMenu';
import UserEditor from './UserEditor';
import {connect} from 'react-redux';
import {changeCardStatusForDrag} from './store/actionsCreators/cards'

class HomePage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            idCard: null,
            userMenu: false,
            userEditor: false,
            openCreatePanel: null
        }
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

    handleModalInfo = ({_id}) => {
        document.body.style.overflow = 'hidden';
        
        this.setState({
            idCard: _id
        });        
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

    handleCloseUserEditor = () => {
        this.setState({
            userEditor: false
        });
    }

    handleControlCreatePanel = (status) => {
        this.setState({
            openCreatePanel: (this.state.openCreatePanel === status) ? null : status
        });
    }

    render() {
        const {idCard, userMenu, userEditor, openCreatePanel} = this.state;
        const {userInfo, statuses, changeCardStatusForDrag} = this.props; 
        const {_id, avatar, name} = userInfo;  

        return (
            <Fragment>
                <div class="homepage-overlay flex-row">
                    <div class="flex-row">
                        <DragDropContext onDragEnd={changeCardStatusForDrag}>
                            {statuses && statuses.map(status => ( 
                                <Section 
                                    status={status}
                                    createPanel={(openCreatePanel === status)} 
                                    onControlCreatePanel={this.handleControlCreatePanel}                 
                                    onModalInfo={this.handleModalInfo}
                                />
                            ))}    
                        </DragDropContext>
                    </div>
                    <div class="homepage-region-logout flex-column">
                        <div class="flex-center">
                            <div>
                                {name}
                            </div>
                            <div class="homepage-region-avatar">
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
                                <UserMenu onClickPreferences={this.handleOpenUserEditor} />
                            </Panel>
                        }
                    </div>
                </div>                           
                {idCard && 
                    <Modal onCloseModal={this.handleCloseModal}>
                        {() => <CardInfo isChanging={true} id={idCard} />}
                    </Modal>
                }
                {userEditor && 
                    <Modal onCloseModal={this.handleCloseUserEditor}>
                        {() => <UserEditor />}
                    </Modal>
                }   
            </Fragment>
        )        
    }
}

const mapStateToProps = state => ({
    statuses: state.statuses.data,
    userInfo: state.userInfo.data
});

const actionsCreators = {
    changeCardStatusForDrag
};

export default connect(mapStateToProps, actionsCreators)(HomePage);