import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import Splash from './Splash';
import SplashScreen from 'react-native-splash-screen';
import styles from '../utils/styles';

const App = () => {
  useEffect(() => {
    console.log('splash');
    SplashScreen.hide();
  });

  return (
    <View>
      <Text style={{fontFamily: 'normal'}}> normal </Text>
      <Text style={{fontFamily: 'notoserif'}}> notoserif </Text>
      <Text style={{fontFamily: 'sans-serif'}}> sans-serif </Text>
      <Text style={{fontFamily: 'sans-serif-light'}}> sans-serif-light </Text>
      <Text style={{fontFamily: 'sans-serif-thin'}}> sans-serif-thin </Text>
      <Text style={{fontFamily: 'sans-serif-condensed'}}>
        {' '}
        sans-serif-condensed{' '}
      </Text>
      <Text style={{fontFamily: 'sans-serif-medium'}}> sans-serif-medium </Text>
      <Text style={{fontFamily: 'serif'}}> serif </Text>
      <Text style={{fontFamily: 'Roboto', fontWeight: 'bold'}}> Roboto </Text>
      <Text style={{fontFamily: 'monospace'}}> monospace </Text>
      <Text> monospace </Text>
      <Text style={styles.titleDark}> monospace </Text>
    </View>
  );
};

export default App;
