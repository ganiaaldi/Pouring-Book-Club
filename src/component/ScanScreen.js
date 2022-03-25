import React, {Component, useRef, useState} from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import Axios from 'axios';
import {useDispatch} from 'react-redux';
import {setDetailPage} from './../redux/actions/actions';
import {colors} from './../utils/colors';

const ScanScreen = ({route, navigation}) => {
  const [isFlash, setIsFlash] = useState(false);
  const [flash, setFlash] = useState(RNCamera.Constants.FlashMode.off);
  const dispatch = useDispatch();

  const onSuccess = item => {
    console.log('check qr', item.data);
    Axios.get(`http://192.168.42.192:8081/book/${item.data}`)
      .then(res => {
        console.log('res get qr book', res.data);
        dispatch(setDetailPage(res.data));
        navigation.replace('DetailBook');
      })
      .catch(err => console.log('err', err));
  };

  const flashFunction = () => {
    console.log('flash', isFlash);
    if (isFlash) {
      setFlash(RNCamera.Constants.FlashMode.off);
      setIsFlash(false);
    } else {
      setFlash(RNCamera.Constants.FlashMode.torch);
      setIsFlash(true);
    }
  };

  return (
    <QRCodeScanner
      onRead={onSuccess}
      flashMode={flash}
      topContent={
        <Text style={styles.centerText}>
          Scan QR on pyshical book to get detail book.
        </Text>
      }
      bottomContent={
        <TouchableOpacity
          style={styles.buttonTouchable}
          onPress={flashFunction}>
          <Text style={styles.buttonText}>Flash</Text>
        </TouchableOpacity>
      }
    />
  );
};
const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
    textAlign: 'center',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 18,
    color: colors.grayblack,
  },
  buttonTouchable: {
    padding: 16,
  },
});

export default ScanScreen;
