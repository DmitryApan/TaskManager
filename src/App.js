import React from 'react';

import './App.css';

import {Card} from './Card';
import {Header} from './Header';

class App extends React.Component {  

  constructor(props) {
    super(props);
    this.state = {
      value: {}
    }

    this.state.value = this.props.value;
  }

  render() {
    const headerInfo = this.state.value.headerInfo;
    const cards = this.state.value.cards;  
    
    return (    
      <div class="section flex-column">       

          <Header {...headerInfo} />        
  
          {
            cards.map(card => ( <Card {...card} />))
          }  

      </div>
    );

  }  

  componentDidMount() {

    const srcData = this.props.srcData;

    console.log("App is ready");

    (async () => {

      let response = await fetch(srcData);

      if (response.ok) { 

        let json = await response.json();
        this.state.value.headerInfo.text = json[0].description;

        this.state.value.headerInfo.text = json[0].description;
        this.state.value.cards[0].description = json[1].description;
        this.state.value.cards[1].description = json[2].description;

        this.setState(this.state);

      } else {
        alert("Ошибка HTTP: " + response.status);
      }

    })();    

  }

}

export default App;
