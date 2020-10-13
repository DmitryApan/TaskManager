import React, {Fragment, useCallback, useState, useMemo} from 'react';
import cn from 'classnames';

import styles from './TextEditor.less';

export default function TextEditor(props) {
 
    const {text, onChangeText, asterisk, placeholder = 'Please enter...'} = props;

    const [isEditing, setEditing] = useState(false);
    const [textEdit, setText] = useState(text);

    const handleChangeText = useCallback(({target}) => {
        setText(target.value);
    }, [setText]);

    const handleChangeButton = useCallback(() => {
        setEditing(true);
    }, [setEditing]);
    
    const handleCancelButton = useCallback(() => {
        setText(text);        
        setEditing(false);
    }, [setText, text, setEditing]);

    const handleSaveButton = useCallback(() => {
        onChangeText(textEdit);

        setEditing(false);
    }, [onChangeText, setEditing, textEdit]);
        
    const showText = useMemo(() => {
        if (!text) {
            return placeholder;
        }
        else {
            return asterisk ? text.replace(/./g, "*") : text;         
        }
    }, [text, placeholder, asterisk]);

    const textStyle = cn([(!text) && styles.textPlaceholder]);

    return (
        <div className={styles.flexRow}>
            <div className={styles.textEditor}>
                {isEditing
                    ? <textarea onChange={handleChangeText}>
                        {text}
                    </textarea>
                    : <div className={textStyle}>
                        {showText}
                    </div>
                }
            </div>
            <div>
                {isEditing
                    ? <Fragment>
                        <button onClick={handleSaveButton}>Save</button>
                        <button onClick={handleCancelButton}>Cancel</button>
                    </Fragment>
                    : <button onClick={handleChangeButton}>Edit</button>
                }
            </div>
        </div>
    )
}