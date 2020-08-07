import React from 'react';
import cn from 'classnames';

import styles from './PlaceholderAvatar.less';

export default function PlaceholderAvatar(props) {
    let {addUserType} = props;

    var headClass = cn({
        [styles.borderGrey]: addUserType
    }, styles.symbolHead);

    var shouldersClass = cn({
        [styles.borderGrey]: addUserType
    }, styles.symbolShoulders);

    var borderPlaceholderClass = cn({
        [styles.borderPlaceholderAddUser]: addUserType
    }, styles.borderPlaceholder);

    return (
        <div className={borderPlaceholderClass}>
            <div className={headClass} />
            <div className={shouldersClass} />
            {addUserType && 
                <div className={styles.outerPlus}>
                    <div className={styles.innerPlus}>&nbsp;+&nbsp;</div>
                </div>
            }
        </div>
    )
}