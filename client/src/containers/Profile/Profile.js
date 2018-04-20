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
    this.props.profileData[0] && console.log(this.props.profileData);
    return (
      <div>
        {/* this.props.profileData[0] && */}
        <Card title={this.props.profileData[0]} />
      </div>
    );
  }
}

export default Profile;
