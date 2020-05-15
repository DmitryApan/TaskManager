import React from 'react';

import {Section} from './Section';
import {CardAddPanel} from './CardAddPanel';

import './App.css';

class App extends React.Component {  
    constructor(props) {
        super(props);        
        this.state = {
            statuses: null     
        };  
    }

    async componentDidMount() {
        const srcData = this.props.srcData;
        const stateObj = {
            statuses: [],
            dataByStatuses: {}
        }

        console.log("App is ready");

        try {    
            let response = await fetch(srcData);
            let cards = await response.json(); 
                            
            cards.forEach((card) => {
                let {status} = {...card}
                let dataByStatuses = stateObj.dataByStatuses;

                if (!(dataByStatuses[status])) {
                    stateObj.statuses.push(status);
                    dataByStatuses[status] = [];
                }                
               dataByStatuses[status].push(card);
            });

            //console.log(stateObj);

            this.setState(stateObj);
        } catch (error) {
            alert("Ошибка HTTP: " + error);
        }          
    }

    handleCreateCard = async(description) => {        
        const urlCreateCard = this.props.urlCreateCard;
        const {statuses, dataByStatuses} = this.state;
        let body = {
            description
        }

        try {
            let response = await fetch (urlCreateCard, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(body)            
            });

            let result = await response.json();                      

            let updateDataByStatuses = this.state.dataByStatuses;
            updateDataByStatuses[result.status].push(result);

            let updateState = {
                statuses: ((dataByStatuses[result.status]) ? statuses : statuses.push(result.status)),
                dataByStatuses: updateDataByStatuses
            }

            this.setState(updateState);

        } catch (error) {
            alert("Ошибка HTTP: " + error);
        }       
    }

    render() {

        console.log(this.state);
        const {statuses, dataByStatuses} = this.state;
        
        return (
            <div>
                <CardAddPanel onCreateCard={this.handleCreateCard} />

                <div>
                    {statuses && statuses.map(status => ( <Section status={status} cards={dataByStatuses[status]}/>)) }
                </div>                
            </div>    
        );
    }
}

export default App;