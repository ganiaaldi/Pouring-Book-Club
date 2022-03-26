import {StyleSheet, Text, View, ScrollView, TextInput} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from '../../utils/styles';
import {useSelector} from 'react-redux';
import RadioGroup from 'react-native-radio-buttons-group';
import {colors} from './../../utils/colors';
import DropDownPicker from 'react-native-dropdown-picker';
import {SafeAreaView} from 'react-native-safe-area-context';

const SignForm = () => {
  const profileReducer = useSelector(state => state.profileReducer);
  const [radioButtons, setRadioButtons] = useState(radioButtonsData);
  const [isYesRadio, setIsYesRadio] = useState(false);
  const display = isYesRadio ? 'flex' : 'none';
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {value: '1', label: 'Not yet finished reading'},
    {value: '2', label: 'For Research Purpose'},
    {value: '3', label: 'Normal'},
    {value: '4', label: 'Interested to re-reading'},
    {value: '5', label: 'No special reason'},
  ]);

  function onPressRadioButton(radioButtonsArray) {
    setRadioButtons(radioButtonsArray);
    let selectedRadio = radioButtonsArray.find(e => e.selected)?.value;
    if (selectedRadio == true) {
      setIsYesRadio(true);
    } else {
      setIsYesRadio(false);
    }
    console.log('cek radio', selectedRadio);
  }

  useEffect(() => {
    console.log('profile reducer', profileReducer);
  }, [profileReducer]);

  return (
    <View style={{flex: 1, padding: 15}}>
      <SafeAreaView>
        <Text style={{...styles.titleHeaderBoldDark, fontSize: 22}}>
          Fill Form
        </Text>
        <View style={{marginTop: 10}}>
          <Text style={styles.titleBoldDark}>Member ID</Text>
          <TextInput
            editable={false}
            selectTextOnFocus={false}
            style={styles.inputDisable}
            value={profileReducer.id}
          />
        </View>
        <View style={{marginTop: 10}}>
          <Text style={styles.titleBoldDark}>Member Name</Text>
          <TextInput
            editable={false}
            selectTextOnFocus={false}
            style={styles.inputDisable}
            value={profileReducer.fullname}
          />
        </View>
        <View style={{marginTop: 10}}>
          <Text style={styles.titleBoldDark}>
            Have you ever borrow this book?
          </Text>
          <RadioGroup
            radioButtons={radioButtons}
            onPress={onPressRadioButton}
            layout="row"
          />
        </View>
        <View style={[{display}]}>
          <Text style={styles.titleBoldDark}>
            What reason you borrow this book again?
          </Text>
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            listMode="SCROLLVIEW"
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

const radioButtonsData = [
  {
    id: '1', // acts as primary key, should be unique and non-empty string
    label: 'Yes',
    value: true,
    color: colors.pink,
    borderColor: colors.grayblack,
  },
  {
    id: '2',
    label: 'No',
    value: false,
    color: colors.pink,
    borderColor: colors.grayblack,
  },
];

export default SignForm;

const style = StyleSheet.create({});
