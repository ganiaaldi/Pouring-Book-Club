import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {OutlinedTextInput} from './../../component/OutlinedTextInput';
import {colors} from './../../utils/colors';

const FormInput = () => {
  return (
    <View style={{flex: 1, padding: 20, backgroundColor: 'white'}}>
      <OutlinedTextInput
        hintOutline={'Name'}
        placeholderHint={'Enter Fullname'}
        onChangeText={value => {}}
        topColor={'white'}
      />
      <OutlinedTextInput
        hintOutline={'Address'}
        placeholderHint={'Enter Full Address'}
        onChangeText={value => {}}
        topColor={'white'}
      />
      <OutlinedTextInput
        hintOutline={'Email'}
        placeholderHint={'Enter Email'}
        onChangeText={value => {}}
        topColor={'white'}
      />
      <OutlinedTextInput
        hintOutline={'Password'}
        placeholderHint={'Enter Password'}
        onChangeText={value => {}}
        topColor={'white'}
      />
      <OutlinedTextInput
        hintOutline={'Confirmation Password'}
        placeholderHint={'Enter Confirmation Password'}
        onChangeText={value => {}}
        topColor={'white'}
      />
    </View>
  );
};

export default FormInput;

const styles = StyleSheet.create({});
