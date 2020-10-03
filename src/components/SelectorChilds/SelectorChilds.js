import React, {useCallback, useMemo, useState} from 'react'
import {Select, Divider, Input, Button} from 'antd'

import {findAvalibleChildsToAdd, getCardsByArrayTitle} from '../../appFunctions'

import styles from './SelectorChilds.less'

export default function SelectorChilds(props) {
    const {cards, idParent, addChilds, createNewCard} = props;

    const [childs, setChilds] = useState([]);
    const [title, setTitle] = useState('');

    const avalibleChildsToAdd = findAvalibleChildsToAdd(idParent, cards);

    const handleChangeSelectedChilds = useCallback((selectedItems) => {
        setChilds(selectedItems);
    }, [setChilds]);

    const handleChangeTitleNewCard = useCallback(({target}) => {
        setTitle(target.value);
    }, [setTitle]);

    const handleCreateNewCard = useCallback(() => {
        createNewCard({status: 'Open', title});

        setTitle('');
    }, [createNewCard, title, setTitle]);

    const handleAddChilds = useCallback(() => {
        addChilds(getCardsByArrayTitle(childs, cards).map((card => card._id)));

        setChilds([]);
    }, [addChilds, getCardsByArrayTitle, childs, cards, setChilds]);

    const filteredOptions = useMemo(() => (
        avalibleChildsToAdd.filter(card => !childs.includes(card.title))
    ), [avalibleChildsToAdd, childs]);

    return (
        <>
            <Select
                mode="multiple"
                placeholder="Please enter for add childs"
                onChange={handleChangeSelectedChilds}
                className={styles.select}
                value={childs}
                dropdownRender={menu => (
                    <div>
                        {menu}
                        <Divider className={styles.devider} />
                        <div className={styles.createCardField}>
                            <Input 
                                value={title}
                                placeholder="Title for new card..." 
                                onChange={handleChangeTitleNewCard}
                                className={styles.input}
                            />             
                            <Button onClick={handleCreateNewCard} type="primary">
                                + New card
                            </Button>
                        </div>
                    </div>
                )}
            >
                {filteredOptions.map(card => (
                    <Select.Option key={card._id} value={card.title}>
                        {card.title}
                    </Select.Option>
                ))}
            </Select>
            <Button onClick={handleAddChilds} type="primary">
                Add Childs
            </Button>
        </>
    );    
}