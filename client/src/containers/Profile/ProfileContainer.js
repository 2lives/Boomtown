import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Profile from './Profile';
import ItemCardList from '../../components/itemCardList';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const fetchUserItems = gql`
    query fetchUserItems($id: ID!) {
        user(id: $id) {
            id
            bio
            fullname
            email
            owneditems {
                id
                imageurl
                tags
                description
                itemowner {
                    id
                    fullname
                    email
                }
            }
            borroweditems {
                title
            }
        }
    }
`;

class ProfileContainer extends Component {
    render() {
        const id = this.props.match.params.itemownerId;
        return (
            <Query query={fetchUserItems} variables={{ id }}>
                {({ loading, error, data }) => {
                    console.log(data);
                    console.log(this.props);
                    if (loading) return <p>loading </p>;
                    if (error) return <p>error</p>;
                    return <ItemCardList itemsData={data.user.owneditems} />;
                }}
            </Query>
        );
    }
}
export default ProfileContainer;
