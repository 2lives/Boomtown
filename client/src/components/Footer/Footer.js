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

const hide = {
    display: 'none'
};
const currentPath = window.location.pathname;
class Footer extends Component {
    render() {
        return (
            <div>
                <Link to={'/share'}>
                    {!currentPath.includes('share') ? (
                        <FloatingActionButton style={style} secondary={true}>
                            <ContentAdd />
                        </FloatingActionButton>
                    ) : (
                        <FloatingActionButton style={hide}>
                            <ContentAdd />
                        </FloatingActionButton>
                    )}
                </Link>
            </div>
        );
    }
}

export default Footer;
