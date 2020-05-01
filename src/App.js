import React from 'react';

import './App.css';

import {headerInfo} from './Data';
import {cards} from './Data';

import {Card} from './Card';
import {Header} from './Header';

function App() {
  return (    
    <div class="section flex-column">       

        <Header {...headerInfo} />        

        {
          cards.map(card => ( <Card {...card}/>))
        }      
    </div>
  );
}

export default App;
