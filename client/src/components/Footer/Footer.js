import React, { Component } from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { Link, Route } from 'react-router-dom';

const style = {
    marginRight: 20,
    marginBottom: 20,
    position: 'fixed',
    right: 0,
    bottom: 0
};
class Footer extends Component {
    render() {
        return (
            <div>
                <Route
                    exact
                    path="(/|/profile/)"
                    render={() => (
                        <Link to={'/share'}>
                            <FloatingActionButton
                                style={style}
                                secondary={true}
                            >
                                <ContentAdd />
                            </FloatingActionButton>
                        </Link>
                    )}
                />
            </div>
        );
    }
}

export default Footer;
