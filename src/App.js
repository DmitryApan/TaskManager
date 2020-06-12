import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,           
  } from 'react-router-dom';

import {getSettings, getDataCards} from './networkFunctions';

import {HomePage} from './HomePage';
import {CardPage} from './CardPage';

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

        console.log(cards);       

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

    render() {     
        const {state, updateData} = this;
        
        return (
            <Router>
                <Switch>                             
                    <Route exact path='/'>
                        <HomePage {...state} updateData={updateData} />                                  
                    </Route>
                    <Route path='/:id' >
                        <CardPage {...this.state.dataCard} />
                    </Route>                                                        
                </Switch>
            </Router>
        );
    }
}

export default App;