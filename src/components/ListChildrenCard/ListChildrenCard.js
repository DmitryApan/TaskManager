import React, {useCallback} from 'react';
import HeapAvatars from '../HeapAvatars/HeapAvatars';
import {Tooltip} from 'antd';

import styles from './ListChildrenCard.less';

const STATUS_OPEN = 'Open';
const STATUS_IN_PROGRESS = 'In Progress';
const STATUS_CLOSED = 'Closed';

export default function ListChildrenCard(props) {
    const {childrenCards} = props;

    const getBackgroundColorByStatus = useCallback(status => {
        switch(status) {
            case STATUS_OPEN:
                return {
                    backgroundColor: 'red'
                };

            case STATUS_IN_PROGRESS:
                return {
                    backgroundColor: 'yellow'
                };
            
            case STATUS_CLOSED: 
                return {
                    backgroundColor: 'green'
                };

            default:
                return {
                    backgroundColor: 'grey'
                };
        }
    });

    return(
        <>
            {childrenCards.map(card => {
                return(
                    <div className={styles.child}>
                        <div 
                            className={styles.square}
                            style={getBackgroundColorByStatus(card.status)}
                        />
                        <div className={styles.owners}>
                            <HeapAvatars 
                                size={28}
                                mutable={false}
                                maxShowPosition={3}
                                id={card._id}
                            />
                        </div>
                        <div>
                            <Tooltip 
                                title={card.status} 
                                placement="right"
                            >
                                <span>{card.title}</span>
                            </Tooltip>
                        </div>
                    </div>
                );
            })}
        </>
    )
}