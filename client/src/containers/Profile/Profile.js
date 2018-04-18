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
    console.log(this.props.profileData);
    return <h1>hi</h1>;
  }
}

export default Profile;
