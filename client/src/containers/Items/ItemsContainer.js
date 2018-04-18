import React, { Component } from "react";
import Items from "./Items";
import HeaderBar from "../../components/headerBar";

class ItemsContainer extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      itemsData: []
    };
  }

  componentDidMount = () => {
    const urls = ["http://localhost:3000/items", "http://localhost:3000/users"];
    this.setState({ isLoading: true });
    let items = [];
    let people = [];
    Promise.all(urls.map(url => fetch(url)))
      .then(resp => Promise.all(resp.map(res => res.json())))
      .then(resp => {
        items = resp[0];
        people = resp[1];
      })
      .then(objects => {
        items.map(item => {
          people.find(profile => {
            if (profile.id === item.itemowner) {
              item.itemowner = profile;
            }
          });
        });
      })
      .then(() => this.setState({ isLoading: false, itemsData: items }))
      .catch(error => console.log("error"));
  };

  render() {
    return (
      <div>
        <HeaderBar />
        <Items itemsData={this.state.itemsData} />
      </div>
    );
  }
}
export default ItemsContainer;
