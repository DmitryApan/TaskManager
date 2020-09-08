import React, { useState, useCallback } from 'react';
import {bindActionCreators} from '../node_modules/redux';
import {connect} from 'react-redux';
import {addCard} from './store/actionsCreators/cards';

import './App.css';

function CreatePanel(props) {
    const {addCard, status} = props;

    const [title, setTitle] = useState();
    const [description, setDescription] = useState();

    const handleChangeTitle = useCallback(({target}) => {
        setTitle(target.value);
    }, [setTitle]);
    const handleChangeDescription = useCallback(({target}) => {
        setDescription(target.value);
    }, [setDescription]);
    const handleCreateCrad = useCallback(() => {
        addCard({
            title, 
            description,
            status
        });
    }, [addCard, status, title, description]);

    return (
        <div class="create-panel-body">
            <div>Creating new card...</div>
            <div>
                <div>Title:</div>
                <textarea onChange={handleChangeTitle} name="title"></textarea>
            </div>
            <div>
                <div>Description:</div>
                <textarea onChange={handleChangeDescription} name="description"></textarea>
            </div>
            <button onClick={handleCreateCrad} type="submit">Create</button>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    addCard: bindActionCreators(addCard, dispatch)
});

export default connect(null, mapDispatchToProps)(CreatePanel);