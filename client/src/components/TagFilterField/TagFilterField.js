import React from 'react';
import { graphql } from 'react-apollo';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const TagFilterField = ({ handleChange, values, data }) =>
    data.loading ? (
        <SelectField disabled />
    ) : (
        <SelectField
            multiple
            value={values}
            onChange={handleChange}
            className="filter-select"
            hintText="Select Categories"
        >
            {data.tagField.map(tag => (
                <MenuItem
                    insetChildren
                    key={tag.tagid}
                    checked={values && values.indexOf(tag) > -1}
                    value={tag.tagid}
                    label={tag.tag}
                    primaryText={tag.tag}
                />
            ))}
        </SelectField>
    );
TagFilterField.propTypes = {
    values: PropTypes.array.isRequired,
    handleChange: PropTypes.func.isRequired
};

const tagField = gql`
    query tagField {
        tagField {
            tagid
            tag
        }
    }
`;
export default graphql(tagField)(TagFilterField);
