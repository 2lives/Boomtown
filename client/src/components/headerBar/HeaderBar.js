import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import { Link, Route } from 'react-router-dom';
import logo from '../../images/boomtown-logo.svg';
import AppBar from 'material-ui/AppBar';
import TagFilterField from '../TagFilterField';
import { connect } from 'react-redux';
import {
    get_items_and_users,
    get_item_filters
} from '../../redux/modules/Items';
import { fbAuth } from '../../config/firebaseConfig';

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
    },
    TagFilterField: {
        paddingBottom: '10px'
    }
};

const HeaderBar = ({ itemFilters, dispatch }) => (
    <AppBar style={styles} showMenuIconButton={false}>
        <div className="logoWrapper" style={styles.logoWrapper}>
            <Link to={'/'}>
                <img src={logo} alt="Boomtown Logo" style={styles.image} />
            </Link>
            <Route
                exact
                path="/"
                render={() => (
                    <TagFilterField
                        handleChange={(event, index, values) => {
                            dispatch(get_item_filters(values));
                        }}
                        values={itemFilters}
                    />
                )}
            />
        </div>
        <div className="appButtonsWrapper" style={styles.appButtonsWrapper}>
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

const mapStateToProps = state => ({
    isLoading: state.itemsData.isLoading,
    itemsData: state.itemsData,
    itemFilters: state.itemsData.itemFilters
});

export default connect(mapStateToProps)(HeaderBar);
