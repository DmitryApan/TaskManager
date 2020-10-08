import React, { useCallback } from 'react';
import {Tooltip} from 'antd';

import {getColorByStatus} from '../../appFunctions';
import HeapAvatars from '../HeapAvatars/HeapAvatars';

import styles from './ListChildrenCard.less';

export default function ListChildrenCard(props) {
    const {childrenCards} = props;

    const getStyleColorSquare = useCallback((status) => ({
        backgroundColor: getColorByStatus(status)
    }), [getColorByStatus])

    return(
        <>
            {childrenCards.map(card => {
                return(
                    <div className={styles.child}>
                        <Tooltip 
                            title={card.status} 
                            placement="right"
                        >
                            <div 
                                className={styles.square}
                                style={getStyleColorSquare(card.status)}
                            />
                        </Tooltip>
                        <div className={styles.owners}>
                            <HeapAvatars 
                                size={28}
                                mutable={false}
                                maxShowPosition={3}
                                id={card._id}
                            />
                        </div>
                        <div>                           
                            <span>{card.title}</span>
                        </div>
                    </div>
                );
            })}
        </>
    )
}