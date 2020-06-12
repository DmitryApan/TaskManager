import React, { Fragment } from 'react';
import Select from 'react-select';

import './App.css';

export class CardInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditing: false,
            status: props.status,            
            description: props.description
        }
    }

    componentDidMount() {
        const {statuses} = this.props;

        let statusOptions = statuses.map(value => ({value, label: value}));

        this.setState({
            statusOptions
        })
    }

    handleChangeButton = (event) => {
        this.setState({
            isEditing: true
        });
    }

    handleSaveButton = async(event) => {
        const {onChangeCard} = this.props;

        let body = {
            status: this.state.status,
            description: this.state.description
        }        
        
        await onChangeCard(body, this.props);       

        this.setState({            
            isEditing: false
        });
    }

    handleCancelButton = (event) => {
        this.setState({
            status: this.props.status,
            description: this.props.description,
            isEditing: false
        });
    }

    handleChangeDescription = (event) => {
        this.setState({
            description: event.target.value
        });        
    }

    handleChangeStatus = (event) => {
        this.setState({
            status: event.value
        });
    }

    render() {
        let {isEditing, description, statusOptions} = this.state;
        let {changeDescription, status} = this.props;        

        return (
            <div>
                <div>
                    {isEditing
                        ? <Select
                            defaultValue={{value: status, label: status}}
                            options={statusOptions}
                            name="status"
                            onChange={this.handleChangeStatus}
                        />
                        : <div>{`Status: ${status}`}</div>
                    }
                </div>                
                <div class="flex-row">
                    <div>
                        {isEditing && changeDescription 
                            ? <textarea name="description" onChange={this.handleChangeDescription}>{description}</textarea>
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