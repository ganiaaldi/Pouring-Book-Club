import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React, {useState, useEffect} from 'react';
import ItemTransaction from './ItemTransaction';
import Axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ReturnPage = () => {
  const [transaction, setTransaction] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const savedID = await AsyncStorage.getItem('@idAnggota');
    Axios.get(
      `http://192.168.42.192:8081/transaction?userId=${savedID}&status=Finish`,
    )
      .then(res => {
        console.log('res get data', res.data);
        setTransaction(res.data);
      })
      .catch(err => console.log('err', err));
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
