import React from 'react';
import './App.css';

export class CardAddPanel extends React.Component {
    constructor(props) {
        super(props);        
        this.state = {title: ''};
    }

    handleTitleChange = ({target}) =>  {
        this.setState({title: target.value})
    }

    handleCreate = (event) => {
        this.props.onCreateCard(this.state.title);
        
        this.setState({title: ''})
    }

    handleInputKeyPress = (event) => {
        if (event.key === 'Enter') {
            this.handleCreate();
        }
    }

    render() {
        return (
            <div>
                <input type="text" value={this.state.title} onChange={this.handleTitleChange} onKeyPress={this.handleInputKeyPress} />
                <button onClick={this.handleCreate}>Create</button> 
            </div>           
        );
    }
}