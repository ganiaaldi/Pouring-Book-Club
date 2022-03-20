import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../../utils/styles';
import {CustomButton} from '../../component';
import {colors} from '../../utils/colors';
import Axios from 'axios';
import TabViewNav from '../../navigation/TabViewNav';

const ProfilePage = ({route, navigation}) => {
  const [user, setUser] = useState({});

  // Load data when the app starts
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const savedID = await AsyncStorage.getItem('@idAnggota');
    Axios.get(`http://192.168.42.192:8081/users/${savedID}`)
      .then(res => {
        console.log('res get data', res.data);
        setUser(res.data);
      })
      .catch(err => console.log('err', err));
  };

  const removeNickname = async () => {
    try {
      console.log('logout');
      await AsyncStorage.removeItem('@idAnggota');
      navigation.navigate('Login');
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          alignContent: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 30,
          marginBottom: 20,
        }}>
        <Image
          source={{uri: user.path}}
          style={{
            width: 150,
            height: 150,
            backgroundColor: 'pink',
            borderRadius: 150,
            borderWidth: 1,
            borderColor: colors.grayblack,
          }}
        />
        <Text style={{...styles.titleBoldDark, marginTop: 20}}>
          {user.fullname}
        </Text>
        <CustomButton
          buttonText="Edit Users"
          bgColor={colors.pink}
          textColors="white"
          // onPress={() => navigation.navigate('Dashboard')}
          // onPress={saveID}
        />
        <CustomButton
          buttonText="Logout"
          textColors={colors.pink}
          bgColor="white"
          // onPress={() => navigation.navigate('Dashboard')}
          onPress={removeNickname}
        />
      </View>
      <TabViewNav />
    </View>
  );
};

export default ProfilePage;
