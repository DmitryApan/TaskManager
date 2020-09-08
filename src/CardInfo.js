import React, {Fragment} from 'react';
import Select from 'react-select';
import TextEditor from './components/TextEditor/TextEditor';
import HeapAvatars from './components/HeapAvatars/HeapAvatars';
import {findCardById} from './appFunctions';
import {bindActionCreators} from '../node_modules/redux';
import {connect} from 'react-redux';
import {changeCardDescription, changeCardStatus, changeCardTitle} from './store/actionsCreators/cards';

import './App.css';

class CardInfo extends React.Component {
    handleChangeDescription = (description) => {
        this.props.changeCardDescription(this.props.id, description);
    }

    handleChangeTitle = (title) => {
        this.props.changeCardTitle(this.props.id, title);
    }

    handleChangeStatus = ({value}) => {
        this.props.changeCardStatus(this.props.id, value);
    }

    render() {
        let {isChanging, id, cards, statuses} = this.props;        
        let {_id, status, title, description} = findCardById(id, cards);
        let statusOptions = statuses && statuses.map(value => ({value, label: value}));

        return (
            <div>
                <div>
                    {isChanging
                        ? <Fragment>
                            <div class="card-info-heap-avatar">
                                <HeapAvatars id={_id} />
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

const mapDispatchToProps = dispatch => ({
    changeCardStatus: bindActionCreators(changeCardStatus, dispatch),
    changeCardTitle: bindActionCreators(changeCardTitle, dispatch),
    changeCardDescription: bindActionCreators(changeCardDescription, dispatch)
});

const mapStateToProps = state => ({
    cards: state.cards.data,
    statuses: state.statuses.data
});

export default connect(mapStateToProps, mapDispatchToProps)(CardInfo);