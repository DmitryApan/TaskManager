import React from 'react';

import {Section} from './Section';
import {CardAddPanel} from './CardAddPanel';
import {srcData, urlCreateCard} from './Data';

import './App.css';

class App extends React.Component {  
    constructor(props) {
        super(props);        
        this.state = {
            statuses: null     
        };  
    }

    async componentDidMount() {
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

            this.setState(stateObj);
        } catch (error) {
            alert("Ошибка HTTP: " + error);
        }          
    }

    handleCreateCard = async(description) => {        
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
                               
            let status = result.status;
            let updateDataByStatuses = {
                ...dataByStatuses,
                [status]: [...dataByStatuses[status], result]
            }
            let updateStatuses = [...statuses];
            if (!dataByStatuses[status]) {
                updateStatuses.push(status);
            }
            
            this.setState({
                statuses: updateStatuses,
                dataByStatuses: updateDataByStatuses
            });

        } catch (error) {
            alert("Ошибка HTTP: " + error);
        }       
    }

    handleDeleteCard = async({_id, status}) => {
        const {statuses, dataByStatuses} = this.state;

        try {
            let response = await fetch (urlCreateCard + '/' + _id, {
                method: 'DELETE'                                           
            });           
            
            if (!response.ok) return;
        } catch (error) {
            alert("Ошибка HTTP: " + error);
        }        

        let arrayCards = dataByStatuses[status].filter(item => item._id !== _id);
        let updateDataByStatuses = {
            ...dataByStatuses,
            [status]: arrayCards
        }
        let updateStatuses = [...statuses];

        if (!arrayCards.length) {
            delete updateDataByStatuses[status];
            updateStatuses = updateStatuses.filter(item => item !== status);
        }
        
        this.setState({
            statuses: updateStatuses,
            dataByStatuses: updateDataByStatuses
        });
    }

    render() {
        const {statuses, dataByStatuses} = this.state;
        
        return (
            <div>
                <CardAddPanel onCreateCard={this.handleCreateCard} />

                <div>
                    {statuses && statuses.map(status => ( 
                        <Section 
                            status={status} 
                            cards={dataByStatuses[status]}
                            onDeleteCard={this.handleDeleteCard}
                        />)) }
                </div>                
            </div>    
        );
    }
}

export default App;