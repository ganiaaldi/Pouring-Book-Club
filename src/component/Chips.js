import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {colors} from './../utils/colors';

const Chips = props => {
  const {
    value,
    onPress,
    chipStyle,
    type,
    selected,
    chipCloseStyle,
    valueStyleSelected,
    chipStyleSelected,
    valueStyle,
  } = props;
  const returnStyles = () => {
    if (type == 'removable') {
      return removableStyles;
    }
    return selectableStyles;
  };
  const returnRemovable = () => {
    if (type == 'removable') {
      return (
        <Text style={[returnStyles().chipCloseBtnTxt, chipCloseStyle]}>x</Text>
      );
    }
  };
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={
          selected
            ? [
                {flexDirection: 'row'},
                returnStyles().chipSelected,
                chipStyle,
                chipStyleSelected,
              ]
            : [{flexDirection: 'row'}, returnStyles().chip, chipStyle]
        }>
        <Text
          style={
            selected
              ? [
                  {paddingHorizontal: 5},
                  returnStyles().valueStyleSelected,
                  valueStyle,
                  valueStyleSelected,
                ]
              : [{paddingHorizontal: 5}, returnStyles().valueStyle, valueStyle]
          }>
          {value}
        </Text>
        {returnRemovable()}
      </View>
    </TouchableOpacity>
  );
};

const removableStyles = StyleSheet.create({
  chip: {
    backgroundColor: '#2196F3',
    borderColor: '#2196F3',
    borderWidth: 1,
    margin: 5,
    padding: 6,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipCloseBtnTxt: {
    fontSize: 20,
    color: '#FFF',
  },
  valueStyle: {
    color: '#FFF',
    fontSize: 20,
  },
});
const selectableStyles = StyleSheet.create({
  chip: {
    backgroundColor: '#FFF',
    borderColor: 'gray',
    borderWidth: 1,
    margin: 5,
    width: 80,
    height: 40,
    padding: 6,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  valueStyle: {
    color: colors.grayblack,
    fontSize: 14,
  },
  chipSelected: {
    backgroundColor: colors.pink,
    borderColor: 'white',
    borderWidth: 1,
    width: 80,
    height: 40,
    margin: 5,
    padding: 6,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  valueStyleSelected: {
    color: '#FFF',
    fontSize: 14,
  },
});
export default Chips;
