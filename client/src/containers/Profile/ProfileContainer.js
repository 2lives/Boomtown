import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Profile from './Profile';
import ItemCardList from '../../components/itemCardList';
import { get_profile_data } from '../../redux/modules/Profiles';

class ProfileContainer extends Component {
    componentDidMount = () => {
        this.props.dispatch(
            get_profile_data(this.props.match.params.itemownerId)
        );
    };

    render() {
        console.log(this.props);
        return (
            <div>
                {this.props.itemsData.profileItems !== [] ? (
                    <p>Loading</p>
                ) : (
                    <Profile profileData={this.props.itemsData} />
                )}
                <ItemCardList itemsData={this.props.itemsData.profileItems} />
            </div>
        );
    }
}
const mapStateToProps = state => ({
    itemsData: state.profileItems
});

export default connect(mapStateToProps)(ProfileContainer);
