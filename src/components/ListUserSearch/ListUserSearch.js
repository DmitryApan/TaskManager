import React from 'react';
import {Select} from 'antd';
import {Avatar} from '../../Avatar';

import 'antd/dist/antd.css';
import styles from './ListUserSearch.less'

export function ListUserSearch(props) {
    const {onSelectUser, usersInfo, owners} = props;
    const {Option} = Select;

    return(
        <Select
            showSearch
            autoFocus
            style={{ width: 200 }}
            placeholder="Select a user"
            optionFilterProp="children"
            onChange={onSelectUser}
            onBlur={() => {onSelectUser(null)}}
            filterOption={(input, option) =>
                option.name.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
        >
            {usersInfo.filter((userInfo) => (
                !owners.find(ownerId => userInfo._id === ownerId)
            )).map((item) => (
                <Option value={item._id} name={item.name || item.email}>
                    <div className={styles.optionClass}>
                        <div className={styles.optionAvatarClass}>
                            <Avatar {...item} />
                        </div>
                        <div className={styles.optionNameClass}>
                            {item.name || item.email}
                        </div>
                    </div>
                </Option>
            ))}
        </Select>
    )
}