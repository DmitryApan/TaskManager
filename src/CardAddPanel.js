import React from 'react';
import './App.css';

export class CardAddPanel extends React.Component {
    constructor(props) {
        super(props);        
        this.state = {description: ""};
    }

    handleDescriptionChange = (event) =>  {
        this.setState({description: event.target.value})
    }

    handleCreate = (event) => {
        this.props.onCreateCard(this.state.description);
        
        event.preventDefault();        
    }

    render() {
        return (
            <div>
                <input type="text" value={this.state.description} onChange={this.handleDescriptionChange} />
                <button onClick={this.handleCreate}>Create</button> 
            </div>           
        );
    }
}