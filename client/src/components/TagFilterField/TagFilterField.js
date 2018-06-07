import React from 'react';
import PropTypes from 'prop-types';
import SelectField from 'material-ui/SelectField';
import { connect } from 'react-redux';
import MenuItem from 'material-ui/MenuItem';
import { get_item_filters } from '../../redux/modules/Items';

const chosenTags = [];
const TagFilter = ({ tags, dispatch, selectedTags }) => {
    function handleChange(value) {
        chosenTags.push(value);
        console.log(chosenTags);
        dispatch(get_item_filters(value));
    }

    function selectionRenderer(arr) {
        console.log(arr);
        switch (arr.length) {
            case 0:
                return this.arr;
            case 1:
                return this.arr;
            default:
                return `${arr.length} tags selected`;
        }
    }
    return (
        <SelectField
            multiple={true}
            onChange={(event, index, value) => handleChange(value[0])}
            hintText="Select Categories"
            selectionRenderer={this.selectionRenderer}
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
