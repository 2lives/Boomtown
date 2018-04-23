import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Link } from 'react-router-dom';
import moment from 'moment';
import MD5 from 'crypto-js/md5';
//import gravatar

import {
    Card,
    CardActions,
    CardHeader,
    CardMedia,
    CardTitle,
    CardText
} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

const ItemCard = props => {
    const itemsData = props.itemsData;
    return (
        <Card>
            <CardMedia>{<img src={itemsData.imageurl} alt="" />}</CardMedia>
            <Link to={`/profile/${itemsData.itemowner.id}`}>
                <CardHeader
                    title={itemsData.itemowner.fullname}
                    subtitle={moment(itemsData.created).fromNow()}
                    avatar={`//www.gravatar.com/avatar/${MD5(
                        itemsData.itemowner.email
                    ).toString()}.jpg`}
                />
            </Link>
            <CardTitle title={itemsData.title} subtitle={itemsData.tags} />
            <CardText>{itemsData.description}</CardText>
            <CardActions>
                <FlatButton label="BORROW" />
            </CardActions>
        </Card>
    );
};

export default ItemCard;
