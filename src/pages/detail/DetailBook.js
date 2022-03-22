import {ScrollView, Text, View, Image} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styles from '../../utils/styles';
import {CustomButton} from '../../component';
import {colors} from './../../utils/colors';
import Axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DetailBook = ({route, navigation}) => {
  const detailReducer = useSelector(state => state.detailReducer);

  useEffect(() => {
    console.log('detail data', detailReducer);
  }, [detailReducer]);

  const borrowBook = async () => {
    // const savedID = await AsyncStorage.getItem('@idAnggota');
    // console.log('saved ID', savedID);
    // Axios.post('http://192.168.42.192:8081/transaction', {
    //   titleBook: detailReducer.titleBook,
    //   type: detailReducer.type,
    //   author: detailReducer.author,
    //   cover: detailReducer.cover,
    //   status: 'Borrowed',
    //   userId: parseInt(savedID),
    // })
    //   .then(res => {
    //     console.log('res', res);
    //     navigation.push('Dashboard');
    //   })
    //   .catch(err => console.log('err', err));
    navigation.navigate('SignBook');
  };

  return (
    <View style={{flex: 1, padding: 10}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 10,
          }}>
          <Image
            source={{uri: detailReducer.cover}}
            style={{
              width: 250,
              height: 350,
              resizeMode: 'contain',
            }}
          />
        </View>
        <View style={{alignItems: 'center', marginTop: 5}}>
          <Text style={styles.titleHeaderBoldDark}>. . .</Text>
          <Text style={{...styles.titleHeaderBoldDark, textAlign: 'center'}}>
            {detailReducer.titleBook}
          </Text>
          <Text style={styles.titleBoldDark}>
            Author by {detailReducer.author}
          </Text>
          <Text style={styles.titleHeaderBoldDark}>. . .</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              flexDirection: 'column',
              flexBasis: '50%',
              alignContent: 'center',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: 'gray',
            }}>
            <Text style={styles.titleDark}>Publisher</Text>
            <Text style={styles.titleBoldDark}>{detailReducer.publisher}</Text>
          </View>
          <View
            style={{
              flexDirection: 'column',
              flexBasis: '50%',
              alignContent: 'center',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: 'gray',
            }}>
            <Text style={styles.titleDark}>Pages</Text>
            <Text style={styles.titleBoldDark}>{detailReducer.pages}</Text>
          </View>
        </View>
        <Text style={{...styles.titleBoldDark, marginTop: 10}}>Synopsis</Text>
        <Text style={{...styles.titleDark, textAlign: 'justify'}}>
          {detailReducer.sinopsis}
        </Text>
      </ScrollView>
      <View style={{alignItems: 'center'}}>
        <CustomButton
          buttonText="Borrow Book"
          bgColor={colors.pink}
          textColors="white"
          border="white"
          onPress={borrowBook}
        />
      </View>
    </View>
  );
};

export default DetailBook;
