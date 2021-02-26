import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from 'react-router-dom';

import {urlWebSocket} from './Data';
import {findUserById} from './appFunctions';
import {authorization} from './store/actionsCreators/authorization';
import {cardsAnimation, cardsReceive} from './store/actionsCreators/cards';
import {settingsReceive} from './store/actionsCreators/settings';
import {usersAppReceive} from './store/actionsCreators/usersApp';
import {userInfoReceive} from './store/actionsCreators/userInfo';
import HomePage from './HomePage';
import CardPage from './CardPage';
import LoginPage from './LoginPage';
import LogOut from './LogOut';

class App extends React.Component { 
    constructor(props) {
        super(props);        

        props.authorization();
    }

    state = {
        socket: new WebSocket(urlWebSocket)
    }

    messageWebSocket = ({data}) => {
        const {
            cardsAnimation,
            cardsReceive,
            usersAppReceive, 
            settingsReceive, 
            userInfoReceive,
            userInfo,
            webSocket
        } = this.props;

        let obj = JSON.parse(data);
        let field = obj.field;
        let socketData = obj.data;

        if (field === 'CARDS') {
            cardsAnimation(true);
            cardsReceive(socketData);
            cardsAnimation(false);
        } else if (field === 'USERS') {
            const user = findUserById(userInfo._id, socketData);

            usersAppReceive(socketData);
            userInfoReceive(user);
        } else if (field === 'SETTINGS') {
            settingsReceive({
                ...socketData[0],
                webSocket
            });            
        }
    }    
    
    componentDidUpdate() {
        const {webSocket} = this.props;
        const {socket} = this.state;
        if (webSocket) {
            if (webSocket.enabled) {
                socket.onmessage = this.messageWebSocket;
            } else {
                socket.onmessage = null;
            }
        }        
    }
    
    render() {    
        const {isLogin} = this.props;

        return (
            <Router>
                <Switch>
                    {isLogin ? (
                        <Fragment>
                            <Route exact path="/">
                                <HomePage />                                  
                            </Route>
                            <Route path="/logout">
                                <LogOut />
                            </Route>
                            <Route path="/:id">
                                <CardPage />
                            </Route>
                        </Fragment>
                    ) : ( 
                        <Fragment>
                            <Route exact path="/">
                                <Redirect to="/login" />
                            </Route>
                            <Route path="/:page">                            
                                <LoginPage />                        
                            </Route>
                        </Fragment> 
                    )}                             
                </Switch>
            </Router>
        );
    }
}

const mapStateToProps = state => ({
    isLogin: state.authorization.isLogin,
    userInfo: state.userInfo.data,
    webSocket: state.settings.data.webSocket,
});

const actionCreators = {
    authorization,
    cardsReceive,
    cardsAnimation,
    settingsReceive,
    usersAppReceive,
    userInfoReceive
};

export default connect(mapStateToProps, actionCreators)(App);