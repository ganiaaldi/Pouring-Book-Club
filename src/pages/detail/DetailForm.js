import {View, Text, ScrollView, TextInput} from 'react-native';
import React, {useEffect} from 'react';
import styles from '../../utils/styles';
import {colors} from './../../utils/colors';
import {useSelector} from 'react-redux';

const DetailForm = () => {
  const detailReducer = useSelector(state => state.detailReducer);

  useEffect(() => {
    console.log('detail reducer', detailReducer.id);
  }, [detailReducer]);

  return (
    <View style={{flex: 1, padding: 15}}>
      <ScrollView>
        <Text style={{...styles.titleHeaderBoldDark, fontSize: 22}}>
          Detail Book Form
        </Text>
        <View style={{marginTop: 10}}>
          <Text style={styles.titleBoldDark}>ID Book</Text>
          <TextInput
            editable={false}
            selectTextOnFocus={false}
            style={styles.inputDisable}
            value={detailReducer.id.toString()}
          />
        </View>
        <View style={{marginTop: 10}}>
          <Text style={styles.titleBoldDark}>Tittle Book</Text>
          <TextInput
            editable={false}
            selectTextOnFocus={false}
            style={styles.inputDisable}
            value={detailReducer.titleBook}
          />
        </View>
        <View style={{marginTop: 10}}>
          <Text style={styles.titleBoldDark}>Type</Text>
          <TextInput
            editable={false}
            selectTextOnFocus={false}
            style={styles.inputDisable}
            value={detailReducer.type}
          />
        </View>
        <View style={{marginTop: 10}}>
          <Text style={styles.titleBoldDark}>Author</Text>
          <TextInput
            editable={false}
            selectTextOnFocus={false}
            style={styles.inputDisable}
            value={detailReducer.author}
          />
        </View>
        <View style={{marginTop: 10}}>
          <Text style={styles.titleBoldDark}>Publisher</Text>
          <TextInput
            editable={false}
            selectTextOnFocus={false}
            style={styles.inputDisable}
            value={detailReducer.publisher}
          />
        </View>
        <View style={{marginTop: 10}}>
          <Text style={styles.titleBoldDark}>Pages</Text>
          <TextInput
            editable={false}
            selectTextOnFocus={false}
            style={styles.inputDisable}
            value={detailReducer.pages.toString()}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default DetailForm;
