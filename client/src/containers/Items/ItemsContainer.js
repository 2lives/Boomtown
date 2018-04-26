import React, { Component } from 'react';
import Items from './Items';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const fetchItems = gql`
    query fetchItems {
        items {
            title
            description
            imageurl
            tags
            itemowner {
                id
                fullname
                email
            }
            created
            available
            borrower {
                id
                fullname
                email
            }
        }
    }
`;

class ItemsContainer extends Component {
    //     filterItems = itemsData => {
    //         if (itemsData.itemFilters.length > 0) {
    //             let filteredItems = itemsData.items.filter(item => {
    //                 return item.tags.filter(
    //                     tag => itemsData.itemFilters.find(filter => filter === tag) //find the specific tag that the user wants
    //                 ).length;
    //             });
    //             return filteredItems;
    //         }
    //         return itemsData.items;
    //     };

    render() {
        return (
            <Query query={fetchItems}>
                {({ loading, error, data }) => {
                    if (loading) return <p>loading </p>;
                    if (error) return <p>error</p>;
                    return <Items itemsData={data.items} />;
                }}
            </Query>
        );
    }
}
//   if you want data in a component, wrap it in query
//   connect?

export default ItemsContainer;
