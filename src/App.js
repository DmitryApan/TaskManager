import React from 'react';

import img_1 from './img_1.png';
import img_2 from './img_2.png';
import ava_1 from './ava_1.png';
import ava_2 from './ava_2.png';

import './App.css';

let avatars = [{
  path: ava_1
}, {
  initials: "AD"
}]

let cards = [
  { imageSrc: img_1,
    description: "Filters | Reset and filter button have inconsistent styles",
    avatars},
  { imageSrc: img_2,
    description: "Adjust a lenght of the field to avoid overlapping text field with a drop-down button",
    avatars: [{ path: ava_2 }]}
]

function Avatar({ path, initials }) {
  if (path) {
    return (
      <img class="section-card-info-graph-avatar avatar-lay" src={path}></img>
    )
  } else {
    return (
      <div class="section-card-info-graph-initials flex-center">{initials}</div>
    )
  }
}

function Card({ imageSrc, description, avatars}) {
  return (
    <div class="section-card flex-column">
        <img class="section-card-image" src={imageSrc}></img>
        <div class="section-card-info flex-row">
            <div class="section-card-info-text">{description}</div>
            <div class="section-card-info-graph flex-row">                
                {
                  avatars.map(avatar => ( <Avatar {...avatar}/> ))
                }                                                    
            </div>  
        </div>
    </div>
  )
}

function App() {
  return (    
    <div class="section flex-column">
        <div class="section-header flex-row">
            <div class="section-header-name">
                NEEDS CLARIFICATION
            </div>
            <div class="section-header-amount flex-center">
                15
            </div>
        </div>         
        {
          cards.map(card => (<Card imageSrc={card.imageSrc} description={card.description} avatars={card.avatars}/>))
        }      
    </div>
  );
}

export default App;
