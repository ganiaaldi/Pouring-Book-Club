import {StyleSheet} from 'react-native';
import {colors} from './colors';

export default StyleSheet.create({
  titleHeaderBoldDark: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    color: colors.grayblack,
    fontSize: 30,
  },
  titleHeaderBoldWhite: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    color: 'white',
    fontSize: 30,
  },
  titleBoldDark: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    color: colors.grayblack,
    fontSize: 16,
  },
  titleBoldWhite: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    color: 'white',
    fontSize: 18,
  },
  titleDark: {
    fontFamily: 'Roboto',
    fontWeight: 'normal',
    color: colors.grayblack,
    fontSize: 16,
  },
  titleWhite: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    color: 'white',
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: 'white',
    width: 320,
    borderColor: colors.grayblack,
  },
  inputDisable: {
    borderWidth: 1,
    borderRadius: 20,
    borderColor: colors.grayblack,
    backgroundColor: '#d9d9d9',
  },
});
