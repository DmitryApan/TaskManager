import React from 'react';
import {Link} from 'react-router-dom';

export default function UserMenu ({onClickPreferences, onClickLogOut}) {
    return (
        <div class="user-menu">
            <div class="menu-preferences" onClick={onClickPreferences}>Preferences</div><hr/>
            <Link class="menu-logout" to="/logout">LogOut</Link>
        </div>
    )
}