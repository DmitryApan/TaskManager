import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from 'react-router-dom';
import {authorization} from './store/actionsCreators/authorization';
import HomePage from './HomePage';
import CardPage from './CardPage';
import LoginPage from './LoginPage';
import LogOut from './LogOut';

class App extends React.Component {  
    constructor(props) {
        super(props);   
        
        props.authorization();
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

const actionCreators = {
    authorization
};

const mapStateToProps = state => ({
    isLogin: state.authorization.isLogin
});

export default connect(mapStateToProps, actionCreators)(App);