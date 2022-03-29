import {ScrollView, Text, View} from 'react-native';
import React, {useRef, useEffect, useImperativeHandle, forwardRef} from 'react';
import SignPage from '../../component/SignPage';
import styles from '../../utils/styles';
import LocationPage from './../../component/LocationPage';
import {useSelector, useDispatch} from 'react-redux';

const SignBook = (props, ref) => {
  const signRef = useRef();
  const locationRef = useRef();
  const formPath = useSelector(state => state.formPath);
  const surveyReducer = useSelector(state => state.surveyReducer);

  useEffect(() => {
    console.log('cek sign formpath', formPath);
    console.log('cek sign survey', surveyReducer);
    if (
      formPath.location.latitude === '' ||
      formPath.location.longitude === '' ||
      formPath.photo === ''
    ) {
      console.log('formPath null', formPath);
    } else {
      console.log('formPath not null', formPath);
      saveSign();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formPath]);

  useImperativeHandle(ref, () => ({
    submitSign,
  }));

  const submitSign = async () => {
    signRef.current.handleOK();
    locationRef.current.submit();
  };

  const saveSign = () => {
    console.log('formpath save', formPath);
    // dispatch(clearFormPath());
  };

  return (
    <View style={{flex: 1, padding: 10}}>
      <ScrollView>
        <Text style={{...styles.titleBoldDark, fontSize: 16}}>
          Rules for borrow book :
        </Text>
        <Text style={{...styles.titleDark, marginBottom: 20}}>
          {
            "1. Give the book back in a timely manner. \n2. Ask the lender when they need the book back.\n3. If it's taking a long time to read the book, check in with your friend.\n4.Don't eat messy foods while reading it.\n5.Don't fold over the pages."
          }
        </Text>
        <SignPage ref={signRef} />
        <LocationPage ref={locationRef} />
        {/* <View style={{alignItems: 'center', marginTop: 20}}>
          <CustomButton
            buttonText="Complete Sign"
            bgColor={colors.pink}
            textColors="white"
            border="white"
            onPress={() => submitSign()}
          />
          <CustomButton
            buttonText="Go To Dashboard"
            bgColor={colors.pink}
            textColors="white"
            border="white"
            onPress={() => navigation.push('Dashboard')}
          />
        </View> */}
      </ScrollView>
    </View>
  );
};

export default forwardRef(SignBook);
