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

    let {mutable = true, maxShowPosition = 10, id, cards, usersApp, deleteCardOwner, addCardOwner} = props;
    let {owners} = findCardById(id, cards);

    let numPosition = owners.length + mutable; 
    let getOwerflowFlag = isShowAllPosition ? false : numPosition > maxShowPosition;
    let getNumShowPosition = getOwerflowFlag ? maxShowPosition : numPosition;
    let getNumShowAvatar = getOwerflowFlag ? getNumShowPosition : owners.length;

    let ownersForShow = owners.slice(0, isShowAllPosition ? owners.length : getNumShowAvatar);

    const handleMouseEnter = useCallback(() => {
        setShowAllPosition(true);
    }, [setShowAllPosition]);

    const handleMouseLeave = useCallback(() => {
        setShowAllPosition(false);
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
        //left: `${i++ * 70}%`,
        marginLeft: `${i++ * 70}%`,
        zIndex: numPosition - i
    }), [numPosition]);

    return (
        <>
            <div className={styles.heap} 
                onMouseEnter={mutable && handleMouseEnter} 
                onMouseLeave={mutable && handleMouseLeave}
            >
                {usersApp && ownersForShow.map((id, i) => {
                    let user = findUserById(id, usersApp);
                    
                    return (
                        <div 
                            style={getStyleProperties(i)} 
                            className={styles.position}
                        >
                            <AreaAvatar 
                                key={user._id}
                                {...user}
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
                        <PlaceholderAvatar addUserType={true} />
                    </div>
                }
                {getOwerflowFlag &&
                    <div 
                        className={styles.points} 
                        style={getStyleProperties(ownersForShow.length)}
                    >
                        ...
                    </div>
                }
            </div>
            <div className={styles.search}>
                {isShowUserSearch && 
                    <ListUserSearch  
                        onBlurList={handleOnBlurList}
                        onSelectUser={handleSelectUser} 
                        usersOptionSelect={findPossiblyOwners(owners, usersApp)}
                    />
                }
            </div>
        </>
    )
}

const mapStateToProps = state => ({
    cards: state.cards.data,
    usersApp: state.usersApp.data
});

const actionCreators = {
    deleteCardOwner,
    addCardOwner
};

export default connect(mapStateToProps, actionCreators)(HeapAvatars);