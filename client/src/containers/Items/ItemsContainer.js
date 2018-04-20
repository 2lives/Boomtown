import React, { Component } from "react";
import Items from "./Items";
import HeaderBar from "../../components/headerBar";
import { connect } from "react-redux";
import { get_items_and_users } from "../../redux/modules/Items";

class ItemsContainer extends Component {
  componentDidMount = () => {
    this.props.dispatch(get_items_and_users());
  };

  render() {
    return (
      <div>
        <HeaderBar />
        <Items itemsData={this.props.itemsData} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.items.isLoading,
  itemsData: state.items.items,
  itemFilters: state.items.itemFilters
});

export default connect(mapStateToProps)(ItemsContainer);
