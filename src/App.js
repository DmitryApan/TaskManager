import React from 'react';

import {Section} from './Section';

import './App.css';

class App extends React.Component {  
    constructor(props) {
        super(props);
        this.state = {
            sections: null      
        };  
    }

    async componentDidMount() {
        const srcData = this.props.srcData;

        console.log("App is ready");

        try {    
            let response = await fetch(srcData);
            let cards = await response.json();  
            let sections = [];   

            cards.sort(({status: stat1}, {status: stat2}) => {
                if (stat1 > stat2) return 1;
                if (stat1 == stat2) return 0;
                if (stat1 < stat2) return -1;
            }).forEach(card => {                
                if (sections[0] && sections[sections.length - 1][0].status == card.status) {
                    sections[sections.length - 1].push(card);
                } else {
                    sections.push([card]);
                }
            });
            
            console.log(sections);

            this.setState({sections});
        } catch (error) {
            alert("Ошибка HTTP: " + error);
        }          
    }

    render() {
        const sections = this.state.sections;

        return (
            sections && sections.map(section => ( <Section section={section}/>))                                         
        );
    }
}

export default App;
