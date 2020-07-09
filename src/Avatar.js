import React, {useState} from 'react';

import './App.css';

export function Avatar({avatar, name, onClickAvatar}) {
    const [isErrorLoadImg, setIsErrorLoadImg] = useState(false);

    let initials = name && name.trim().split(' ', 2).map(n => n[0]).join('').toUpperCase();

    return (
        <div onClick={onClickAvatar} class="avatar flex-center flex-column">
            {(avatar && !isErrorLoadImg 
                && (
                    <img 
                        class="avatar-image" 
                        src={avatar} 
                        alt=""
                        onError={() => {setIsErrorLoadImg(true);}}
                    />
                )) || (
                    initials && <div class="avatar-initials flex-center">{initials}</div>
                ) || (
                    <>
                        <div class="symbol-head" />
                        <div class="symbol-shoulders" />
                    </>
                )
            }
        </div>
    )
}