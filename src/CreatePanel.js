import React from 'react';
import './App.css';

export function CreatePanel({onCreate, onChange, onOutsideClick}) {
    return (
        <div class="create-panel">
            <div class="create-panel-body">
                <div>Creating new card...</div>
                <div>
                    <div>Title:</div>
                    <textarea onChange={onChange} name="title"></textarea>
                </div>
                <div>
                    <div>Description:</div>
                    <textarea onChange={onChange} name="description"></textarea>
                </div>
                <button onClick={onCreate} type="submit">Create</button>
            </div>
            <div onClick={onOutsideClick} class="create-panel-overlay"></div>
        </div>
    )
}