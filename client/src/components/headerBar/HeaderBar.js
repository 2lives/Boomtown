import React, { Component } from "react";
import PropTypes from "prop-types";
import RaisedButton from "material-ui/RaisedButton";
import { Link, Route } from "react-router-dom";
import logo from "../../images/boomtown-logo.svg";
import AppBar from "material-ui/AppBar";
import FlatButton from "material-ui/FlatButton";
import { grey900, grey500 } from "material-ui/styles/colors";
import TagFilterField from "../TagFilterField";
import { connect } from "react-redux";
import {
  get_items_and_users,
  get_items_filter
} from "../../redux/modules/Items";

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
  componentDidMount() {
    const urls = ["http://localhost:3000/items", "http://localhost:3000/users"];
    this.props.dispatch(get_items_and_users(urls));
  }

  getTags = items => {
    let tags = [];
    if (items.length && items[0] !== undefined) {
      items.map(item => {
        if (item.tags !== undefined) {
          if (!item.tags.includes(undefined)) {
            item.tags.map(tag => {
              if (!tags.includes(tag)) {
                tags.push(tag);
              }
            });
          }
        }
      });
    }
    return tags;
  };
  render() {
    const tags = this.getTags(this.props.itemsData.items);
    console.log(tags);
    return (
      <AppBar style={styles}>
        <Link to={"/"}>
          <img src={logo} alt="Boomtown Logo" style={styles.image} />
        </Link>
        {tags.length && <TagFilterField tags={tags} />}
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

const mapStateToProps = state => ({
  isLoading: state.itemsData.isLoading,
  itemsData: state.itemsData,
  itemFilters: state.itemsData.itemFilters
});

export default connect(mapStateToProps)(HeaderBar);
