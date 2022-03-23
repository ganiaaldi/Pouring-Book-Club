import {StyleSheet, Image} from 'react-native';
import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Homepage from './homepage/Homepage';
import Memberlist from './memberlist/Memberlist';
import ProfilePage from './profile/ProfilePage';
import {colors} from '../utils/colors';

const Tab = createBottomTabNavigator();

const Dashboard = () => {
  useEffect(() => {
    console.log('dashboard');
  }, []);

  return (
    <Tab.Navigator
      initialRouteName="Profile"
      screenOptions={{
        tabBarInactiveBackgroundColor: colors.pink,
        tabBarActiveTintColor: 'white',
        tabBarActiveBackgroundColor: colors.pink,
        tabBarIndicatorStyle: {
          backgroundColor: 'white',
          height: 2,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Homepage}
        options={{
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: colors.pink,
          },
          tabBarLabel: 'Home',
          tabBarIcon: ({focused, tintColor}) => (
            <Image
              focused={focused}
              source={require('../assets/icons/home.png')}
              tintColor={focused ? 'white' : colors.lightgray}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Member"
        component={Memberlist}
        options={{
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: colors.pink,
          },
          tabBarLabel: 'Member',
          tabBarIcon: ({focused, tintColor}) => (
            <Image
              focused={focused}
              source={require('../assets/icons/account-group.png')}
              tintColor={focused ? 'white' : colors.lightgray}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfilePage}
        options={{
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: colors.pink,
          },
          tabBarLabel: 'profile',
          tabBarIcon: ({focused, tintColor}) => (
            <Image
              focused={focused}
              source={require('../assets/icons/account.png')}
              tintColor={focused ? 'white' : colors.lightgray}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Dashboard;

const styles = StyleSheet.create({});
