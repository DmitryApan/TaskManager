import React, { Fragment } from 'react';

import './App.css';

export class CardInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditing: false,            
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
            isEditing: false
        });
    }

    handleCancelButton = (event) => {
        this.setState({
            description: this.props.description,
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
                    {changeDescription && 
                    <div>
                        {isEditing 
                            ? <Fragment>
                                <button onClick={this.handleSaveButton}>Save</button> 
                                <button onClick={this.handleCancelButton}>Cancel</button>
                            </Fragment>
                            : <button onClick={this.handleChangeButton}>Edit</button>
                        }
                    </div>}
                </div>            
            </div>
        )
    }
}