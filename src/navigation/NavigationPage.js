import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginPage from '../pages/auth/LoginPage';
import Dashboard from '../pages/Dashboard';
import {Provider} from 'react-redux';
import {store} from '../redux';
import DetailBook from './../pages/detail/DetailBook';
import SignBook from './../pages/transaction/SignBook';
import ScanScreen from './../component/ScanScreen';

const Stack = createNativeStackNavigator();

const NavigationPage = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={LoginPage}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Dashboard"
            component={Dashboard}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="DetailBook"
            component={DetailBook}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="SignBook"
            component={SignBook}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="ScanScreen"
            component={ScanScreen}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default NavigationPage;

const styles = StyleSheet.create({});
