import React from 'react';
import {Avatar} from './Avatar';

export function AreaAvatar(props) {
    let {avatar, onClickAvatar} = props;

    return (
        <div 
            onClick={onClickAvatar} 
            style={{cursor: onClickAvatar ? 'pointer' : null}}
            class="avatar flex-center flex-column"
        >
            <Avatar {...props} key={avatar}/>
        </div>
    )
}