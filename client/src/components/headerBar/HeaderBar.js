import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import { Link, Route } from 'react-router-dom';
import logo from '../../images/boomtown-logo.svg';
import AppBar from 'material-ui/AppBar';
import TagFilter from '../TagFilterField';
import { connect } from 'react-redux';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { fbAuth } from '../../config/firebaseConfig';

const tagsQuery = gql`
    query {
        items {
            tags
        }
    }
`;

const styles = {
    width: '100vw',
    padding: '10px',
    marginBottom: '50px',
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    image: {
        width: '35px',
        height: '35px',
        marginRight: '25px',
        marginLeft: '5px',
        marginTop: '4px'
    },
    logoWrapper: {
        display: 'flex',
        alignItems: 'flex-start',
        flexFlow: 'row wrap',
        position: 'absolute',
        left: '0',
        padding: '10px'
    },
    profileButton: {
        marginRight: '15px'
    },
    appButtonsWrapper: {
        padding: '10px'
    }
};

class HeaderBar extends Component {
    loadTags = items => {
        const tags = [];
        if (items[0] !== undefined) {
            items.map(item => {
                if (item.tags !== undefined) {
                    if (!item.tags.includes(undefined)) {
                        item.tags.map(tag => {
                            if (!tags.includes(tag)) {
                                tags.push(tag);
                            }
                        });
                    }
                }
            });
        }
        return tags;
    };

    render() {
        return (
            <Query query={tagsQuery}>
                {({ loading, error, data }) => {
                    if (loading) return <p>loading</p>;
                    if (error) return <p>Error!</p>;
                    const tags = this.loadTags(data.items);
                    return (
                        <AppBar style={styles} showMenuIconButton={false}>
                            <div
                                className="logoWrapper"
                                style={styles.logoWrapper}
                            >
                                <Link to={'/'}>
                                    <img
                                        src={logo}
                                        alt="Boomtown Logo"
                                        style={styles.image}
                                    />
                                </Link>
                                <Route
                                    exact
                                    path="/"
                                    render={() => (
                                        <TagFilter
                                            tags={tags}
                                            selectedTags={
                                                this.props.itemsData.itemFilters
                                            }
                                        />
                                    )}
                                />
                            </div>
                            <div
                                className="appButtonsWrapper"
                                style={styles.appButtonsWrapper}
                            >
                                {/* <Link to={`/profile/${fbAuth.currentUser.id}`}> */}
                                <RaisedButton
                                    label="My Profile"
                                    primary={true}
                                    style={styles.profileButton}
                                />
                                {/* </Link> */}

                                <RaisedButton label="Logout" secondary={true} />
                            </div>
                        </AppBar>
                    );
                }}
            </Query>
        );
    }
}

const mapStateToProps = state => ({
    itemsData: state.itemsData
});

export default connect(mapStateToProps)(HeaderBar);
