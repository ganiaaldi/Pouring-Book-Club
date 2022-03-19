import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {colors} from '../utils/colors';

const CustomButton = ({buttonText, onPress, bgColor, textColors}) => {
  return (
    <View>
      <TouchableOpacity>
        <Text
          style={{
            ...styles.button,
            backgroundColor: bgColor,
            color: textColors,
          }}
          onPress={onPress}>
          {buttonText}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'green',
    marginTop: 10,
    paddingHorizontal: 120,
    paddingVertical: 20,
    color: 'white',
    borderRadius: 40,
    alignContent: 'center',
    textAlign: 'center',
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: 16,
    borderColor: colors.grayblack,
    borderWidth: 1,
  },
});
