import React from 'react';
import {Link} from 'react-router-dom';

export default function UserMenu ({onClickPreferences, onClickSettings}) {
    return (
        <div class="user-menu">
            <div class="menu-preferences" onClick={onClickPreferences}>Preferences</div>
            <div class="menu-preferences" onClick={onClickSettings}>Settings</div><hr/>
            <Link class="menu-logout" to="/logout">LogOut</Link>
        </div>
    )
}