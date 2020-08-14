import React from 'react';

export default function UserMenu ({onClickPreferences, onClickLogOut}) {
    return (
        <div class="user-menu">
            <div class="menu-preferences" onClick={onClickPreferences}>Preferences</div><hr/>
            <div class="menu-logout" onClick={onClickLogOut}>LogOut</div>
        </div>
    )
}