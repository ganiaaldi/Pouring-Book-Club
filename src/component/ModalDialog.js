import React, {useState} from 'react';
import {Button, Text, View, Image, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import {colors} from '../utils/colors';
import Logo from '../assets/icons/svg-logo.svg';
import CustomButton from './Button';

function ModalDialog({title, textYes, textNo, onYes, onCancel}) {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View>
      {/* <Button title="Show modal" onPress={toggleModal} /> */}
      <TouchableOpacity onPress={toggleModal}>
        <Logo width={120} height={40} />
      </TouchableOpacity>
      <Modal
        isVisible={isModalVisible}
        //onback press
        onBackdropPress={() => setModalVisible(false)}>
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 20,
            padding: 20,
          }}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              alignContent: 'center',
            }}>
            <Text>{title}</Text>
            {/* <Image
              source={Logo}
              style={{
                width: 150,
                height: 150,
                resizeMode: 'contain',
              }}
            /> */}

            <Logo width={150} height={150} />
            <TouchableOpacity
              style={{
                backgroundColor: colors.pink,
                padding: 10,
                borderRadius: 10,
                width: 200,
              }}
              onPressIn={toggleModal}
              onPress={onYes}>
              <Text style={{color: 'white', textAlign: 'center'}}>
                {textYes}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                backgroundColor: colors.pink,
                padding: 10,
                borderRadius: 10,
                marginTop: 10,
                width: 200,
              }}
              onPressIn={toggleModal}
              onPress={onCancel}>
              <Text style={{color: 'white', textAlign: 'center'}}>
                {textNo}
              </Text>
            </TouchableOpacity>
            {/* <Button title={textYes} onPress={toggleModal} />
            <Button title={textNo} onPress={toggleModal} /> */}
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default ModalDialog;
