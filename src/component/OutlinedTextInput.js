import {StyleSheet, Text, View, TextInput} from 'react-native';
import React, {useEffect, useState} from 'react';
import stylesReus from '../utils/styles';
import {colors} from '../utils/colors';

export const OutlinedTextInput = ({
  placeholderHint,
  onChangeText,
  value,
  hintOutline,
}) => {
  const [textMeasure, setTextMeasure] = useState({});

  const onLayout = event => {
    const {x, y, height, width} = event.nativeEvent.layout;
    console.log(x, y, height, width);
    setTextMeasure({x, y, height, width});
  };
  return (
    <View style={{position: 'relative'}}>
      <TextInput
        placeholder={placeholderHint}
        style={{...stylesReus.input, position: 'relative'}}
        secureTextEntry={true}
        onChangeText={onChangeText}
        value={value}
      />
      <View
        style={{
          flexDirection: 'column',
          width: textMeasure.width,
          position: 'absolute',
          height: textMeasure.height,
          top: -8,
          left: 12,
        }}>
        <View
          style={{
            height: '50%',
            width: '100%',
            backgroundColor: colors.pink,
          }}
        />
        <View
          style={{
            height: '50%',
            width: '100%',
            backgroundColor: colors.white,
          }}
        />
        <View
          onLayout={onLayout}
          style={{
            position: 'absolute',
            left: 5,
          }}>
          <Text style={{fontSize: 12}}>
            {hintOutline} <Text style={{color: 'red'}}>*</Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

export default OutlinedTextInput;

const styles = StyleSheet.create({});
