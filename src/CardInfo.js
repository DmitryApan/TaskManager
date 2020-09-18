import React, {Fragment} from 'react';
import Select from 'react-select';
import TextEditor from './components/TextEditor/TextEditor';
import {Link} from 'react-router-dom';
import HeapAvatars from './components/HeapAvatars/HeapAvatars';
import ListChildrenCard from './components/ListChildrenCard/ListChildrenCard';
import {findCardById, getCardsByArrayId, getParentCardByIdChildren} from './appFunctions';
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
        let {_id, status, title, description, children} = findCardById(id, cards);
        let parent = getParentCardByIdChildren(_id, cards);
        let statusOptions = statuses && statuses.map(value => ({value, label: value}));

        return (
            <div>
                <div>
                    {isChanging
                        ? <Fragment>
                            {parent && <Link to={parent._id}>{parent.title}</Link>}
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
                            <ListChildrenCard childrenCards={getCardsByArrayId(children, cards)} />
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

const actionCreators = {
    changeCardStatus,
    changeCardTitle,
    changeCardDescription
};

const mapStateToProps = state => ({
    cards: state.cards.data,
    statuses: state.statuses.data
});

export default connect(mapStateToProps, actionCreators)(CardInfo);