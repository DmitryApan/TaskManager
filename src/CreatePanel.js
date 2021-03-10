import React, {useState, useCallback} from 'react';

import './App.css';

export default function CreatePanel(props) {
    const {status, onCreateNewCard} = props;

    const [title, setTitle] = useState();
    const [description, setDescription] = useState();

    const handleChangeTitle = useCallback(({target}) => {
        setTitle(target.value);
    }, [setTitle]);

    const handleChangeDescription = useCallback(({target}) => {
        setDescription(target.value);
    }, [setDescription]);
    
    const handleCreateCard = useCallback(() => {
        onCreateNewCard({
            title, 
            description,
            status
        });

        setTitle('');
        setDescription('');

    }, [onCreateNewCard, status, title, description, setTitle, setDescription]);

    return (
        <div className="create-panel-body">
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