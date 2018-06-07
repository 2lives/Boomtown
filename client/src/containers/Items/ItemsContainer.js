import React from 'react';
import Items from './Items';
import { Query } from 'react-apollo';
import { connect } from 'react-redux';

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

const ItemsContainer = props => {
    return (
        <Query query={fetchItems}>
            {({ loading, error, data }) => {
                if (loading) return <p>loading </p>;
                if (error) return <p>error</p>;
                return (
                    <Items
                        itemsData={data.items}
                        itemFilters={props.itemFilters}
                    />
                );
            }}
        </Query>
    );
};

export default connect(state => ({
    itemFilters: state.itemsData.itemFilters
}))(ItemsContainer);
