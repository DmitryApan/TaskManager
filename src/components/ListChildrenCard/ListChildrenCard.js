import React from 'react';

export default function ListChildrenCard(props) {
    const {childrenCards} = props;

    return(
        <>
            {childrenCards.map(card => {
                return(
                    <div>{card.title}</div>
                );
            })}
        </>
    )
}