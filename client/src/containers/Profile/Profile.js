import React, { Component } from 'react';
import ItemCardList from '../../components/itemCardList';
import {
    Paper,
    Card,
    CardActions,
    CardHeader,
    CardMedia,
    CardTitle,
    CardText
} from 'material-ui/Card';
import Gravatar from 'react-gravatar';

class Profile extends Component {
    render() {
        //    console.log(this.props);

        return (
            <div>
                <Card
                // title={
                //     this.props.itemsData.profileItems[0].itemowner.fullname
                // }
                />
            </div>
        );
    }
}

export default Profile;
