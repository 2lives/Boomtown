import React, { Component } from "react";
import Items from "./Items";
import { connect } from "react-redux";
import { get_items_and_users } from "../../redux/modules/Items";

class ItemsContainer extends Component {
  componentDidMount = () => {
    this.props.dispatch(get_items_and_users());
  };

  render() {
    return (
      <div>
        {this.props.itemsData.isLoading ? (
          <p>loader</p>
        ) : (
          <Items itemsData={this.props.itemsData.items} />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.itemsData.isLoading,
  itemsData: state.itemsData,
  itemFilters: state.itemsData.itemFilters
});

export default connect(mapStateToProps)(ItemsContainer);
