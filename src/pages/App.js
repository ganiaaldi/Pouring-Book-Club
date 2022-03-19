import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import Splash from './Splash';
import SplashScreen from 'react-native-splash-screen';
import styles from '../utils/styles';
import NavigationPage from '../navigation/NavigationPage';

const App = () => {
  useEffect(() => {
    console.log('splash');
    SplashScreen.hide();
  });

  return <NavigationPage />;
};

export default App;
