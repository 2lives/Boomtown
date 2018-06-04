import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import MD5 from 'crypto-js/md5';

import {
    Card,
    CardActions,
    CardHeader,
    CardMedia,
    CardTitle,
    CardText
} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';

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
                <RaisedButton label="BORROW" secondary={true} />
            </CardActions>
        </Card>
    );
};

export default ItemCard;
