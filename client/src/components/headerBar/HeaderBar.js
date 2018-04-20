import React, { Component } from "react";
import PropTypes from "prop-types";
import RaisedButton from "material-ui/RaisedButton";
import { Link, Route } from "react-router-dom";
import logo from "../../images/boomtown-logo.svg";
import AppBar from "material-ui/AppBar";
import FlatButton from "material-ui/FlatButton";
import { grey900, grey500 } from "material-ui/styles/colors";
import TagFilterField from "../TagFilterField";

const styles = {
  width: "100vw",
  padding: "10px",
  marginBottom: "50px",
  display: "flex",
  justifyContent: "space-between",
  profileButton: {
    color: "white"
  },
  logoutButton: {
    color: "white",
    margin: "0 20px"
  },
  image: {
    width: "35px",
    height: "35px"
  }
};

class HeaderBar extends Component {
  render() {
    return (
      <AppBar style={styles}>
        <Link to={"/"}>
          <img src={logo} alt="Boomtown Logo" style={styles.image} />
        </Link>
        <TagFilterField />
        <div>
          <RaisedButton
            label="My Profile"
            primary={true}
            style={styles.profileButton}
          />

          <RaisedButton
            label="Logout"
            secondary={true}
            style={styles.logoutButton}
          />
        </div>
      </AppBar>
    );
  }
}
export default HeaderBar;
