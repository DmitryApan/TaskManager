import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect           
  } from 'react-router-dom';

import {getSettings, getDataCards, login} from './networkFunctions';

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
        let dataCardUpdate = {
            statuses: [],
            dataByStatuses: {}
        };

        console.log("App is ready");           
             
        dataCardUpdate.statuses = await getSettings();       
        let cards = await getDataCards();

        cards.forEach((card) => {
            let {status} = {...card}
            let {dataByStatuses} = dataCardUpdate;

            if (!(dataByStatuses[status])) {                
                dataByStatuses[status] = [];
            }                

            dataByStatuses[status].push(card);
        });            

        this.setState({
            dataCard: dataCardUpdate                                  
        });        
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

    handlerSubmitLoginForm = async(event) => {
        event.preventDefault();

        let body = {
            email: this.state.userEmail,
            password: this.state.userPassword
        }

        let response = await login(body);

        if (response.ok) {
            this.setState({
                isLogin: true
            });
        }
        else {
            this.setState({  
                isLogin: false,              
                messageLoginForm: 'Wrong password or email!'
            });
        }        
    }

    render() {     
        const {state, updateData} = this;
        const {isLogin, messageLoginForm} = this.state;
        
        return (
            <Router>
                <Switch>                             
                    <Route exact path="/">
                        <HomePage {...state} updateData={updateData} />                                  
                    </Route>
                    <Route path="/login">
                        { isLogin
                            ? <Redirect to="/" />
                            : <LoginPage                                                        
                                buttonText="Login"
                                linkText="Logout?" 
                                linkUrl="/register"
                                message={messageLoginForm}
                                onSubmitLoginForm={this.handlerSubmitLoginForm}
                                onChangeLoginInput={this.handlerChangeLoginInput}
                            />
                        }
                    </Route>
                    <Route path="/register">
                        <LoginPage                            
                            buttonText="Logout"
                            linkText="Login"
                            linkUrl="/login"
                            onSubmitLoginForm={this.handlerSubmitLoginForm}
                            onChangeLoginInput={this.handlerChangeLoginInput}                            
                        />
                    </Route>
                    <Route path="/logout">                        
                    </Route>
                    <Route path="/:id">
                        <CardPage {...this.state.dataCard} />
                    </Route>                                                        
                </Switch>
            </Router>
        );
    }
}

export default App;