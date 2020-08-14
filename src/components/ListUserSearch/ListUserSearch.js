import React, { useCallback } from 'react';
import {Select} from 'antd';
import Avatar from '../../Avatar';

import 'antd/dist/antd.css';
import styles from './ListUserSearch.less'

export default function ListUserSearch(props) {
    const {onSelectUser, usersData, owners} = props;
    const {Option} = Select;

    let usersOptionSelect = usersData.filter((userData) => (
        !owners.find(ownerId => userData._id === ownerId)
    ));

    const headerOnBlur = useCallback(() => {
        onSelectUser(null);
    }, [onSelectUser])

    return(
        <Select
            showSearch
            autoFocus
            style={{ width: 200 }}
            placeholder="Select a user"
            optionFilterProp="children"
            onChange={onSelectUser}
            onBlur={headerOnBlur}
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