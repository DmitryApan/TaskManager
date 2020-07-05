import React from 'react';

import './App.css';

export function Avatar({avatar, name, onClickAvatar}) {
    let initials = name && name.split(`${~name.indexOf(' ') ? ' ' : ''}`, 2).map(n => n[0]).join('').toUpperCase();

    return (
        <div onClick={onClickAvatar} class="avatar flex-center flex-column">
            {(avatar && <img class="avatar-image" src={avatar} alt=""></img>)
            || (initials && <div class="avatar-initials flex-center">{initials}</div>)
            || (
                <>
                    <div class="symbol-head" />
                    <div class="symbol-shoulders" />
                </>
            )}
        </div>
    )
}