import React, { Component } from "react";
import PropTypes from "prop-types";
import RaisedButton from "material-ui/RaisedButton";
import { Link, Route } from "react-router-dom";
import logo from "../../images/boomtown-logo.svg";
import Paper from "material-ui/Paper";
import FlatButton from "material-ui/FlatButton";
import { grey900, grey500 } from "material-ui/styles/colors";

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
      <Paper style={styles}>
        <Link to={"/"}>
          <img src={logo} alt="Boomtown Logo" style={styles.image} />
        </Link>
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
      </Paper>
    );
  }
}
export default HeaderBar;
