import {
  Image,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import styles from '../../utils/styles';
import {colors} from '../../utils/colors';
import BookCard from '../../component/BookCard';
import BookCardSquare from '../../component/BookCardSquare';
import {FlatGrid} from 'react-native-super-grid';
import {useDispatch, useSelector} from 'react-redux';
import {setDetailPage} from '../../redux';
import SelectedChips from './../../component/SelectedChips';
import {searchIcon} from '../../assets';
import fabList from './../../component/FloatingActionButton';
import {FloatingAction} from 'react-native-floating-action';

const Homepage = ({route, navigation}) => {
  const [search, setSearch] = useState('');
  const [filterBook, setFilterBook] = useState([]);
  const [typeBook, setTypeBook] = useState([]);
  const [book, setBook] = useState([]);
  const [sortText, setSortText] = useState('ID');
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

  const chipsFilterFunction = chips => {
    // Check if searched chips is not blank
    if (chips) {
      // Inserted text is not blank
      const newData = book.filter(function (item) {
        const itemData = item.type ? item.type.toUpperCase() : ''.toUpperCase();
        const textData = chips.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilterBook(newData);
    } else {
      // Inserted chips is blank
      setFilterBook(book);
    }
  };

  const selectFab = item => {
    if (item === 'fab_qr') {
      navigation.navigate('ScanScreen');
    }
  };

  const sortData = () => {
    if (sortText === 'A-Z') {
      setSortText('Z-A');
      filterBook.sort((a, b) => b.titleBook.localeCompare(a.titleBook));
    } else if (sortText === 'Z-A') {
      setSortText('ID');
      filterBook.sort((a, b) => a.id - b.id);
    } else {
      setSortText('A-Z');
      filterBook.sort((a, b) => a.titleBook.localeCompare(b.titleBook));
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
      <View>
        <TextInput
          style={{...styles.input, width: '100%', marginTop: 10}}
          onChangeText={text => searchFilterFunction(text)}
          value={search}
          underlineColorAndroid="transparent"
          placeholder="Search Book"
        />
        <Image
          source={searchIcon}
          style={{
            width: 30,
            height: 30,
            position: 'absolute',
            right: 20,
            top: 20,
          }}
        />
      </View>
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 9}}>
          <SelectedChips
            initialChips={['Novel', 'Komik']}
            onChangeChips={chips => chipsFilterFunction(chips[0])}
            alertRequired={false}
          />
        </View>
        <TouchableOpacity
          onPress={sortData}
          style={{
            height: 30,
            padding: 5,
            borderRadius: 5,
            borderWidth: 1,
            flex: 1,
            marginTop: 10,
            backgroundColor: 'white',
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontWeight: 'bold',
            }}>
            {sortText}
          </Text>
        </TouchableOpacity>
      </View>
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
      <FloatingAction
        actions={fabList}
        color={colors.pink}
        onPressItem={item => {
          selectFab(item);
        }}
      />
    </View>
  );
};

export default Homepage;
