import React from 'react';

import './App.css';

export function Header({text, amount, sortAscending, onClickSort, onClickNewCard}) {
    return (
        <div class="section-header flex-row">
            <div class="section-header-name">{text}</div>
            <div class="section-header-amount flex-center">{amount}</div>
            <div onClick={onClickNewCard} class="section-header-newcard flex-center ">+</div>
            <div class="section-header-order flex-center">
                <div onClick={onClickSort}>
                    {sortAscending 
                        ? <>&#9650;</>
                        : <>&#9660;</>
                    }
                </div>          
            </div> 
        </div>
    )
}  