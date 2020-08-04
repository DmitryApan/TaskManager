import React, {useCallback, useState} from 'react';
import {findUserById} from '../../appFunctions';
import {AreaAvatar} from '../AreaAvatar/AreaAvatar';
import {PlaceholderAvatar} from '../PlaceholderAvatar/PlaceholderAvatar';
import {ListUserSearch} from '../ListUserSearch/ListUserSearch';

import styles from './HeapAvatars.less';

export function HeapAvatars(props) {
    let {changeable = true, maxShowPosition = 10, owners, usersInfo, onChangeHeap} = props;

    let numPosition = owners.length + changeable;                                         
    let owerflowFlag = numPosition > maxShowPosition;                                     
    let numShowPosition = owerflowFlag ? maxShowPosition : numPosition;                   
    let numShowAvatar = owerflowFlag ? numShowPosition : owners.length;                   

    const [isShowUserSearch, setShowUserSearch] = useState(false);
    const [isShowAllPosition, setShowAllPosition] = useState(!owerflowFlag);
    
    const handleOnClickPosition = useCallback((id) => {
    
    })

    const handleOnClickAddUser = useCallback(() => {
        setShowUserSearch(true);
    })

    const handleOnClickCross = useCallback((id) => {
        id && onChangeHeap(owners.filter(item => item !== id));
    }, [owners])

    const handleMouseEnter = useCallback(() => {
        setShowAllPosition(true);
    }, [changeable])

    const handleMouseLeave = useCallback(() => {
        owerflowFlag && setShowAllPosition(false);
    }, [changeable, owerflowFlag])

    const handleSelectUser = useCallback((id) => {
        id && onChangeHeap([...owners, id]);

        setShowUserSearch(false);
    }, [owners])

    let i = 0;

    return (
        <>
            <div className={styles.heapClass} 
                onMouseEnter={changeable && handleMouseEnter} 
                onMouseLeave={changeable && handleMouseLeave}
            >
                {owners.slice(0, isShowAllPosition ? owners.length : numShowAvatar).map((item) => {
                    const divStyle = {left: `${i++ * 70}%`, zIndex: numPosition - i}

                    return (
                        <div 
                            style={divStyle} 
                            className={styles.positionClass}
                        >
                            <AreaAvatar 
                                {...findUserById(item, usersInfo)}
                                crossOnMouseEnter={changeable && isShowAllPosition}
                                onClickAvatar={changeable ? handleOnClickPosition : null}
                                onClickCross={handleOnClickCross}
                            />
                        </div>
                    )
                })}
                {isShowAllPosition && changeable &&
                    <div 
                        style={{left: `${i++ * 70}%`, zIndex: numPosition - i}} 
                        className={styles.positionClass}
                        onClick={handleOnClickAddUser}
                    >
                        <PlaceholderAvatar addUserType={true} />
                    </div>
                }
                {!isShowAllPosition &&
                    <div 
                        className={styles.pointsClass} 
                        style={{left: `${i++ * 70}%`, zIndex: numPosition - i}}
                    >...</div>
                }
            </div>
            <div className={styles.searchClass}>
                {isShowUserSearch && 
                    <ListUserSearch
                        onSelectUser={handleSelectUser}
                        usersInfo={usersInfo}
                        owners={owners}
                    />
                }
            </div>
        </>
    )
}