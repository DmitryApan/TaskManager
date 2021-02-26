import React, {Fragment} from 'react';
import {Select} from 'antd';

import {findCardById, getCardsByArrayId, getStatusNameAdditionOfSettings, getStateStatus} from './appFunctions';
import TextEditor from './components/TextEditor/TextEditor';
import HeapAvatars from './components/HeapAvatars/HeapAvatars';
import ListChildrenCard from './components/ListChildrenCard/ListChildrenCard';
import SelectorChilds from './components/SelectorChilds/SelectorChilds';
import Breadcrumbs from './components/Breadcrumbs/Breadcrumbs';

import './App.css';

export default class CardInfo extends React.Component {

    handleChangeDescription = (description) => {
        this.props.changeCardDescription(this.props.id, description);
    }

    handleChangeTitle = (title) => {
        this.props.changeCardTitle(this.props.id, title);
    }

    handleChangeStatus = (value) => {
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
        
        return (
            <div>
                {isChanging ? (
                    <Fragment>
                        <Breadcrumbs 
                            cards={cards}
                            cardId={_id}
                            onClick={this.handleOnClickLink}
                        />
                        <div className="card-info-heap-avatar">
                            <HeapAvatars size={46} id={_id} />
                        </div>
                        <div className="card-info-select">
                            <Select
                                value={getStatusNameAdditionOfSettings(status, statuses)}
                                onChange={this.handleChangeStatus}
                                style={{ width: '100%' }}
                            >
                                {statuses.map(status => (
                                    <Select.Option 
                                        key={status.name}
                                        value={status.name}
                                        disabled={!getStateStatus(status.name, statuses)}
                                    >
                                        {status.name}
                                    </Select.Option> 
                                ))}
                            </Select>
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
                            statuses={statuses}
                        />

                        <SelectorChilds 
                            cards={cards} 
                            idParent={_id} 
                            addChilds={this.handleAddChilds}
                            createNewCard={this.handleCreateNewCard}
                        />
                    </Fragment>
                ) : (
                    <div>
                        <p>{`Status: ${status}`}</p>
                        <p>{`Title: ${title}`}</p>
                        <p>{description}</p>
                    </div>
                )}                
            </div>
        )
    }
}