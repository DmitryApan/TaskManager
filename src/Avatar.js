import React from 'react';

import './App.css';

export function Avatar({avatar, onErrorLoad}) {
    return (
        <img 
            class="avatar-image" 
            src={avatar} 
            alt=""
            onError={onErrorLoad}
        />
    )
}