import React from 'react';
import {Link} from 'react-router-dom';
import {Breadcrumb} from 'antd';

import {getParentCardArrayByIdChildren} from '../../appFunctions';

export default function Breadcrumbs({onClick, cardId, cards}) {
    const parentArray = getParentCardArrayByIdChildren(cardId, cards);

    return (
        <Breadcrumb>
            {parentArray.map(parent => (
                <Breadcrumb.Item
                    key={parent._id}
                >
                    <Link 
                        parentId={parent._id} 
                        onClick={onClick}
                    >
                        {parent.title}
                    </Link>
                </Breadcrumb.Item>
            ))}
        </Breadcrumb>
    )
}