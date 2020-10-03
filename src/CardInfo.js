import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import Select from 'react-select';
import {Link} from 'react-router-dom';

import TextEditor from './components/TextEditor/TextEditor';
import HeapAvatars from './components/HeapAvatars/HeapAvatars';
import ListChildrenCard from './components/ListChildrenCard/ListChildrenCard';
import SelectorChilds from './components/SelectorChilds/SelectorChilds';
import {findCardById, getCardsByArrayId, getParentCardByIdChildren} from './appFunctions';
import {changeCardDescription, changeCardStatus, changeCardTitle, changeCardChildren, addCard} from './store/actionsCreators/cards';

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

    handleAddChilds = (arrayId) => {
        this.props.changeCardChildren(this.props.id, [
            ...findCardById(this.props.id, this.props.cards).children,
            ...arrayId
        ])
    }

    handleCreateNewCard = (card) => {
        this.props.addCard(card);
    }

    render() {
        let {isChanging, id, cards, statuses} = this.props;        
        let {status, title, description, children} = findCardById(id, cards);
        let parent = getParentCardByIdChildren(id, cards);
        let statusOptions = statuses && statuses.map(value => ({value, label: value}));

        return (
            <div>
                <div>
                    {isChanging
                        ? <Fragment>
                            {parent && <Link to={parent._id}>{parent.title}</Link>}
                            <div class="card-info-heap-avatar">
                                <HeapAvatars size={46} id={id} />
                            </div>
                            <div class="card-info-select">
                                <Select
                                    defaultValue={{value: status, label: status}}
                                    options={statusOptions}
                                    onChange={this.handleChangeStatus}
                                />
                            </div>
                            <TextEditor
                                text={title}
                                onChangeText={this.handleChangeTitle}
                            />
                            <TextEditor
                                text={description}
                                onChangeText={this.handleChangeDescription}
                            />
                            <ListChildrenCard childrenCards={getCardsByArrayId(children, cards)} />
                            <SelectorChilds 
                                cards={cards} 
                                idParent={id} 
                                addChilds={this.handleAddChilds}
                                createNewCard={this.handleCreateNewCard}
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

const mapStateToProps = state => ({
    cards: state.cards.data,
    statuses: state.statuses.data
});

const mapDispatchToProps = {
    changeCardStatus,
    changeCardTitle,
    changeCardDescription,
    changeCardChildren,
    addCard
};

export default connect(mapStateToProps, mapDispatchToProps)(CardInfo);