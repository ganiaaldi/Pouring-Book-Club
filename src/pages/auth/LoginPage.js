import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {CustomButton} from '../../component';
import {colors} from '../../utils/colors';
import {icon} from '../../assets';

const LoginPage = ({route, navigation}) => {
  const [username, setUsername] = useState();
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
        <TextInput
          placeholder="No. Anggota"
          style={styles.input}
          // value={formReducer.form.name}
          // // onChangeText={value => setName(value)}
          // onChangeText={value => onInputChange(value, 'name')}
        />
        <TextInput
          placeholder="Username"
          style={styles.input}
          value={username}
          // value={formReducer.form.name}
          // // onChangeText={value => setName(value)}
          // onChangeText={value => onInputChange(value, 'name')}
        />
        <TextInput
          placeholder="Password"
          style={styles.input}
          secureTextEntry={true}
          // value={formReducer.form.name}
          // // onChangeText={value => setName(value)}
          // onChangeText={value => onInputChange(value, 'name')}
        />
        <CustomButton
          buttonText="Login"
          bgColor="white"
          textColors={colors.grayblack}
          onPress={() => navigation.navigate('Dashboard')}
        />
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
