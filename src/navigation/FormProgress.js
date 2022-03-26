import React, {Component} from 'react';
import {View, Text} from 'react-native';

import {ProgressSteps, ProgressStep} from 'react-native-progress-steps';
import DetailForm from '../pages/detail/DetailForm';
import SignForm from '../pages/transaction/SignForm';
import SignBook from './../pages/transaction/SignBook';
import {colors} from './../utils/colors';

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
      <View style={{flex: 1}}>
        <ProgressSteps
          activeStepIconBorderColor={colors.pink}
          completedProgressBarColor={colors.pink}
          activeLabelColor={colors.pink}
          completedStepIconColor={colors.pink}>
          <ProgressStep
            label="Detail"
            nextBtnStyle={{backgroundColor: colors.pink, borderRadius: 20}}
            nextBtnTextStyle={{color: 'white', padding: 10, fontSize: 14}}
            onNext={this.onDetailStepComplete}
            onPrevious={this.onPrevStep}
            scrollViewProps={this.defaultScrollViewProps}>
            <DetailForm />
          </ProgressStep>
          <ProgressStep
            previousBtnStyle={{backgroundColor: colors.pink, borderRadius: 20}}
            previousBtnTextStyle={{color: 'white', padding: 10, fontSize: 14}}
            nextBtnStyle={{backgroundColor: colors.pink, borderRadius: 20}}
            nextBtnTextStyle={{color: 'white', padding: 10, fontSize: 14}}
            label="Form"
            onNext={this.onNextStep}
            onPrevious={this.onPrevStep}
            scrollViewProps={this.defaultScrollViewProps}>
            <SignForm />
          </ProgressStep>
          <ProgressStep
            label="Sign"
            previousBtnStyle={{backgroundColor: colors.pink, borderRadius: 20}}
            previousBtnTextStyle={{color: 'white', padding: 10, fontSize: 14}}
            nextBtnStyle={{backgroundColor: colors.pink, borderRadius: 20}}
            nextBtnTextStyle={{color: 'white', padding: 10, fontSize: 14}}
            onPrevious={this.onPrevStep}
            onSubmit={this.onSubmitSteps}
            scrollViewProps={this.defaultScrollViewProps}>
            <SignBook />
          </ProgressStep>
        </ProgressSteps>
      </View>
    );
  }
}

export default FormProgress;
