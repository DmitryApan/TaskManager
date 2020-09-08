import React from 'react';
import {Select} from 'antd';
import Avatar from '../../Avatar';
import {connect} from 'react-redux';
import 'antd/dist/antd.css';
import styles from './ListUserSearch.less'
import {findCardById} from '../../appFunctions';

function ListUserSearch(props) {
    const {onSelectUser, onBlurList, usersApp, cards, id} = props;
    const {owners} = findCardById(id, cards);
    const {Option} = Select;

    let usersOptionSelect = usersApp.filter((user) => (
        !owners.find(idOwner => user._id === idOwner)
    ));

    return(
        <Select
            showSearch
            autoFocus
            style={{ width: 200 }}
            placeholder="Select a user"
            optionFilterProp="children"
            onChange={onSelectUser}
            onBlur={onBlurList}
            filterOption={(input, option) =>
                option.name.toLowerCase().includes(input.toLowerCase())
            }
        >
            {usersOptionSelect.map((item) => (
                <Option 
                    key={item._id}
                    value={item._id} 
                    name={item.name || item.email}                    
                >
                    <div className={styles.option}>
                        <div className={styles.optionAvatar}>
                            <Avatar {...item} />
                        </div>
                        <div className={styles.optionName}>
                            {item.name || item.email}
                        </div>
                    </div>
                </Option>
            ))}
        </Select>
    )
}

const mapStateToProps = state => ({
    usersApp: state.usersApp.data,
    cards: state.cards.data
})

export default connect(mapStateToProps, null)(ListUserSearch);