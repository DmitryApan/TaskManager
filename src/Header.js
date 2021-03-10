import React, {useMemo} from 'react';

import './App.css';

export default function Header({text, amount, color, sortAscending, onClickSort, onClickNewCard, abilityAddCard}) {

    const getStyleTopBorder = useMemo(() => ({
        borderTopColor: color
    }), [color]);

    return (
        <div className="section-header flex-row" style={getStyleTopBorder}>
            <div className="section-header-name">{text}</div>
            <div className="section-header-amount flex-center">{amount}</div>
            {abilityAddCard && 
                <div onClick={onClickNewCard} className="section-header-newcard flex-center ">+</div>
            }
            <div className="section-header-order flex-center">
                <div onClick={onClickSort}>
                    {sortAscending ? (
                        <>&#9650;</>
                    ) : (
                        <>&#9660;</>
                    )}
                </div>          
            </div> 
        </div>
    )
}  