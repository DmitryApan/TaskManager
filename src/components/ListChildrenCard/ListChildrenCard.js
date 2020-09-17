import React from 'react';
import {Tooltip} from 'antd';

export default function ListChildrenCard(props) {
    const {childrenCards} = props;

    return(
        <>
            {childrenCards.map(card => {
                return(
                    <Tooltip title={card.status} placement="right">
                        <span>{card.title}</span>
                        <br />
                    </Tooltip>
                );
            })}
        </>
    )
}