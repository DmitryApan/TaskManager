import React, {useState, useCallback, useMemo} from 'react';
import cn from 'classnames';
import Avatar from '../../Avatar';

import styles from './AreaAvatar.less';

export default function AreaAvatar(props) {
    let {_id, avatar, onClickAvatar, onClickCross, crossOnMouseEnter, size} = props;

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

    const getStyleAvatar = useMemo(() => ({
        height: `${size}px`, 
        width: `${size}px`,
        fontSize: `${size * 0.4}px`
    }), [size]);

    const getStyleCross = useMemo(() => ({
        height: `${size * 0.35}px`, 
        width: `${size * 0.35}px`,
    }), [size]);

    return (
        <div 
            className={styles.area}
            onMouseEnter={onMouseEnterArea}
            onMouseLeave={onMouseLeaveArea}
        >
            <div 
                onClick={onClickAvatarArea} 
                className={avatarClass}
                style={getStyleAvatar}
            >
                <Avatar {...props} key={avatar} />
            </div>
            {crossOnMouseEnter && isShowCross &&
                <div 
                    className={styles.outerCross} 
                    onClick={onClickCrossArea}
                    style={getStyleCross}
                >
                    <div className={styles.verticalCross} />
                    <div className={styles.horizontalCross} />
                </div>
            }
        </div>
    )
}