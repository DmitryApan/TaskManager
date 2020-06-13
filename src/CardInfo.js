import React, { Fragment } from 'react';
import Select from 'react-select';

import './App.css';
import { TextEditor } from './TextEditor';

export class CardInfo extends React.Component {
    handleChangeDescription = async(description) => {
        const {onChangeCard, card} = this.props;

        let changeCard = {
            ...card,            
            description
        }        
        
        await onChangeCard(changeCard, card);        
    }

    handleChangeStatus = async(event) => {
        const {onChangeCard, card} = this.props;

        let changeCard = {
            ...card,
            status: event.value            
        }        
        
        await onChangeCard(changeCard, card);        
    }

    render() {
        let {changeDescription, statuses} = this.props;  
        let {status, description} = this.props.card;

        let statusOptions = statuses && statuses.map(value => ({value, label: value}));

        return (
            <div>
                <div>
                    {changeDescription                        
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