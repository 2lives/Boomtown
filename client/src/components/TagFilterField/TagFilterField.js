import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {
    get_item_filters,
    get_items_and_users
} from '../../redux/modules/Items';

const TagFilterField = ({ checkedTags, dispatch, tags }) => {
    const handleFilter = value => {
        dispatch(get_item_filters(value));
    };

    return (
        <SelectField
            multiple
            hintText={'Filter by Tag'}
            onChange={(event, index, value) => handleFilter(value[0])}
        >
            {tags &&
                tags.map((tag, i) => (
                    <MenuItem
                        checked={checkedTags && checkedTags.indexOf(tag) > -1}
                        key={i}
                        insetChildren
                        primaryText={tag}
                        value={tag}
                    />
                ))}
        </SelectField>
    );
};

const mapStateToProps = state => ({
    isLoading: state.itemsData.isLoading,
    itemsData: state.itemsData,
    itemFilters: state.itemsData.itemFilters
});
export default connect(mapStateToProps)(TagFilterField);
