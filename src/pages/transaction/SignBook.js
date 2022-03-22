import {ScrollView, Text, View} from 'react-native';
import React, {useRef} from 'react';
import SignPage from '../../component/SignPage';
import styles from '../../utils/styles';
import CustomButton from './../../component/Button';
import {colors} from './../../utils/colors';

const SignBook = () => {
  const signRef = useRef();

  const submitSign = async () => {
    let path = signRef.current.handleOK();
    console.log('signbook', path);
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

        <View style={{alignItems: 'center', marginTop: 20}}>
          <CustomButton
            buttonText="Complete Sign"
            bgColor={colors.pink}
            textColors="white"
            border="white"
            onPress={() => submitSign()}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default SignBook;
