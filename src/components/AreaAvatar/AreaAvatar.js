import React, {useCallback, useState} from 'react';
import cn from 'classnames';
import Avatar from '../../Avatar';

import styles from './AreaAvatar.less';

export default function AreaAvatar(props) {
    let {_id, avatar, onClickAvatar, onClickCross, crossOnMouseEnter} = props;

    let avatarClass = cn({
        [styles.avatar]: true,
        [styles.cursorPointer]: onClickAvatar
    });

    const [isShowCross, setShowCross] = useState(false);

    const onMouseEnterArea = useCallback(() => {
        setShowCross(true);
    }, [setShowCross]);

    const onMouseLeaveArea = useCallback(() => {
        setShowCross(false);
    }, [setShowCross]);

    const onClickAvatarArea = useCallback(() => {
        onClickAvatar && onClickAvatar(_id);
    }, [onClickAvatar]);

    const onClickCrossArea = useCallback((event) => {
        onClickCross(_id);

        event.stopPropagation();
    }, [onClickCross]);

    return (
        <div 
            onClick={onClickAvatarArea} 
            onMouseEnter={onMouseEnterArea}
            onMouseLeave={onMouseLeaveArea}
            className={avatarClass}
        >
            <Avatar {...props} key={avatar} />
            {crossOnMouseEnter && isShowCross &&
                <div className={styles.outerCross} onClick={onClickCrossArea}>
                    <div className={styles.innerCross}>&times;</div>
                </div>
            }
        </div>
    )
}