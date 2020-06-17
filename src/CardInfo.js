import React, { Fragment } from 'react';
import Select from 'react-select';

import './App.css';
import { TextEditor } from './TextEditor';

export class CardInfo extends React.Component {
    handleChangeDescription = (description) => {
        const {onChangeDescription, card} = this.props;

        onChangeDescription(description, card);        
    }

    handleChangeStatus = ({value}) => {
        const {onChangeStatus, card} = this.props;

        onChangeStatus(value, card);        
    }

    render() {
        let {mutableCard, statuses, card} = this.props;  
        let {status, description} = card;

        let statusOptions = statuses && statuses.map(value => ({value, label: value}));

        return (
            <div>
                <div>
                    {mutableCard                        
                        ? <Fragment> 
                            <Select
                                defaultValue={{value: status, label: status}}
                                options={statusOptions}                            
                                onChange={this.handleChangeStatus}
                            />
                            <TextEditor
                                text={description}
                                onChangeText={this.handleChangeDescription}
                            />
                        </Fragment>
                        : <div>
                            <p>{`Status: ${status}`}</p>
                            <p>{description}</p>
                        </div>                        
                    }
                </div>                             
            </div>
        )
    }
}