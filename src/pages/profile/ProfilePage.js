import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../../utils/styles';
import {CustomButton} from '../../component';
import {colors} from '../../utils/colors';
import Axios from 'axios';
import TabViewNav from '../../navigation/TabViewNav';
import {useDispatch} from 'react-redux';
import {setProfile} from '../../redux';
import {BASE_URL} from './../../utils/api';

const ProfilePage = ({route, navigation}) => {
  const [user, setUser] = useState({});
  const dispatch = useDispatch();

  // Load data when the app starts
  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getData = async () => {
    const savedID = await AsyncStorage.getItem('@idAnggota');
    Axios.get(`${BASE_URL}/users/${savedID}`)
      .then(res => {
        console.log('res get profile', res.data);
        dispatch(setProfile({id: savedID, fullname: res.data.fullname}));
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
