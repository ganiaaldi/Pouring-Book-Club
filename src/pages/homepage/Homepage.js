import {StyleSheet, Text, View, ScrollView, TextInput} from 'react-native';
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
  const [search, setSearch] = useState('');
  const [filterBook, setFilterBook] = useState([]);
  const [typeBook, setTypeBook] = useState([]);
  const [book, setBook] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getData = async () => {
    Axios.get('http://192.168.42.192:8081/book')
      .then(res => {
        console.log('res get list book', res.data);
        setBook(res.data);
        setFilterBook(res.data);
        getTypeData();
      })
      .catch(err => console.log('err', err));
  };

  const getTypeData = async x => {
    const uniqueTags = [];
    await Promise.all(
      book.map(it => {
        if (uniqueTags.indexOf(it.type) === -1) {
          uniqueTags.push(it.type);
        }
      }),
    );
    setTypeBook(uniqueTags);
  };

  const selectItem = (item, input) => {
    console.log('item', item);
    dispatch(setDetailPage(item));
    navigation.navigate('DetailBook');
  };

  const searchFilterFunction = text => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      const newData = book.filter(function (item) {
        const itemData = item.titleBook
          ? item.titleBook.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilterBook(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      setFilterBook(book);
      setSearch(text);
    }
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
      <TextInput
        style={{...styles.input, width: '100%', marginTop: 10}}
        onChangeText={text => searchFilterFunction(text)}
        value={search}
        underlineColorAndroid="transparent"
        placeholder="Search Book"
      />
      <FlatGrid
        itemDimension={130}
        data={filterBook}
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
