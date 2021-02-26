import React from 'react';

import './App.css';

export default class Modal extends React.Component {
    handleCloseModal = (event) => {
        this.props.onCloseModal();

        event.stopPropagation();
    }

    render() {
        return (        
            <div onClick={this.handleCloseModal} className="modal-overlay">
                <div onClick={(event) => event.stopPropagation()} className="modal-window">
                    <div className="flex-row">                        
                        <div onClick={this.handleCloseModal} className="button-x-big">&#xd7;</div>                    
                    </div>                    
                    {this.props.children()}
                </div>            
            </div>        
        )
    }    
}