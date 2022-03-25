import React, {Component} from 'react';
import {View, Text} from 'react-native';

import {ProgressSteps, ProgressStep} from 'react-native-progress-steps';

class FormProgress extends Component {
  static navigationOptions = {
    header: null,
  };

  defaultScrollViewProps = {
    keyboardShouldPersistTaps: 'handled',
    contentContainerStyle: {
      flex: 1,
      justifyContent: 'center',
    },
  };

  onNextStep = () => {
    console.log('called next step');
  };

  onDetailStepComplete = () => {
    alert('Please fill the form and sign before borrow book!');
  };

  onPrevStep = () => {
    console.log('called previous step');
  };

  onSubmitSteps = () => {
    console.log('called on submit step.');
  };

  render() {
    return (
      <View style={{flex: 1, marginTop: 50}}>
        <ProgressSteps>
          <ProgressStep
            label="Detail"
            onNext={this.onDetailStepComplete}
            onPrevious={this.onPrevStep}
            scrollViewProps={this.defaultScrollViewProps}>
            <View style={{alignItems: 'center'}}>
              <Text />
            </View>
          </ProgressStep>
          <ProgressStep
            label="Form"
            onNext={this.onNextStep}
            onPrevious={this.onPrevStep}
            scrollViewProps={this.defaultScrollViewProps}>
            <View style={{alignItems: 'center'}}>
              <Text />
            </View>
          </ProgressStep>
          <ProgressStep
            label="Sign"
            onPrevious={this.onPrevStep}
            onSubmit={this.onSubmitSteps}
            scrollViewProps={this.defaultScrollViewProps}>
            <View style={{alignItems: 'center'}}>
              <Text>Sign</Text>
            </View>
          </ProgressStep>
        </ProgressSteps>
      </View>
    );
  }
}

export default FormProgress;
