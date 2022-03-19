import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  ScrollView,
  Keyboard,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {CustomButton} from '../../component';
import {colors} from '../../utils/colors';
import {icon} from '../../assets';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginPage = ({route, navigation}) => {
  const [username, setUsername] = useState();

  // Create or Update nickname
  const saveNickname = async () => {
    try {
      console.log('cek username', username);
      await AsyncStorage.setItem('@username', username);
      navigation.navigate('Dashboard');
    } catch (err) {
      console.log(err);
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
          <TextInput placeholder="No. Anggota" style={styles.input} />
          <TextInput
            placeholder="Username"
            style={styles.input}
            onChangeText={value => {
              setUsername(value);
            }}
          />
          <TextInput
            placeholder="Password"
            style={styles.input}
            secureTextEntry={true}
          />
        </View>
        <CustomButton
          buttonText="Login"
          bgColor="white"
          textColors={colors.grayblack}
          // onPress={() => navigation.navigate('Dashboard')}
          onPress={saveNickname}
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
  input: {
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 20,
    paddingHorizontal: 15,
    backgroundColor: 'white',
    width: 320,
    borderColor: colors.grayblack,
  },
});
