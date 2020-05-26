import React from 'react';

import './App.css';

export class ModalCard extends React.Component {
    handleCloseModal = (event) => {
        this.props.onCloseModal();

        event.stopPropagation();
    }

    render() {
        const {status, description} = this.props;

        return (        
            <div onClick={this.handleCloseModal} class="modal-overlay">
                <div onClick={(event) => event.stopPropagation()} class="modal-window">
                    <div class="flex-row">
                        <div>{`Status: ${status}`}</div>
                        <div onClick={this.handleCloseModal} class="button-x-big">&#xd7;</div>                    
                    </div>
                    <div>                    
                        <p>{description}</p>
                    </div>
                </div>            
            </div>        
        )
    }    
}