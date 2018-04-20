import React, { Component } from "react";
import Profile from "./Profile";
import ItemCardList from "../../components/itemCardList";

class ProfileContainer extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      itemsData: []
    };
  }

  componentDidMount() {
    const urls = ["http://localhost:3000/items", "http://localhost:3000/users"];
    this.setState({ isLoading: true });
    Promise.all(urls.map(url => fetch(url).then(resp => resp.json())))
      .then(resp => {
        resp[0].map(item => {
          resp[1].map(user => {
            if (user.id === item.itemowner) {
              item.itemowner = user;
            }
          });
        });
        this.setState({ itemsData: resp[0] });
        let personalItems = this.state.itemsData.filter(
          item => item.itemowner.id === this.props.match.params.itemownerId
        );
        this.setState({ itemsData: personalItems });
      })
      .then(() => this.setState({ isLoading: false }))
      .catch(error => console.log(error));
    //     const profileData = this.state.itemsData.map();
    //     console.log(profileData);
  }

  render() {
    return (
      <div>
        <Profile profileData={this.state.itemsData} />
        <ItemCardList itemsData={this.state.itemsData} />
      </div>
    );
  }
}
export default ProfileContainer;