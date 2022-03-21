import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import styles from '../../utils/styles';
import {colors} from '../../utils/colors';
import BookCard from '../../component/BookCard';
import BookCardSquare from '../../component/BookCardSquare';
import {FlatGrid} from 'react-native-super-grid';
import {useDispatch, useSelector} from 'react-redux';
import {setDetailPage} from '../../redux';

const Homepage = ({route, navigation}) => {
  const [book, setBook] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    Axios.get('http://192.168.42.192:8081/book')
      .then(res => {
        console.log('res get list book', res.data);
        setBook(res.data);
      })
      .catch(err => console.log('err', err));
  };

  const selectItem = (item, input) => {
    console.log('item', item);
    dispatch(setDetailPage(item));
    navigation.navigate('DetailBook');
  };

  return (
    <View style={{flex: 1, paddingHorizontal: 10}}>
      <View>
        <Text style={{...styles.titleBoldDark, marginTop: 20}}>
          New Incoming Books
        </Text>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          horizontal>
          <View
            style={{
              paddingHorizontal: 10,
              flexDirection: 'row',
              height: 160,
            }}>
            {book.map(book => {
              return (
                <BookCard
                  key={book.id}
                  tittlebook={book.titleBook}
                  type={book.type}
                  author={book.author}
                  path={book.cover}
                  onPress={() => selectItem(book)}
                />
              );
            })}
          </View>
        </ScrollView>
      </View>
      <Text style={{...styles.titleBoldDark, marginTop: 20}}>List Books</Text>
      <FlatGrid
        itemDimension={130}
        data={book}
        style={styles.gridView}
        showsVerticalScrollIndicator={false}
        spacing={10}
        renderItem={({item}) => (
          <BookCardSquare
            key={item.id}
            tittlebook={item.titleBook}
            type={item.type}
            author={item.author}
            path={item.cover}
            onPress={() => selectItem(item)}
          />
        )}
      />
    </View>
  );
};

export default Homepage;
