import React, { Fragment } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
  } from 'react-router-dom';

import {getSettings, getDataCards, login, signUp} from './networkFunctions';

import {HomePage} from './HomePage';
import {CardPage} from './CardPage';
import {LoginPage} from './LoginPage';

import './App.css';

class App extends React.Component {  
    constructor(props) {
        super(props);        
        this.state = {
            dataCard: {
                statuses: null,
                dataByStatuses: null
            },            
            idCard: null                                
        };  
    }

    async componentDidMount() {
        let email = localStorage.getItem('email');
        
        this.setState({
            email,
            isLogin: !!email,
            dataCard: email ? await this.dataRequest() : {}                               
        });        
    }   
    
    async dataRequest() {
        let statuses = await getSettings();  
        let cards = await getDataCards();
      
        let dataCard = {
            statuses,
            dataByStatuses: statuses.reduce((acc, status) => ({
                ...acc, 
                [status]: []
            }), {})
        };        

        cards.forEach((card) => {
            let {status} = {...card}
            let {dataByStatuses} = dataCard;

            dataByStatuses[status].push(card);
        });

        return dataCard;
    }

    updateData = (value) => {
        this.setState(value);
    }    

    handlerChangeLoginInput = (event) => {
        const value = event.target.value;
        const name = event.target.name;

        this.setState({
            messageLoginForm: null,
            [name]: value
        });
    }

    handlerSubmitForm = (networkFunction) => async(event) => {
        event.preventDefault();

        let body = {
            email: this.state.userEmail,
            password: this.state.userPassword
        }

        let response = await networkFunction(body);

        localStorage.setItem('email', response.email);

        let {email} = response;

        this.setState({
            isLogin: !!email,
            messageLoginForm: email ? null : 'Wrong password or email!',
            dataCard: email ? await this.dataRequest() : {}
        });
    }

    render() {     
        const {state, updateData} = this;
        const {isLogin, messageLoginForm} = this.state;
        
        return (
            <Router>
                <Switch>
                    {('isLogin' in state) && (isLogin 
                        ? <Fragment>
                            <Route exact path="/">
                                <HomePage {...state} updateData={updateData} />                                  
                            </Route>
                            <Route path="/:id">
                                <CardPage {...this.state.dataCard} />
                            </Route>                            
                        </Fragment>
                        : <Fragment>
                            <Route exact path="/">
                                <Redirect to="/login" />
                            </Route>
                            <Route path="/login">                            
                                <LoginPage                                                        
                                    buttonText="Login"
                                    linkText="SignUp?" 
                                    linkUrl="/register"
                                    message={messageLoginForm}
                                    onSubmitLoginForm={this.handlerSubmitForm(login)}
                                    onChangeLoginInput={this.handlerChangeLoginInput}
                                />                        
                            </Route>
                            <Route path="/register">
                                <LoginPage                            
                                    buttonText="SignUp"
                                    linkText="Login"
                                    linkUrl="/login"
                                    onSubmitLoginForm={this.handlerSubmitForm(signUp)}
                                    onChangeLoginInput={this.handlerChangeLoginInput}                            
                                />
                            </Route>
                        </Fragment> 
                    )}                             
                </Switch>
            </Router>
        );
    }
}

export default App;