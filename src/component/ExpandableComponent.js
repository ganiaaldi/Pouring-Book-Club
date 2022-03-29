// Example of Expandable ListView in React Native
// https://aboutreact.com/expandable-list-view/
// Import React
import React, {useEffect, useState} from 'react';
// Import required components
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {colors} from './../utils/colors';
import {Image} from 'react-native';
import CustomButton from './Button';

export const ExpandableComponent = ({
  item,
  onClickFunction,
  onPress,
  onDelete,
  bgColor,
}) => {
  //Custom Component for the Expandable List
  const [layoutHeight, setLayoutHeight] = useState(0);
  const display = item.isExpanded
    ? styles.itemContainerExpanded
    : styles.itemContainer;

  useEffect(() => {
    if (item.isExpanded) {
      setLayoutHeight(null);
    } else {
      setLayoutHeight(0);
    }
  }, [item.isExpanded]);

  return (
    <View>
      {/*Header of the Expandable List Item*/}
      {/* <TouchableOpacity
        activeOpacity={0.8}
        onPress={onClickFunction}
        style={styles.header}>
        <Text style={styles.headerText}>{item.category_name}</Text>
      </TouchableOpacity> */}
      <View style={display}>
        <TouchableOpacity onPress={onClickFunction}>
          <Image source={{uri: item.cover}} style={styles.avatar} />
        </TouchableOpacity>
        <View style={styles.descContainer}>
          <Text style={styles.tittlebook}>{item.titleBook}</Text>
          <Text style={styles.type}>{item.author}</Text>
          <Text style={styles.author}>{item.type}</Text>
        </View>
      </View>
      <View
        style={{
          height: layoutHeight,
          overflow: 'hidden',
        }}>
        {/*Content under the header of the Expandable List Item*/}
        <View style={styles.content}>
          <Text style={styles.text}>Tanggal Pinjam. {item.date}</Text>
          <CustomButton
            buttonText="Return Book"
            bgColor={colors.darkpink}
            textColors="white"
            key={item.id}
            onPress={() => onPress()}
            width={250}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleText: {
    flex: 1,
    fontSize: 22,
    fontWeight: 'bold',
  },
  header: {
    backgroundColor: '#F5FCFF',
    padding: 20,
  },
  headerText: {
    fontSize: 16,
    fontWeight: '500',
  },
  separator: {
    height: 0.5,
    backgroundColor: '#808080',
    width: '95%',
    marginLeft: 16,
    marginRight: 16,
  },
  text: {
    fontSize: 16,
    color: '#606070',
    padding: 10,
  },
  content: {
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: colors.lightbrown,
    paddingBottom: 20,
    alignItems: 'flex-end',
  },
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
    borderColor: colors.grayblack,
    padding: 20,
  },
  itemContainerExpanded: {
    flexDirection: 'row',
    backgroundColor: colors.darkpink,
    borderColor: colors.grayblack,
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
