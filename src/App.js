import React from 'react';

import {Section} from './Section';
import {CardAddPanel} from './CardAddPanel';
import {urlCardData, urlCardCreate, urlCardSettings} from './Data';
import {serverRequest} from './NetworkFunction';

import './App.css';

class App extends React.Component {  
    constructor(props) {
        super(props);        
        this.state = {
            statuses: null     
        };  
    }

    async componentDidMount() {
        const state = {
            statuses: [],
            dataByStatuses: {}
        }

        console.log("App is ready");           
             
        state.statuses = await serverRequest({url: urlCardSettings});       
        let cards = await serverRequest({url: urlCardData});

        cards.forEach((card) => {
            let {status} = {...card}
            let {dataByStatuses} = state;

            if (!(dataByStatuses[status])) {                
                dataByStatuses[status] = [];
            }                

            dataByStatuses[status].push(card);
        });            

        this.setState(state);        
    }

    handleCreateCard = async(description) => {        
        const {dataByStatuses} = this.state;
        let body = {
            description
        }        
          
        let card = await serverRequest({
            url: urlCardCreate, 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(body)
        })            
        
        let {status} = card;        
        let updateDataByStatuses = {
            ...dataByStatuses,
            [status]: [...(dataByStatuses[status] || []), card]
        }       
        
        this.setState({            
            dataByStatuses: updateDataByStatuses
        });               
    }

    handleDeleteCard = async({_id, status}) => {
        const {dataByStatuses} = this.state;

        let response = await serverRequest({
            url: `${urlCardCreate}/${_id}`,
            responseJSON: false,
            method: 'DELETE'
        })          
        
        if (!response.ok) {
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
        
        this.setState({            
            dataByStatuses: updateDataByStatuses
        });
    }

    render() {
        const {statuses, dataByStatuses} = this.state;
        
        return (
            <div>
                <CardAddPanel onCreateCard={this.handleCreateCard} />

                <div class = "flex-row">
                    {statuses && statuses.map(status => ( 
                        <Section 
                            status={status} 
                            cards={dataByStatuses[status] || []}
                            onDeleteCard={this.handleDeleteCard}
                        />)) }
                </div>                
            </div>    
        );
    }
}

export default App;