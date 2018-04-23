import React, { component } from 'react';
import ItemCardList from '../../components/itemCardList';

const Items = props => {
    return (
        <div>
            <ItemCardList itemsData={props.itemsData} />
        </div>
    );
};

export default Items;
