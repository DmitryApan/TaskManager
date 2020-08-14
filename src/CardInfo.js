import React, {Fragment} from 'react';
import Select from 'react-select';
import TextEditor from './components/TextEditor/TextEditor';
import HeapAvatars from './components/HeapAvatars/HeapAvatars';

import './App.css';

export default class CardInfo extends React.Component {
    handleChangeDescription = (description) => {
        const {onChangeDescription, card} = this.props;

        onChangeDescription(description, card);
    }

    handleChangeTitle = (title) => {
        const {onChangeTitle, card} = this.props;

        onChangeTitle(title, card);
    }

    handleChangeStatus = ({value}) => {
        const {onChangeStatus, card} = this.props;

        onChangeStatus(value, card);
    }

    handleChangeOwners = (owners) => {
        const {onChangeOwners, card} = this.props; 
        
        onChangeOwners(owners, card);
    }

    render() {
        let {isChanging, statuses, card, usersData} = this.props;
        let {status, title, description} = card;

        let statusOptions = statuses && statuses.map(value => ({value, label: value}));

        return (
            <div>
                <div>
                    {isChanging
                        ? <Fragment>
                            <div class="card-info-heap-avatar">
                                <HeapAvatars 
                                    {...card}
                                    usersData={usersData} 
                                    onChangeHeap={this.handleChangeOwners}
                                />
                            </div>
                            <Select
                                defaultValue={{value: status, label: status}}
                                options={statusOptions}
                                onChange={this.handleChangeStatus}
                            />
                            <TextEditor
                                text={title}
                                onChangeText={this.handleChangeTitle}
                            />
                            <TextEditor
                                text={description}
                                onChangeText={this.handleChangeDescription}
                            />
                        </Fragment>
                        : <div>
                            <p>{`Status: ${status}`}</p>
                            <p>{`Title: ${title}`}</p>
                            <p>{description}</p>
                        </div>
                    }
                </div>
            </div>
        )
    }
}
