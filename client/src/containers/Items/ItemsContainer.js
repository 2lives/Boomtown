import React, { Component } from 'react';
import Items from './Items';
import { connect } from 'react-redux';
import { get_items_and_users } from '../../redux/modules/Items';

class ItemsContainer extends Component {
    componentDidMount = () => {
        this.props.dispatch(get_items_and_users());
    };

    filterItems = itemsData => {
        if (itemsData.itemFilters.length > 0) {
            let filteredItems = itemsData.items.filter(item => {
                return item.tags.filter(
                    tag => itemsData.itemFilters.find(filter => filter === tag) //find the specific tag that the user wants
                ).length;
            });
            return filteredItems;
        }
        return itemsData.items;
    };

    render() {
        return (
            <div>
                {this.props.itemsData.isLoading ? (
                    <p>loading</p>
                ) : (
                    <Items itemsData={this.filterItems(this.props.itemsData)} />
                )}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isLoading: state.itemsData.isLoading,
    itemsData: state.itemsData,
    itemFilters: state.itemsData.itemFilters
});

export default connect(mapStateToProps)(ItemsContainer);
