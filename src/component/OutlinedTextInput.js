import {StyleSheet, Text, View, TextInput} from 'react-native';
import React, {useEffect, useState} from 'react';
import stylesReus from '../utils/styles';
import {colors} from '../utils/colors';

export const OutlinedTextInput = ({
  placeholderHint,
  onChangeText,
  value,
  hintOutline,
  topColor,
  bottomColor,
}) => {
  const [textMeasure, setTextMeasure] = useState({});

  const onLayout = event => {
    const {x, y, height, width} = event.nativeEvent.layout;
    const heightSpace = height / 2;
    const widthSpace = width + 10;
    const topInput = height / -2 + 2;
    setTextMeasure({x, y, height, width, heightSpace, widthSpace, topInput});
  };

  return (
    <View style={{position: 'relative', marginBottom: 15}}>
      <TextInput
        placeholder={placeholderHint}
        style={{...stylesReus.input, position: 'relative'}}
        // secureTextEntry={true}
        onChangeText={onChangeText}
        value={value}
      />
      <View
        style={{
          flexDirection: 'column',
          width: textMeasure.width,
          position: 'absolute',
          height: textMeasure.height,
          top: textMeasure.topInput,
          left: 8,
        }}>
        <View
          style={{
            height: textMeasure.heightSpace,
            width: textMeasure.widthSpace,
            backgroundColor: topColor,
          }}
        />
        <View
          style={{
            height: textMeasure.heightSpace,
            width: textMeasure.widthSpace,
            backgroundColor: bottomColor,
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
