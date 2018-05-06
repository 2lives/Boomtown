import React, { Component } from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

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
                <FloatingActionButton style={style} secondary={true}>
                    <ContentAdd />
                </FloatingActionButton>
            </div>
        );
    }
}

export default Footer;
