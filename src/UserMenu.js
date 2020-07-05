import React from 'react';

export function UserMenu ({onClickPreferences, onClickLogOut}) {
    return (
        <div class="user-menu">
            <div class="menu-preferences" onClick={onClickPreferences}>Preferences</div><hr/>
            <div class="menu-logout" onClick={onClickLogOut}>LogOut</div>
        </div>
    )
}