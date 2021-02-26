import React from 'react';
import {Link} from 'react-router-dom';

export default function UserMenu ({onClickPreferences, onClickSettings}) {
    return (
        <div className="user-menu">
            <div className="menu-preferences" onClick={onClickPreferences}>Preferences</div>
            <div className="menu-preferences" onClick={onClickSettings}>Settings</div><hr/>
            <Link className="menu-logout" to="/logout">LogOut</Link>
        </div>
    )
}