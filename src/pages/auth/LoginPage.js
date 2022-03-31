import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  ScrollView,
  Keyboard,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {CustomButton} from '../../component';
import {colors} from '../../utils/colors';
import {icon} from '../../assets';
import AsyncStorage from '@react-native-async-storage/async-storage';
import stylesReus from '../../utils/styles';
import {InputOutline, InputStandard} from 'react-native-input-outline';
import OutlinedTextInput from '../../component/OutlinedTextInput';

const LoginPage = ({route, navigation}) => {
  const [idAnggota, setIdAnggota] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPasswword] = useState('');

  // Create or Update nickname
  const saveID = async () => {
    console.log('cek login', username);
    if (idAnggota === '' || username === '' || password === '') {
      Alert.alert('Warning', 'Fill all form first!');
    } else {
      try {
        console.log('cek idAnggota', idAnggota);
        await AsyncStorage.setItem('@idAnggota', idAnggota);
        navigation.navigate('Dashboard');
      } catch (err) {
        console.log(err);
      }
    }
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image source={icon} style={styles.icon} />
        <Text
          style={{
            ...styles.whiteText,
            marginBottom: 20,
            textAlign: 'center',
          }}>
          Login Member
        </Text>
        <View style={{alignItems: 'center'}}>
          <InputOutline
            placeholder="No. Anggota"
            style={{marginBottom: 20}}
            roundness={20}
            keyboardType="numeric"
            onChangeText={value => {
              setIdAnggota(value);
            }}
            value={idAnggota}
          />
          <InputOutline
            placeholder="Username"
            style={stylesReus.input}
            onChangeText={value => {
              setUsername(value);
            }}
            value={username}
          />
          <TextInput
            placeholder="Password"
            style={{...stylesReus.input, position: 'relative'}}
            secureTextEntry={true}
            onChangeText={value => {
              setPasswword(value);
            }}
            value={password}
          />
          {/* <View style={{position: 'relative'}}>

            <View
              style={{
                flexDirection: 'column',
                width: textMeasure.width,
                position: 'absolute',
                height: textMeasure.height,
                top: -8,
                left: 12,
              }}>
              <View
                style={{
                  height: '50%',
                  width: '100%',
                  backgroundColor: colors.pink,
                }}
              />
              <View
                style={{
                  height: '50%',
                  width: '100%',
                  backgroundColor: colors.white,
                }}
              />
              <View
                onLayout={onLayout}
                style={{
                  position: 'absolute',
                  left: 5,
                }}>
                <Text style={{fontSize: 12}}>
                  Text Activity Report <Text style={{color: 'red'}}>*</Text>
                </Text>
              </View>
            </View>
          </View> */}
          {/* <OutlinedTextInput
            hintOutline={'Password'}
            placeholderHint={'Enter  Password'}
            onChangeText={value => {}}
            topColor={'white'}
          /> */}
        </View>
        <CustomButton
          buttonText="Login"
          bgColor="white"
          textColors={colors.grayblack}
          // onPress={() => navigation.navigate('Dashboard')}
          onPress={saveID}
        />
        <Text
          style={{
            ...styles.whiteTextThin,
            marginTop: 10,
            textAlign: 'center',
          }}>
          Please contact admin if wanna register member.
        </Text>
      </ScrollView>
    </View>
  );
};

export default LoginPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.pink,
    alignItems: 'center',
  },
  whiteText: {
    color: 'white',
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: 24,
  },
  whiteTextThin: {
    color: 'white',
    fontFamily: 'Roboto',
    fontSize: 12,
  },
  icon: {
    width: 300,
    height: 300,
  },
});
