import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Profile from './Profile';
import ItemCardList from '../../components/itemCardList';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const queryUserItems = gql`
    query user($id: ID!) {
        user(id: $id) {
            id
            email
            fullname
            bio
            owneditems {
                title
                description
                imageurl
                tags
                created
                available
                tags
                itemowner {
                    id
                    fullname
                    email
                }
            }
            borroweditems {
                id
            }
        }
    }
`;

class ProfileContainer extends Component {
    render() {
        const id = this.props.match.params.itemownerId;
        return (
            <Query query={queryUserItems} variables={{ id }}>
                {({ loading, error, data }) => {
                    console.log(data);
                    if (loading) return <p>loading </p>;
                    if (error) return <p>error</p>;
                    return (
                        <div>
                            <Profile profileData={data.user} />
                            <ItemCardList itemsData={data.user.owneditems} />
                        </div>
                    );
                }}
            </Query>
        );
    }
}

export default ProfileContainer;
