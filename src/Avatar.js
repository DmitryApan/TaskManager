import React from 'react';
import './App.css';

export function Avatar({ path, initials }) {
    if (path) {
        return (
        <img class="section-card-info-graph-avatar avatar-lay" src={path} alt=""></img>
        )
    } else {
        return (
        <div class="section-card-info-graph-initials flex-center">{initials}</div>
        )
    }
}