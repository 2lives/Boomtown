import React from 'react';
import ItemCardList from '../../components/itemCardList';

const Items = props => {
    return (
        <div>
            <ItemCardList
                itemsData={props.itemsData}
                itemFilters={props.itemFilters}
            />
        </div>
    );
};

export default Items;
