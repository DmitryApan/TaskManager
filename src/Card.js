import React from 'react';

import {Avatar} from './Avatar';

import './App.css';

export function Card({ imageSrc, description, avatars = []}) {
    return (
      <div class="section-card flex-column">
          {imageSrc ? <img class="section-card-image" src={imageSrc} alt=""></img> : null}
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
  