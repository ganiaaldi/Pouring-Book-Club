import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Alert,
  Platform,
  UIManager,
  LayoutAnimation,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import ItemTransaction from './ItemTransaction';
import Axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {colors} from '../../utils/colors';
import {useSelector, useDispatch} from 'react-redux';
import {setReturnBook} from '../../redux';
import {BASE_URL} from './../../utils/api';
import {ExpandableComponent} from './../../component/ExpandableComponent';

const BorrowPage = () => {
  const [transaction, setTransaction] = useState([]);
  const transactionReducer = useSelector(state => state.transactionReducer);
  const [listDataSource, setListDataSource] = useState();
  const [multiSelect, setMultiSelect] = useState(false);
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
        setListDataSource(res.data);
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

  if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  const updateLayout = index => {
    console.log('cek index', index);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const array = [...listDataSource];
    if (multiSelect) {
      // If multiple select is enabled
      array[index].isExpanded = !array[index].isExpanded;
    } else {
      // If single select is enabled
      array.map((value, placeindex) =>
        placeindex === index
          ? (array[placeindex].isExpanded = !array[placeindex].isExpanded)
          : (array[placeindex].isExpanded = false),
      );
    }
    setListDataSource(array);
  };

  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{paddingHorizontal: 10}}>
          {transaction.map((item, key) => {
            return (
              // <ItemTransaction
              //   key={transaction.id}
              //   tittlebook={transaction.titleBook}
              //   type={transaction.type}
              //   author={transaction.author}
              //   path={transaction.cover}
              //   bgColor={colors.darkpink}
              //   onPress={() => returnBook(transaction)}
              // />
              <ExpandableComponent
                key={item.id}
                onClickFunction={() => {
                  updateLayout(key);
                }}
                item={item}
                onPress={() => returnBook(item)}
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
