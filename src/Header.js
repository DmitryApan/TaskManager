import React from 'react';

import './App.css';

export function Header({text, amount, onIncrease, onDecrease, onClickNewCard}) {
    return (
        <div class="section-header flex-row">
            <div class="section-header-name">{text}</div>
            <div class="section-header-amount flex-center">{amount}</div>
            <div onClick={onClickNewCard} class="section-header-newcard flex-center">&#9998;</div>
            <div class="section-header-order flex-column">
                <div onClick={onIncrease} class="section-header-order-increase">&#9650;</div>    
                <div onClick={onDecrease} class="section-header-order-decrease">&#9660;</div>
            </div> 
        </div>
    )
}  