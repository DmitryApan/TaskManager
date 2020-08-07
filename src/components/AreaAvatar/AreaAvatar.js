import React, {useCallback, useState} from 'react';
import cn from 'classnames';
import Avatar from '../../Avatar';

import styles from './AreaAvatar.less';

export default function AreaAvatar(props) {
    let {_id, avatar, onClickAvatar, onClickCross, crossOnMouseEnter} = props;

    var avatarClass = cn({
        [styles.cursorPointer]: onClickAvatar
    }, styles.avatar)

    const [isShowCross, setShowCross] = useState(false);

    const onMouseEnterArea = useCallback(() => {
        setShowCross(true);
    }, [isShowCross]);

    const onMouseLeaveArea = useCallback(() => {
        setShowCross(false);
    }, [isShowCross]);

    const onClickAvatarArea = useCallback(() => {
        onClickAvatar && onClickAvatar(_id);
    });

    const onClickCrossArea = useCallback((event) => {
        onClickCross(_id);

        event.stopPropagation();
    });

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