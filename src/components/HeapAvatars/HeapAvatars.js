import React, {useCallback, useState} from 'react';
import {findUserById} from '../../appFunctions';
import AreaAvatar from '../AreaAvatar/AreaAvatar';
import PlaceholderAvatar from '../PlaceholderAvatar/PlaceholderAvatar';
import ListUserSearch from '../ListUserSearch/ListUserSearch';

import styles from './HeapAvatars.less';

export default function HeapAvatars(props) {
    let {mutable = true, maxShowPosition = 10, owners, usersData, onChangeHeap} = props;

    let numPosition = owners.length + mutable;                                         
    let owerflowFlag = numPosition > maxShowPosition;                                     
    let numShowPosition = owerflowFlag ? maxShowPosition : numPosition;                   
    let numShowAvatar = owerflowFlag ? numShowPosition : owners.length; 

    const [isShowUserSearch, setShowUserSearch] = useState(false);
    const [isShowAllPosition, setShowAllPosition] = useState(!owerflowFlag);

    let ownersForShow = owners.slice(0, isShowAllPosition ? owners.length : numShowAvatar);
    
    const handleOnClickAddUser = useCallback(() => {
        setShowUserSearch(true);
    }, [isShowUserSearch])

    const handleMouseEnter = useCallback(() => {
        setShowAllPosition(true);
    }, [isShowAllPosition])

    const handleOnClickCross = useCallback((id) => {
        id && onChangeHeap(owners.filter(item => item !== id));
    }, [owners])    

    const handleMouseLeave = useCallback(() => {
        owerflowFlag && setShowAllPosition(false);
    }, [mutable, owerflowFlag, isShowAllPosition])

    const handleSelectUser = useCallback((id) => {
        id && onChangeHeap([...owners, id]);

        setShowUserSearch(false);
    }, [owners, isShowUserSearch])

    let i = 0;
    const divStyle = useCallback(() => ({
        left: `${i++ * 70}%`,
        zIndex: numPosition - i
    }))    

    return (
        <>
            <div className={styles.heap} 
                onMouseEnter={mutable && handleMouseEnter} 
                onMouseLeave={mutable && handleMouseLeave}
            >
                {ownersForShow.map((item) => {
                    return (
                        <div style={divStyle()} className={styles.position}>
                            <AreaAvatar 
                                {...findUserById(item, usersData)}
                                crossOnMouseEnter={mutable && isShowAllPosition}
                                onClickCross={handleOnClickCross}
                            />
                        </div>
                    )
                })}
                {isShowAllPosition && mutable &&
                    <div 
                        style={divStyle()} 
                        className={styles.position}
                        onClick={handleOnClickAddUser}
                    >
                        <PlaceholderAvatar addUserType={true} />
                    </div>
                }
                {!isShowAllPosition &&
                    <div className={styles.points} style={divStyle()}>...</div>
                }
            </div>
            <div className={styles.search}>
                {isShowUserSearch && 
                    <ListUserSearch
                        onSelectUser={handleSelectUser}
                        usersData={usersData}
                        owners={owners}
                    />
                }
            </div>
        </>
    )
}