import React from 'react';
import {Link} from 'react-router-dom';
import {Breadcrumb} from 'antd';

import {getParentCardArrayByIdChildren} from '../../appFunctions';

export default function UserBreadcrumb(props) {

    const {onClick, cardId, cards} = props;
    const parentArray = getParentCardArrayByIdChildren(cardId, cards);

    return (
        <Breadcrumb>
            {parentArray.map(parent => (
                <Breadcrumb.Item>
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