import React from 'react';

export default function Panel({children, onClickOutside, position = 'relative', top = 0, left = 0}) {
    return (
        <div className="flex-row panel">
            <div className="panel-body" style={{position, top, left}}>
                {children}
            </div>
            <div onClick={onClickOutside} className="panel-overlay"></div>
        </div>
    )    
}