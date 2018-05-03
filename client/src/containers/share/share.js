import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { Step, Stepper, StepLabel, StepContent } from 'material-ui/Stepper';
import TextField from 'material-ui/TextField';

class ShareForm extends Component {
    render() {
        return (
            <div>
                <Form
                    onSubmit={e => {
                        e.preventDefault();
                    }}
                >
                    <Stepper orientation="vertical">
                        <Step>
                            <StepLabel>Add an Image</StepLabel>
                            <StepContent>
                                <p>
                                    We live in a visual culture. Upload an image
                                    of the item you're sharing.
                                </p>
                                <RaisedButton label="upload image">
                                    <input type="file" />
                                </RaisedButton>
                            </StepContent>
                        </Step>
                        <Step>
                            <StepLabel>Add Title & Description</StepLabel>
                            <StepContent>
                                <p>
                                    Folks need to know what you're sharing. Give
                                    them a clue by adding a title & description.
                                </p>
                                <TextField floatingLabelText="title" />
                                <TextField floatingLabelText="description" />
                            </StepContent>
                        </Step>
                        <Step>
                            <StepLabel>Categorize Your Item</StepLabel>
                            <StepContent>
                                <p>
                                    To share an item, you'll add it to our list
                                    of categories. You can select multiple
                                    categories.
                                </p>
                            </StepContent>
                        </Step>
                    </Stepper>
                </Form>
            </div>
        );
    }
}
