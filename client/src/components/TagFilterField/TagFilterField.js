import React from 'react';
import { graphql } from 'react-apollo';
import PropTypes from 'prop-types';
import SelectField from 'material-ui/SelectField';
import { connect } from 'react-redux';
import MenuItem from 'material-ui/MenuItem';
import { get_item_filters } from '../../redux/modules/Items';

const TagFilter = ({ tags, dispatch, selectedTags }) => {
    function handleChange(value) {
        dispatch(get_item_filters(value));
    }

    return (
        <SelectField
            multiple={true}
            onChange={(event, index, value) => handleChange(value[0])}
            hintText="Select Categories"
        >
            {tags &&
                tags.map((tag, i) => (
                    <MenuItem
                        insetChildren
                        key={i}
                        checked={selectedTags && selectedTags.indexOf(tag) > -1}
                        value={tag}
                        label={tag}
                        primaryText={tag}
                    />
                ))}
        </SelectField>
    );
};

export default connect()(TagFilter);
