import React from 'react';
import './App.css';

export class CardAddPanel extends React.Component {
    constructor(props) {
        super(props);        
        this.state = {description: ''};
    }

    handleDescriptionChange = ({target}) =>  {
        this.setState({description: target.value})
    }

    handleCreate = (event) => {
        this.props.onCreateCard(this.state.description);
        
        this.setState({description: ''})
    }

    handleInputKeyPress = (event) => {
        if (event.key === 'Enter') {
            this.handleCreate();
        }
    }

    render() {
        return (
            <div>
                <input type="text" value={this.state.description} onChange={this.handleDescriptionChange} onKeyPress={this.handleInputKeyPress} />
                <button onClick={this.handleCreate}>Create</button> 
            </div>           
        );
    }
}