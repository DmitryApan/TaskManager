import React, {useState, useCallback} from 'react';
import {useDispatch} from 'react-redux';

import {addCard} from './store/actionsCreators/cards';

import './App.css';

export default function CreatePanel(props) {
    const {status} = props;

    const [title, setTitle] = useState();
    const [description, setDescription] = useState();

    const dispatch = useDispatch();

    const handleChangeTitle = useCallback(({target}) => {
        setTitle(target.value);
    }, [setTitle]);

    const handleChangeDescription = useCallback(({target}) => {
        setDescription(target.value);
    }, [setDescription]);
    
    const handleCreateCard = useCallback(() => {
        dispatch(addCard({
            title, 
            description,
            status
        }));
    }, [addCard, dispatch, status, title, description]);

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
            <button onClick={handleCreateCard} type="submit">Create</button>
        </div>
    )
}