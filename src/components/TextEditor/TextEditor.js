import React, {Fragment} from 'react';

import styles from './TextEditor.less';

export class TextEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditing: false,
            text: props.text
        }
    }

    handleChangeText = (event) => {
        this.setState({
            text: event.target.value
        });
    }

    handleChangeButton = () => {
        this.setState({
            isEditing: true
        });
    }

    handleCancelButton = () => {
        this.setState({
            isEditing: false,
            text: this.props.text
        });
    }

    handleSaveButton = () => {
        const {onChangeText} = this.props;
        const {text} = this.state;

        onChangeText(text);

        this.setState({
            isEditing: false
        });
    }

    render() {
        const {isEditing, text} = this.state;
        let {asterisk, placeholder} = this.props;
        
        let showText = ((text === '') ? placeholder : text); 
        showText = asterisk ? showText.replace(/./g, "*") : showText;
        showText = (text === '') 
            ? <div class='text-placeholder'>
                {showText}
            </div>
            : showText;

        return (
            <div class="flex-row">
                <div class="text-editor">
                    {isEditing
                        ? <textarea onChange={this.handleChangeText}>{text}</textarea>
                        : showText
                    }
                </div>
                <div className={styles.testClass}>
                    {isEditing
                        ? <Fragment>
                            <button onClick={this.handleSaveButton}>Save</button>
                            <button onClick={this.handleCancelButton}>Cancel</button>
                        </Fragment>
                        : <button onClick={this.handleChangeButton}>Edit</button>
                    }
                </div>
            </div>
        )
    }
}