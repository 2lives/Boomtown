import React, { Component } from "react";
import ItemCardList from "../../components/itemCardList";
import {
  Paper,
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText
} from "material-ui/Card";
import Gravatar from "react-gravatar";

class Profile extends Component {
  render() {
    console.log(this.props.profileData[0]);
    return (
      <div>
        <Card title={this.props.profileData[0]} />
      </div>
    );
  }
}

export default Profile;
