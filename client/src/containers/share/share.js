import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { Step, Stepper, StepLabel, StepContent } from 'material-ui/Stepper';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import { MenuItem } from 'material-ui/Menu';
import ItemCard from '../../components/itemCard';
import { Form, Field } from 'react-final-form';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { fbStorage } from '../../firebase/firebase';
const addItem = gql`
    mutation addItem(
        $title: String!
        $description: String!
        $itemowner: String!
        $imageurl: String!
        $tags: [String]!
        $available: Boolean!
        $created: String!
    ) {
        addItem(
            title: $title
            description: $description
            imageurl: $imageurl
            tags: $tags
            created: $created
            itemowner: $itemowner
            available: $available
        ) {
            title
            description
        }
    }
`;

const tags = [
    {
        tagid: '1',
        value: 'Household Items'
    },
    {
        tagid: '2',
        value: 'Recreational Equipment'
    },
    {
        tagid: '3',
        value: 'Musical Instruments'
    },
    {
        tagid: '4',
        value: 'Tools'
    },
    {
        tagid: '5',
        value: 'Physical Media'
    },
    {
        tagid: '6',
        value: 'Sporting Goods'
    },
    {
        tagid: '7',
        value: 'Electronics'
    }
];

const styles = {
    shareWrapper: {
        display: 'flex'
    },
    previewItem: {
        height: '200px'
    }
};

class ShareForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            finished: false,
            stepIndex: 0,
            selectedTags: [],
            newItemData: {
                imageurl: '',
                title: 'Title',
                itemowner: {
                    id: '1lnsddfdfnfvopdv',
                    bio: 'im bad',
                    fullname: 'brandon',
                    email: 'brandon@loggedinuser.com'
                },
                created: new Date(),
                tags: [],
                description: 'Description'
            }
        };
    }

    handleNext = () => {
        const { stepIndex } = this.state;
        this.setState({
            stepIndex: stepIndex + 1,
            finished: stepIndex >= 4
        });
    };

    handlePrev = () => {
        const { stepIndex } = this.state;
        if (stepIndex > 0) {
            this.setState({ stepIndex: stepIndex - 1 });
        }
    };

    handleUpdate = event => {
        this.setState({
            newItemData: {
                imageurl: '',
                [event.target.name]: event.target.value,
                itemowner: {
                    id: '1lnsddfdfnfvopdv',
                    bio: '',
                    fullname: '',
                    email: ''
                },
                created: new Date(),
                tags: [],
                description: this.state.newItemData.description
            }
        });
    };

    handleUpdateAgain = event => {
        this.setState({
            newItemData: {
                imageurl: '',
                title: this.state.newItemData.title,
                itemowner: {
                    id: '1lnsddfdfnfvopdv',
                    bio: '',
                    fullname: '',
                    email: ''
                },
                created: new Date(),
                tags: [],
                [event.target.name]: event.target.value
            }
        });
    };

    handleChange = tag => {
        console.log(tag);
        const { selectedTags } = this.state;
        if (selectedTags.indexOf(tag) > -1) {
            selectedTags.splice(selectedTags.indexOf(tag), 1);
            const tagArr = [];
            selectedTags.map(tag => tagArr.push(tag.value));
            this.setState(
                {
                    selectedTags: [...selectedTags],
                    newItemData: {
                        imageurl: '',
                        title: this.state.newItemData.title,
                        itemowner: {
                            id: '1lnsddfdfnfvopdv',
                            bio: '',
                            fullname: '',
                            email: ''
                        },
                        created: new Date(),
                        tags: [...tagArr],
                        description: this.state.newItemData.description
                    }
                },
                () => console.log(this.state)
            );
        } else {
            const tagArr = [];
            selectedTags.map(tag => tagArr.push(tag.value));
            this.setState(
                {
                    selectedTags: [...selectedTags, tag],
                    newItemData: {
                        imageurl: '',
                        title: this.state.newItemData.title,
                        itemowner: {
                            id: '1lnsddfdfnfvopdv',
                            bio: '',
                            fullname: '',
                            email: ''
                        },
                        created: new Date(),
                        tags: [...tagArr, tag.value],
                        description: this.state.newItemData.description
                    }
                },
                () => console.log(this.state)
            );
        }
    };

    validate(...args) {
        console.log('validating:', args);
    }
    onSubmit(values) {
        console.log('Form was submitted', values);
    }
    renderStepActions(step) {
        const { stepIndex } = this.state;

        return (
            <div style={{ margin: '12px 0' }}>
                <RaisedButton
                    label={stepIndex === 3 ? 'Confirm' : 'Next'}
                    disableTouchRipple={true}
                    disableFocusRipple={true}
                    default={true}
                    onClick={this.handleNext}
                    style={{ marginRight: 12 }}
                />
                {step > 0 && (
                    <RaisedButton
                        label="Back"
                        secondary={true}
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
            <div className="shareWrapper" style={styles.shareWrapper}>
                <div className="previewItem" style={styles.previewItem}>
                    <ItemCard itemsData={this.state.newItemData} />
                </div>
                <Form
                    onSubmit={values => this.onSubmit(values)}
                    validate={this.validate.bind(this)}
                    render={({ handleSubmit, pristine, invalid, values }) => (
                        <Mutation mutation={addItem}>
                            {(addItem, { data }) => (
                                <form
                                    onSubmit={e => {
                                        e.preventDefault();
                                        console.log(
                                            values,
                                            this.state.selectedTags.map(
                                                tag => tag.value
                                            )
                                        );
                                        handleSubmit(values);
                                        addItem({
                                            variables: {
                                                ...values,
                                                created: new Date(),
                                                available: true,
                                                itemowner:
                                                    'k721A4pRNggCx7b6ryEE8vx1VIi1',
                                                tags: this.state.selectedTags.map(
                                                    tag => tag.tagid
                                                ),
                                                imageurl: 'to be added'
                                            }
                                        });
                                    }}
                                >
                                    <Stepper
                                        activeStep={stepIndex}
                                        orientation="vertical"
                                    >
                                        <Step>
                                            <StepLabel>Add an Image</StepLabel>
                                            <StepContent>
                                                <p>
                                                    We live in a visual culture.
                                                    Upload an image of the item
                                                    you're sharing.
                                                </p>

                                                <Field
                                                    name="imageurl"
                                                    type="text"
                                                    render={({
                                                        input,
                                                        meta
                                                    }) => (
                                                        <div>
                                                            <RaisedButton
                                                                label="select an image"
                                                                containerElement="label"
                                                                labelPosition="before"
                                                            >
                                                                <input
                                                                    type="file"
                                                                    style={{
                                                                        display:
                                                                            'none'
                                                                    }}
                                                                />
                                                            </RaisedButton>
                                                        </div>
                                                    )}
                                                />
                                                {this.renderStepActions(1)}
                                            </StepContent>
                                        </Step>
                                        <Step>
                                            <StepLabel>
                                                Add Title & Description
                                            </StepLabel>
                                            <StepContent>
                                                <p>
                                                    Folks need to know what
                                                    you're sharing. Give them a
                                                    clue by adding a title &
                                                    description.
                                                </p>
                                                <Field
                                                    name="title"
                                                    type="text"
                                                    render={({
                                                        input,
                                                        meta
                                                    }) => (
                                                        <div>
                                                            <TextField
                                                                {...input}
                                                                floatingLabelText="Title"
                                                                onInput={
                                                                    this
                                                                        .handleUpdate
                                                                }
                                                            />

                                                            {meta.touched &&
                                                                meta.error && (
                                                                    <span>
                                                                        {
                                                                            meta.error
                                                                        }
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
                                                    render={({
                                                        input,
                                                        meta
                                                    }) => (
                                                        <div>
                                                            <TextField
                                                                {...input}
                                                                floatingLabelText="Description"
                                                                onInput={
                                                                    this
                                                                        .handleUpdateAgain
                                                                }
                                                            />

                                                            {meta.touched &&
                                                                meta.error && (
                                                                    <span>
                                                                        {
                                                                            meta.error
                                                                        }
                                                                    </span>
                                                                )}
                                                        </div>
                                                    )}
                                                />

                                                {this.renderStepActions(2)}
                                            </StepContent>
                                        </Step>
                                        <Step>
                                            <StepLabel>
                                                Categorize Your Item
                                            </StepLabel>
                                            <StepContent>
                                                <p>
                                                    To share an item, you'll add
                                                    it to our list of
                                                    categories. You can select
                                                    multiple categories.
                                                </p>

                                                <Field
                                                    name="tags"
                                                    render={({
                                                        input,
                                                        meta,
                                                        value
                                                    }) => (
                                                        <div>
                                                            <SelectField
                                                                multiple
                                                                {...input}
                                                                hintText="Select Categories"
                                                                selectionRenderer={
                                                                    this
                                                                        .selectionRenderer
                                                                }
                                                                onChange={(
                                                                    event,
                                                                    index,
                                                                    value
                                                                ) =>
                                                                    this.handleChange(
                                                                        value[0]
                                                                    )
                                                                }
                                                            >
                                                                {tags.map(
                                                                    tag => {
                                                                        return (
                                                                            <MenuItem
                                                                                insetChildren
                                                                                key={
                                                                                    tag.tagid
                                                                                }
                                                                                value={
                                                                                    tag
                                                                                }
                                                                                primaryText={
                                                                                    tag.value
                                                                                }
                                                                                checked={
                                                                                    this.state.selectedTags.indexOf(
                                                                                        tag
                                                                                    ) >
                                                                                    -1
                                                                                }
                                                                            />
                                                                        );
                                                                    }
                                                                )}
                                                            </SelectField>

                                                            {meta.touched &&
                                                                meta.error && (
                                                                    <span>
                                                                        {
                                                                            meta.error
                                                                        }
                                                                    </span>
                                                                )}
                                                        </div>
                                                    )}
                                                />

                                                {this.renderStepActions(3)}
                                            </StepContent>
                                        </Step>
                                        <Step>
                                            <StepLabel>
                                                Confirm Things!
                                            </StepLabel>
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
                        </Mutation>
                    )}
                />
            </div>
        );
    }
}

export default ShareForm;
