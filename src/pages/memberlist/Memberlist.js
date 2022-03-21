import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import TabViewNav from '../../navigation/TabViewNav';
import Axios from 'axios';
import ItemTransaction from '../transaction/ItemTransaction';
import {colors} from '../../utils/colors';

const Memberlist = () => {
  const [transaction, setTransaction] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    Axios.get('http://192.168.42.192:8081/users')
      .then(res => {
        console.log('res get member', res.data);
        setTransaction(res.data);
      })
      .catch(err => console.log('err', err));
  };
  return (
    <View style={{flex: 1}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{paddingHorizontal: 10}}>
          {transaction.map(transaction => {
            return (
              <ItemTransaction
                key={transaction.id}
                tittlebook={transaction.id}
                author={transaction.fullname}
                path={transaction.path}
                bgColor={colors.red}
              />
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default Memberlist;

const styles = StyleSheet.create({});
