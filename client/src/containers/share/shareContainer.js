import ShareForm from './share';
import React, { Component } from 'react';
// import gql from 'graphql-tag';

class shareContainer extends Component {
    //     constructor() {
    //         super();
    //         this.state = {
    //             tags: {
    //                 value: '',
    //                 name: ''
    //             }
    //         };
    //     }

    render() {
        return <ShareForm />;
    }
    //pass down to share, attach to onchange
    //bind or use arrow function
    //make tagfilterfield file to use graphql to populate tags
}
export default ShareForm;
