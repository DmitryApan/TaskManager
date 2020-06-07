import React from 'react';

import './App.css';

export class CardInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditing: false,
            oldDescription: props.description,
            description: props.description
        }
    }

    handleChangeButton = (event) => {
        this.setState({
            isEditing: true
        });
    }

    handleSaveButton = async(event) => {
        const {onChangeCard} = this.props;

        let body = {
            description: this.state.description
        }        
        
        await onChangeCard(body, this.props);       

        this.setState({
            oldDescription: this.state.description,
            isEditing: false
        });
    }

    handleCancelButton = (event) => {
        this.setState({
            description: this.state.oldDescription,
            isEditing: false
        });
    }

    handleChangeDescription = (event) => {
        this.setState({
            description: event.target.value
        });        
    }

    render() {
        let {isEditing, description} = this.state;
        let {changeDescription, status} = this.props;        

        return (
            <div> 
                <div>{`Status: ${status}`}</div>
                <div class="flex-row">
                    <div>
                        {isEditing && changeDescription 
                            ? <textarea onChange={this.handleChangeDescription}>{description}</textarea>
                            : description
                        }
                    </div>
                    <div>
                        {changeDescription && (isEditing 
                            ? [
                                <button onClick={this.handleSaveButton}>Save</button>, 
                                <button onClick={this.handleCancelButton}>Cancel</button>
                            ]
                            : <button onClick={this.handleChangeButton}>Edit</button>
                        )}
                    </div>
                </div>            
            </div>
        )
    }
}