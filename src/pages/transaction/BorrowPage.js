import {StyleSheet, Text, View, ScrollView, Alert} from 'react-native';
import React, {useState, useEffect} from 'react';
import ItemTransaction from './ItemTransaction';
import Axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {colors} from '../../utils/colors';
import {useSelector, useDispatch} from 'react-redux';
import {setReturnBook} from '../../redux';
import {BASE_URL} from './../../utils/api';

const BorrowPage = () => {
  const [transaction, setTransaction] = useState([]);
  const transactionReducer = useSelector(state => state.transactionReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    getData();
  }, [transactionReducer]);

  const getData = async () => {
    const savedID = await AsyncStorage.getItem('@idAnggota');
    Axios.get(`${BASE_URL}/transaction?userId=${savedID}&status=Borrowed`)
      .then(res => {
        console.log('res borrowed book', res.data);
        setTransaction(res.data);
      })
      .catch(err => console.log('err', err));
  };

  const returnBook = async item => {
    console.log('item return book', item);
    const savedID = await AsyncStorage.getItem('@idAnggota');
    Alert.alert('Return Book', 'Are you sure you want to return book?', [
      // The "Yes" button
      {
        text: 'Yes',
        onPress: () => {
          Axios.put(`${BASE_URL}/transaction/${item.id}`, {
            titleBook: item.titleBook,
            type: item.type,
            author: item.author,
            cover: item.cover,
            status: 'Finish',
            userId: parseInt(savedID),
          })
            .then(res => {
              console.log('res', res);
              dispatch(
                setReturnBook({
                  isBorrowed: transactionReducer.isBorrowed + 1,
                }),
              );
              // setBorrowBookCheck(borrowBookCheck + 1);
            })
            .catch(err => console.log('err', err));
        },
      },
      // The "No" button
      // Does nothing but dismiss the dialog when tapped
      {
        text: 'No',
      },
    ]);
  };
  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{paddingHorizontal: 10}}>
          {transaction.map(transaction => {
            return (
              <ItemTransaction
                key={transaction.id}
                tittlebook={transaction.titleBook}
                type={transaction.type}
                author={transaction.author}
                path={transaction.cover}
                bgColor={colors.darkpink}
                onPress={() => returnBook(transaction)}
              />
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default BorrowPage;

const styles = StyleSheet.create({});
