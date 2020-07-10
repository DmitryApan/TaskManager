import React, {useState} from 'react';
import {Avatar} from './Avatar';
import {PlaceholderAvatar} from './PlaceholderAvatar';

export function AreaAvatar({avatar, name, onClickAvatar}) {
    const [isErrorLoadImg, setIsErrorLoadImg] = useState(false);

    let initials = name && name.trim().split(' ', 2).map(n => n[0]).join('').toUpperCase();

    function onErrorLoad() {
        setIsErrorLoadImg(true);
    }

    return(
        <div 
            onClick={onClickAvatar} 
            style={{cursor: onClickAvatar ? 'pointer' : null}}
            class="avatar flex-center flex-column"
        >
            {((avatar && !isErrorLoadImg) && 
                <Avatar 
                    onErrorLoad={onErrorLoad} 
                    avatar={avatar} 
                />
            ) || 
            (initials && 
                <div class="avatar-initials flex-center">{initials}</div>
            )
            || <PlaceholderAvatar />}
        </div>
    )
}