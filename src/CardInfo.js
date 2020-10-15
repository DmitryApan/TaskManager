import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import Select from 'react-select';
import {Link} from 'react-router-dom';

import {changeCardDescription, changeCardStatus, changeCardTitle, changeCardChildren, addCard} from './store/actionsCreators/cards';
import {findCardById, getCardsByArrayId, getParentCardByIdChildren} from './appFunctions';
import TextEditor from './components/TextEditor/TextEditor';
import HeapAvatars from './components/HeapAvatars/HeapAvatars';
import ListChildrenCard from './components/ListChildrenCard/ListChildrenCard';
import SelectorChilds from './components/SelectorChilds/SelectorChilds';

import './App.css';

export default class CardInfo extends React.Component {

    handleChangeDescription = (description) => {
        this.props.changeCardDescription(this.props.id, description);
    }

    handleChangeTitle = (title) => {
        this.props.changeCardTitle(this.props.id, title);
    }

    handleChangeStatus = ({value}) => {
        this.props.changeCardStatus(this.props.id, value);
    }

    handleOnClickLink = ({target}) => {
        this.props.onRedirect(target.attributes.getNamedItem('parentId').value);
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
        const {isChanging, id, cards, statuses, onRedirect} = this.props;      
        const {_id, status, title, description, children} = findCardById(id, cards);
        const parent = getParentCardByIdChildren(_id, cards);
        let statusOptions = statuses && statuses.map(value => ({value, label: value}));

        return (
            <div>
                {isChanging
                    ? (<Fragment>
                        {parent && (
                            <Link 
                                parentId={parent._id} 
                                onClick={this.handleOnClickLink}
                            >
                                {parent.title}
                            </Link>
                        )}
                        <div class="card-info-heap-avatar">
                            <HeapAvatars size={46} id={_id} />
                        </div>
                        <div class="card-info-select">
                            <Select
                                value={{value: status, label: status}}
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
                        <ListChildrenCard 
                            childrenCards={getCardsByArrayId(children, cards)}
                            onRedirect={onRedirect}
                        />

                        <SelectorChilds 
                            cards={cards} 
                            idParent={_id} 
                            addChilds={this.handleAddChilds}
                            createNewCard={this.handleCreateNewCard}
                        />
                    </Fragment>)
                    : (<div>
                        <p>{`Status: ${status}`}</p>
                        <p>{`Title: ${title}`}</p>
                        <p>{description}</p>
                    </div>)                               
                }                
            </div>
        )
    }
}