import React from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import Chips from './Chips';

class SelectedChips extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedChips: [],
      isFocused: false,
      chips: props.initialChips ? props.initialChips : [],
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      chips: nextProps.initialChips ? nextProps.initialChips : [],
    });
  }

  selectChip = value => {
    if (this.isSelected(value)) {
      let array = [...this.state.selectedChips];
      console.log('select 1', array);
      let result = array.filter(text => {
        console.log('select 2', text);
        console.log('select 3', value);
        return text != value;
      });
      console.log('select 3', result);
      this.setState(
        {
          selectedChips: result,
        },
        () =>
          this.props.onChangeChips &&
          this.props.onChangeChips(this.state.selectedChips),
      );
      if (this.props.alertRequired) {
        Alert.alert('', 'Unselected');
      }
    } else {
      let array = [...this.state.selectedChips];
      console.log('select 4', array);
      console.log('select 5', value);
      // use unshift if wanna multiple select
      // array.unshift(value);
      array[0] = value;
      console.log('select 6', array);
      this.setState(
        {
          selectedChips: array,
        },
        () =>
          this.props.onChangeChips &&
          this.props.onChangeChips(this.state.selectedChips),
      );
      if (this.props.alertRequired) {
        Alert.alert('', 'Selected');
      }
    }
  };
  isSelected = value => {
    let array = [...this.state.selectedChips];
    return array.includes(value);
  };
  render() {
    const {chipStyle, valueStyle, valueStyleSelected, chipStyleSelected} =
      this.props;

    const chips = this.state.chips.map((item, index) => (
      <Chips
        key={index}
        value={item}
        chipStyle={chipStyle}
        valueStyle={valueStyle}
        valueStyleSelected={valueStyleSelected}
        chipStyleSelected={chipStyleSelected}
        onPress={() => this.selectChip(item)}
        type="selectable"
        selected={this.isSelected(item)}
      />
    ));
    return (
      <View>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'center',
          }}>
          {chips}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({});

export default SelectedChips;
