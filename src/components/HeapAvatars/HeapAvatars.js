import React, {useCallback, useState} from 'react';
import {connect} from 'react-redux';

import {findUserById, findCardById, findPossiblyOwners} from '../../appFunctions';
import {deleteCardOwner, addCardOwner} from '../../store/actionsCreators/cards';
import AreaAvatar from '../AreaAvatar/AreaAvatar';
import PlaceholderAvatar from '../PlaceholderAvatar/PlaceholderAvatar';
import ListUserSearch from '../ListUserSearch/ListUserSearch';

import styles from './HeapAvatars.less';

function HeapAvatars(props) {
    const [isShowUserSearch, setShowUserSearch] = useState(false);
    const [isShowAllPosition, setShowAllPosition] = useState(false);

    let {mutable = true, maxShowPosition = 10, id, cards, usersApp, deleteCardOwner, addCardOwner, size} = props;
    let {owners} = findCardById(id, cards);

    let numPosition = owners.length + mutable; 
    let getOwerflowFlag = isShowAllPosition ? false : numPosition > maxShowPosition;
    let getNumShowPosition = getOwerflowFlag ? maxShowPosition : numPosition;
    let getNumShowAvatar = getOwerflowFlag ? getNumShowPosition : owners.length;

    let ownersForShow = owners.slice(0, isShowAllPosition ? owners.length : getNumShowAvatar);

    const handleMouseEnter = useCallback(() => {
        mutable && setShowAllPosition(true);
    }, [setShowAllPosition]);

    const handleMouseLeave = useCallback(() => {
        mutable && setShowAllPosition(false);
    }, [setShowAllPosition]);

    const handleOnClickAddUser = useCallback(() => {
        setShowUserSearch(true);
    }, [setShowUserSearch]);

    const handleOnClickCross = useCallback((idOwner) => {
        deleteCardOwner(id, idOwner);
    }, [deleteCardOwner, id]);    

    const handleOnBlurList = useCallback(() => {
        setShowUserSearch(false);
    }, [setShowUserSearch]);

    const handleSelectUser = useCallback((idOwner) => {
        addCardOwner(id, idOwner);
    }, [addCardOwner, id]);

    const getStyleProperties = useCallback((i) => ({
        marginLeft: +i ? `${-size * 0.3}px` : '0px',
        zIndex: numPosition - i
    }), [numPosition]);

    return (
        <>
            <div className={styles.heap}
                onMouseEnter={handleMouseEnter} 
                onMouseLeave={handleMouseLeave}
            >
                {usersApp && ownersForShow.map((id, i) => {
                    let user = findUserById(id, usersApp);
                    
                    return (
                        user && <div style={getStyleProperties(i)} key={user._id}>
                            <AreaAvatar                                 
                                {...user}
                                size={size}
                                crossOnMouseEnter={mutable && isShowAllPosition}
                                onClickCross={handleOnClickCross}
                            />
                        </div>
                    )
                })}
                {!getOwerflowFlag && mutable &&
                    <div 
                        style={getStyleProperties(owners.length)} 
                        className={styles.position}
                        onClick={handleOnClickAddUser}
                    >
                        <PlaceholderAvatar addUserType={true} size={size} />
                    </div>
                }
                {getOwerflowFlag &&
                    <div className={styles.points}>...</div>
                }
            </div>
            {isShowUserSearch && 
                <div className={styles.search}>
                    <ListUserSearch  
                        onBlurList={handleOnBlurList}
                        onSelectUser={handleSelectUser} 
                        usersOptionSelect={findPossiblyOwners(owners, usersApp)}
                    />
                </div>
            }
        </>
    )
}

const actionCreators = {
    deleteCardOwner,
    addCardOwner
};

export default connect(null, actionCreators)(HeapAvatars);