import {StyleSheet, Text, View, ScrollView, Alert} from 'react-native';
import React, {useState, useEffect} from 'react';
import ItemTransaction from './ItemTransaction';
import Axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {colors} from '../../utils/colors';
import {useSelector, useDispatch} from 'react-redux';
import {setReturnBook} from '../../redux';
import {BASE_URL} from '../../utils/api';

const ReturnPage = () => {
  const [transaction, setTransaction] = useState([]);
  const dispatch = useDispatch();
  const transactionReducer = useSelector(state => state.transactionReducer);

  useEffect(() => {
    getData();
  }, [transactionReducer]);

  const getData = async () => {
    const savedID = await AsyncStorage.getItem('@idAnggota');
    Axios.get(
      `http://192.168.42.192:8081/transaction?userId=${savedID}&status=Finish`,
    )
      .then(res => {
        console.log('res return book', res.data);
        setTransaction(res.data);
      })
      .catch(err => console.log('err', err));
  };

  const deleteBook = async item => {
    console.log('item return book', item);
    Alert.alert('Delete', 'Are you sure to delete this book from list?', [
      // The "Yes" button
      {
        text: 'Yes',
        onPress: () => {
          Axios.delete(`${BASE_URL}/transaction/${item.id}`)
            .then(res => {
              console.log('res', res);
              dispatch(
                setReturnBook({
                  isBorrowed: transactionReducer.isBorrowed + 1,
                }),
              );
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
                onPress={() => deleteBook(transaction)}
              />
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default ReturnPage;

const styles = StyleSheet.create({});
