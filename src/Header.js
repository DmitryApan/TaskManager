import React from 'react';
import './App.css';

export function Header({ text, amount }) {
    return (
        <div class="section-header flex-row">
        <div class="section-header-name">{text}</div>
    <div class="section-header-amount flex-center">{amount}</div>
        </div>
    )
}
  