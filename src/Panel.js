import React from 'react';

export function Panel({children, onClickOutside, position = 'relative', top = 0, left = 0}) {
    return (
        <div class="flex-row panel">
            <div class="panel-body" style={{position, top, left}}>
                {children}
            </div>
            <div onClick={onClickOutside} class="panel-overlay"></div>
        </div>
    )    
}