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
  const [topInput, setTopInput] = useState(0);

  const onLayout = event => {
    const {x, y, height, width} = event.nativeEvent.layout;
    setTextMeasure({x, y, height, width});
    setTopInput(height / -2 + 2);
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
          top: topInput,
          left: 8,
        }}>
        <View
          style={{
            height: textMeasure.height / 2,
            width: textMeasure.width + 10,
            backgroundColor: topColor,
          }}
        />
        <View
          style={{
            height: textMeasure.height / 2,
            width: textMeasure.width + 10,
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
