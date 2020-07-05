import React from 'react';

import './App.css';

export class Modal extends React.Component {
    handleCloseModal = (event) => {
        this.props.onCloseModal();

        event.stopPropagation();
    }

    render() {
        return (        
            <div onClick={this.handleCloseModal} class="modal-overlay">
                <div onClick={(event) => event.stopPropagation()} class="modal-window">
                    <div class="flex-row">                        
                        <div onClick={this.handleCloseModal} class="button-x-big">&#xd7;</div>                    
                    </div>                    
                    {this.props.children()}
                </div>            
            </div>        
        )
    }    
}