import React, {useCallback} from 'react';
import cn from 'classnames';

import styles from './PlaceholderAvatar.less';

export default function PlaceholderAvatar(props) {
    let {addUserType, size} = props;

    let headClass = cn([styles.symbolHead, addUserType && styles.borderGrey]);

    var shouldersClass = cn({
        [styles.borderGrey]: addUserType
    }, styles.symbolShoulders);

    var borderPlaceholderClass = cn({
        [styles.borderPlaceholderAddUser]: addUserType
    }, styles.borderPlaceholder);

    const getStylePlaceholder = useCallback(() => ({
        height: `${size}px`, 
        width: `${size}px`
    }), [size]);

    return (
        <div 
            className={borderPlaceholderClass} 
            style={getStylePlaceholder()}
        >
            <div className={headClass} />
            <div className={shouldersClass} />
            {addUserType && 
                <div className={styles.outerPlus}>
                    <div className={styles.verticalPlus} />
                    <div className={styles.horizontPlus} />
                </div>
            }
        </div>
    )
}