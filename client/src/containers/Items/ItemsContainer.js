import React, { Component } from 'react';
import Items from './Items';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const fetchItems = gql`
    query {
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

export default ItemsContainer;
