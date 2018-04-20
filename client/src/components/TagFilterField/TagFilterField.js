import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";

const TagFilterField = () => {
  return (
    <SelectField multiple hintText="filter by tag" onChange={() => true}>
      <MenuItem />
    </SelectField>
  );
};
export default TagFilterField;
