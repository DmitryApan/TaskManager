import React from 'react';

import {Section} from './Section';

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
                
            cards.forEach(card => {
                if (!(card.status in stateObj.dataByStatuses)) {
                    stateObj.statuses.push(card.status);
                    stateObj.dataByStatuses[card.status] = [];
                }                
                stateObj.dataByStatuses[card.status].push(card);
            });

            console.log(stateObj);

            this.setState(stateObj);
        } catch (error) {
            alert("Ошибка HTTP: " + error);
        }          
    }

    render() {
        const statuses = this.state.statuses;
        const dataCards = this.state.dataByStatuses;

        return (
            statuses && statuses.map(status => ( <Section cards={dataCards[status]}/>))                                         
        );
    }
}

export default App;
