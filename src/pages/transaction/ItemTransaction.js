import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {colors} from '../../utils/colors';

const ItemTransaction = ({
  tittlebook,
  type,
  path,
  author,
  onPress,
  onDelete,
}) => {
  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity onPress={onPress}>
        <Image source={{uri: path}} style={styles.avatar} />
      </TouchableOpacity>
      <View style={styles.descContainer}>
        <Text style={styles.tittlebook}>{tittlebook}</Text>
        <Text style={styles.type}>{author}</Text>
        <Text style={styles.author}>{type}</Text>
      </View>
    </View>
  );
};

export default ItemTransaction;

const styles = StyleSheet.create({
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  itemContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    backgroundColor: colors.darkpink,
    borderRadius: 50,
    padding: 20,
  },
  descContainer: {
    marginLeft: 10,
    alignContent: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  tittlebook: {fontSize: 18, fontWeight: 'bold', color: 'white'},
  type: {fontSize: 14, color: 'white'},
  author: {fontSize: 14, color: 'gray'},
});
