import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { Step, Stepper, StepLabel, StepContent } from 'material-ui/Stepper';
import TextField from 'material-ui/TextField';
// import TagFilterField from '../../components/TagFilterField';
import SelectField from 'material-ui/SelectField';
import { MenuItem } from 'material-ui/Menu';

import { Form, Field } from 'react-final-form';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const addItem = gql`
    mutation addItem(
        $title: String!
        $itemowner: String
        $imageurl: String
        $tags: [String]
        $created: String
    ) {
        addItem(
            title: $title
            description: $description
            imageurl: $imageurl
            tags: $tags
            created: $created
            available: $available
        )
    }
`;

const SELECT_FIELDS = [
    {
        tagid: 'Household Items',
        value: 'Household Items'
    },
    {
        tagid: 'Recreational Equipment',
        value: 'Recreational Equipment'
    },
    {
        tagid: 'Musical Instruments',
        value: 'Musical Instruments'
    },
    {
        tagid: 'Tools',
        value: 'Tools'
    },
    {
        tagid: 'Physical Media',
        value: 'Physical Media'
    },
    {
        tagid: 'Sporting Goods',
        value: 'Sporting Goods'
    },
    {
        tagid: 'Electronics',
        value: 'Electronics'
    }
];

// const onSubmit = async values => {
//     window.alert(JSON.stringify(values, 0, 2));
// };

class ShareForm extends Component {
    state = {
        finished: false,
        stepIndex: 0,
        selectedTags: []
    };

    handleNext = () => {
        const { stepIndex } = this.state;
        this.setState({
            stepIndex: stepIndex + 1,
            finished: stepIndex >= 2
        });
    };

    handlePrev = () => {
        const { stepIndex } = this.state;
        if (stepIndex > 0) {
            this.setState({ stepIndex: stepIndex - 1 });
        }
    };
    handleChange = tag => {
        const { selectedTags } = this.state;
        if (selectedTags.indexOf(tag) > -1) {
            selectedTags.splice(selectedTags.indexOf(tag), 1);
            this.setState({ selectedTags: [...selectedTags] });
        } else {
            this.setState({ selectedTage: [...selectedTags, tag] });
        }
    };

    validate(...args) {
        console.log('validating:', args);
    }

    renderStepActions(step) {
        const { stepIndex } = this.state;

        return (
            <div style={{ margin: '12px 0' }}>
                <RaisedButton
                    label={stepIndex === 3 ? 'Confirm' : 'Next'}
                    disableTouchRipple={true}
                    disableFocusRipple={true}
                    primary={true}
                    onClick={this.handleNext}
                    style={{ marginRight: 12 }}
                />
                {step > 0 && (
                    <FlatButton
                        label="Back"
                        disabled={stepIndex === 0}
                        disableTouchRipple={true}
                        disableFocusRipple={true}
                        onClick={this.handlePrev}
                    />
                )}
            </div>
        );
    }

    render() {
        const { finished, stepIndex } = this.state;
        return (
            <Mutation mutation={addItem}>
                <Form
                    onSubmit={values => this.onSubmit(values)}
                    validate={this.validate.bind(this)}
                    render={({ handleSubmit, pristine, invalid, values }) => (
                        <form
                            onSubmit={e => {
                                e.preventDefault();
                                handleSubmit(values);
                                addItem({
                                    variables: {
                                        ...values,
                                        created: new Date(),
                                        available: true,
                                        itemowner:
                                            'k721A4pRNggCx7b6ryEE8vx1VIi1',
                                        tags: this.state.selectedTags.map(tag =>
                                            tag.tagid.toString()
                                        )
                                    }
                                });
                            }}
                        >
                            }
                            <Stepper
                                activeStep={stepIndex}
                                orientation="vertical"
                            >
                                <Step>
                                    <StepLabel>Add an Image</StepLabel>
                                    <StepContent>
                                        <p>
                                            We live in a visual culture. Upload
                                            an image of the item you're sharing.
                                        </p>
                                        <RaisedButton
                                            type="file"
                                            label="upload image"
                                        >
                                            <input
                                                type="file"
                                                name="imageurl"
                                            />
                                        </RaisedButton>
                                        {this.renderStepActions(1)}
                                    </StepContent>
                                </Step>
                                <Step>
                                    <StepLabel>
                                        Add Title & Description
                                    </StepLabel>
                                    <StepContent>
                                        <p>
                                            Folks need to know what you're
                                            sharing. Give them a clue by adding
                                            a title & description.
                                        </p>
                                        <Field
                                            name="title"
                                            type="text"
                                            render={({ input, meta }) => (
                                                <div>
                                                    <TextField
                                                        {...input}
                                                        floatingLabelText="Title"
                                                    />

                                                    {meta.touched &&
                                                        meta.error && (
                                                            <span>
                                                                {meta.error}
                                                            </span>
                                                        )}
                                                </div>
                                            )}
                                        />
                                        <Field
                                            name="description"
                                            onChange={value =>
                                                console.log(value)
                                            }
                                            render={({ input, meta }) => (
                                                <div>
                                                    <TextField
                                                        {...input}
                                                        floatingLabelText="Description"
                                                    />

                                                    {meta.touched &&
                                                        meta.error && (
                                                            <span>
                                                                {meta.error}
                                                            </span>
                                                        )}
                                                </div>
                                            )}
                                        />

                                        {this.renderStepActions(2)}
                                    </StepContent>
                                </Step>
                                <Step>
                                    <StepLabel>Categorize Your Item</StepLabel>
                                    <StepContent>
                                        <p>
                                            To share an item, you'll add it to
                                            our list of categories. You can
                                            select multiple categories.
                                        </p>

                                        <Field
                                            name="tags"
                                            onChange={value =>
                                                console.log(value)
                                            }
                                            render={({ input, meta }) => (
                                                <div>
                                                    <SelectField
                                                        multiple
                                                        {...input}
                                                        hintText="Select Categories"
                                                        value={this.state.tags}
                                                        checked={this.state.tags.indexOf(
                                                            SELECT_FIELDS.tagid
                                                        )}
                                                        selectionRenderer={
                                                            this
                                                                .selectionRenderer
                                                        }
                                                        onChange={this.handleChange(
                                                            SELECT_FIELDS
                                                                .value[0]
                                                        )}
                                                    >
                                                        {SELECT_FIELDS.map(
                                                            (
                                                                { id, value },
                                                                i
                                                            ) => (
                                                                <MenuItem
                                                                    key={
                                                                        SELECT_FIELDS.tagid
                                                                    }
                                                                    value={
                                                                        SELECT_FIELDS.value
                                                                    }
                                                                />
                                                            )
                                                        )}
                                                    </SelectField>

                                                    {meta.touched &&
                                                        meta.error && (
                                                            <span>
                                                                {meta.error}
                                                            </span>
                                                        )}
                                                </div>
                                            )}
                                        />

                                        {this.renderStepActions(3)}
                                    </StepContent>
                                </Step>
                                <Step>
                                    <StepLabel>Confirm Things!</StepLabel>
                                    <StepContent>
                                        <p>
                                            Great! If you're happy with
                                            everything, tap the button.
                                        </p>
                                        {this.renderStepActions(4)}
                                    </StepContent>
                                </Step>
                            </Stepper>
                            <button type="submit">submit</button>
                        </form>
                    )}
                />
            </Mutation>
        );
    }
}

export default ShareForm;
