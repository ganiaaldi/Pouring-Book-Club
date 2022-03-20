import * as React from 'react';
import {View, StyleSheet, Dimensions, StatusBar, Text} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {colors} from '../utils/colors';
import BorrowPage from './../pages/transaction/BorrowPage';
import ReturnPage from './../pages/transaction/ReturnPage';

const initialLayout = {width: Dimensions.get('window').width};

const renderScene = SceneMap({
  first: BorrowPage,
  second: ReturnPage,
});

const renderTabBar = props => (
  <TabBar
    {...props}
    indicatorStyle={{backgroundColor: 'white'}}
    style={{backgroundColor: colors.pink}}
  />
);

const TabViewNav = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Borrow'},
    {key: 'second', title: 'Return'},
  ]);
  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      style={styles.container}
      renderTabBar={renderTabBar}
    />
  );
};

export default TabViewNav;

const styles = StyleSheet.create({});
