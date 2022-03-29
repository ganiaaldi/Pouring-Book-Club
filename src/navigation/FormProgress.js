import Axios from 'axios';
import React, {Component, useEffect, useRef, useState} from 'react';
import {View, Text} from 'react-native';

import {ProgressSteps, ProgressStep} from 'react-native-progress-steps';
import {useSelector, useDispatch} from 'react-redux';
import DetailForm from '../pages/detail/DetailForm';
import SignForm from '../pages/transaction/SignForm';
import SignBook from './../pages/transaction/SignBook';
import {colors} from './../utils/colors';
import {clearFormPath} from './../redux/actions/actions';

const FormProgress = ({route, navigation}) => {
  const signRef = useRef();
  const formPath = useSelector(state => state.formPath);
  const detailReducer = useSelector(state => state.detailReducer);
  const profileReducer = useSelector(state => state.profileReducer);
  const surveyReducer = useSelector(state => state.surveyReducer);
  const signReducer = useSelector(state => state.signReducer);
  const dispatch = useDispatch();
  const date = new Date().toLocaleString();
  const [isSignActive, setIsSignActive] = useState(true);

  useEffect(() => {
    // console.log('cek detail reducer', detailReducer);
    // console.log('cek profile reducer', profileReducer);
    // console.log('cek survey reducer', surveyReducer);
    // console.log('cek path reducer', signReducer);
    if (
      formPath.location.latitude !== '' &&
      formPath.location.longitude !== '' &&
      formPath.photo !== ''
    ) {
      fillSurvey();
      borrowBook();
    }
    if (signReducer.pathCounts) {
      console.log('pathCount false');
      setIsSignActive(false);
    } else {
      console.log('pathCount true');
      setIsSignActive(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formPath, detailReducer, profileReducer, surveyReducer, signReducer]);

  const defaultScrollViewProps = {
    keyboardShouldPersistTaps: 'handled',
    contentContainerStyle: {
      flex: 1,
      justifyContent: 'center',
    },
  };

  const onNextStep = () => {
    console.log('called next step');
  };

  const onDetailStepComplete = () => {
    alert('Please fill the form and sign before borrow book!');
  };

  const onPrevStep = () => {
    console.log('called previous step');
  };

  const onSubmitSteps = () => {
    console.log('called on submit step.');
    signRef.current.submitSign();
    // borrowBook();
  };

  const borrowBook = () => {
    Axios.post('http://192.168.42.192:8081/transaction', {
      titleBook: detailReducer.titleBook,
      type: detailReducer.type,
      author: detailReducer.author,
      cover: detailReducer.cover,
      status: 'Borrowed',
      userId: profileReducer.id,
      location: {
        latitude: formPath.location.latitude,
        longitude: formPath.location.longitude,
      },
      date: date,
    })
      .then(res => {
        console.log('res', res);
        dispatch(clearFormPath());
        navigation.push('Dashboard');
      })
      .catch(err => console.log('err', err));
  };

  const fillSurvey = () => {
    Axios.post('http://192.168.42.192:8081/survey', {
      tittleBook: detailReducer.titleBook,
      idBook: detailReducer.id,
      userId: profileReducer.id,
      fullname: profileReducer.fullname,
      date: date,
      repeatedBorrow: surveyReducer.repeatedBorrow,
      reason: surveyReducer.reason,
    })
      .then(res => {
        console.log('res', res);
      })
      .catch(err => console.log('err', err));
  };

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
          onNext={onDetailStepComplete}
          onPrevious={onPrevStep}
          scrollViewProps={defaultScrollViewProps}>
          <DetailForm />
        </ProgressStep>
        <ProgressStep
          previousBtnStyle={{backgroundColor: colors.pink, borderRadius: 20}}
          previousBtnTextStyle={{color: 'white', padding: 10, fontSize: 14}}
          nextBtnStyle={{backgroundColor: colors.pink, borderRadius: 20}}
          nextBtnTextStyle={{color: 'white', padding: 10, fontSize: 14}}
          label="Form"
          onNext={onNextStep}
          onPrevious={onPrevStep}
          scrollViewProps={defaultScrollViewProps}>
          <SignForm />
        </ProgressStep>
        <ProgressStep
          label="Sign"
          previousBtnStyle={{backgroundColor: colors.pink, borderRadius: 20}}
          previousBtnTextStyle={{color: 'white', padding: 10, fontSize: 14}}
          nextBtnStyle={{backgroundColor: colors.pink, borderRadius: 20}}
          nextBtnTextStyle={{color: 'white', padding: 10, fontSize: 14}}
          onPrevious={onPrevStep}
          onSubmit={onSubmitSteps}
          nextBtnDisabled={isSignActive}
          scrollViewProps={defaultScrollViewProps}>
          <SignBook ref={signRef} />
        </ProgressStep>
      </ProgressSteps>
    </View>
  );
};

export default FormProgress;
