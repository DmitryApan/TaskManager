import React from 'react';

import styles from './PlaceholderAvatar.less';

export function PlaceholderAvatar(props) {
    let {addUserType} = props;

    var classNames = require('classnames/bind');
    var cx = classNames.bind(styles);

    var headClass = cx({
        borderGrey: addUserType
    }, styles.symbolHead);

    var shouldersClass = cx({
        borderGrey: addUserType
    }, styles.symbolShoulders);

    var borderPlaceholder = cx({
        borderPlaceholderAddUser: addUserType
    }, styles.borderPlaceholder);

    return (
        <div className={borderPlaceholder}>
            <div className={headClass} />
            <div className={shouldersClass} />
            {addUserType && 
                <div className={styles.outerPlusClass}>
                    <div className={styles.innerPlusClass}>&nbsp;+&nbsp;</div>
                </div>
            }
        </div>
    )
}