import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import PropTypes from 'prop-types';
import ItemCard from '../itemCard';
import Masonry from 'react-masonry-component';

const masonryOptions = {
    transitionDuration: 0,
    columnwidth: 350,
    gutter: 20
};

const style = {
    width: '100vw',
    li: {
        width: '350px',
        marginBottom: '20px'
    }
};

const ItemCardList = props => {
    return (
        <Masonry style={style} options={masonryOptions} elementType={'ul'}>
            {props.itemsData.map((item, index) => (
                <li key={index} style={style.li}>
                    <ItemCard itemsData={item} />
                </li>
            ))}
        </Masonry>
    );
};

export default ItemCardList;
