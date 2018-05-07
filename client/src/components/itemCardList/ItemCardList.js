import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import PropTypes from 'prop-types';
import ItemCard from '../itemCard';
import Masonry from 'react-masonry-component';

const masonryOptions = {
    transitionDuration: '0.5s',
    columnwidth: 350,
    horizontalOrder: true,
    gutter: 20,
    itemSelector: '.grid-item',
    columnWidth: '.grid-item'
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
            {props.itemFilters.length !== 0
                ? props.itemFilters.map(filter => {
                      const filteredItems = props.itemsData.filter(item =>
                          item.tags.includes(filter)
                      );
                      return filteredItems.map((item, index) => (
                          <li
                              key={index}
                              className={'grid-item'}
                              style={style.li}
                          >
                              <ItemCard itemsData={item} />
                          </li>
                      ));
                  })
                : props.itemsData.map((item, index) => (
                      <li key={index} className={'grid-item'} style={style.li}>
                          <ItemCard itemsData={item} />
                      </li>
                  ))}
        </Masonry>
    );
};

export default ItemCardList;
