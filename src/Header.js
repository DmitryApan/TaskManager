import React, {useMemo} from 'react';

import {getColorByStatus} from './appFunctions';

import './App.css';

export default function Header({text, amount, sortAscending, onClickSort, onClickNewCard}) {

    const getStyleTopBorder = useMemo(() => ({
        borderTopColor: getColorByStatus(text)
    }), [getColorByStatus, text]);

    return (
        <div class="section-header flex-row" style={getStyleTopBorder}>
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