import React, { Component } from 'react';
import PropTypes from 'prop-types';
//import firebase
import Login from './Login';

//all container files are stateful components

class LoginContainer extends Component {
    static propTypes = {};

    login = () => {
        console.log('You clicked the login button.');
    };

    render() {
        return <Login login={this.login} />;
    }
}

export default LoginContainer;
