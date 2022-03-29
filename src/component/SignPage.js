import React, {
  Component,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  forwardRef,
} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Alert,
  Button,
  TouchableOpacity,
} from 'react-native';

import RNSketchCanvas from '@terrylinla/react-native-sketch-canvas';
import {useSelector, useDispatch} from 'react-redux';
import {setPathImage, setCount} from '../redux';
import {clearCount} from './../redux/actions/actions';

const SignPage = (props, ref) => {
  const formPath = useSelector(state => state.formPath);
  const dispatch = useDispatch();
  const reff = useRef();
  const [path, setPath] = useState('');

  useEffect(() => {
    console.log('sign path', path);
  }, [path]);

  const clear = async () => {
    await reff.current.clear();
    dispatch(clearCount());
  };

  const handleOK = async () => {
    console.log('sign ok');
    await reff.current.save(
      'jpg',
      false,
      'PouringBookClub',
      String(Math.ceil(Math.random() * 100000000)),
      false,
      false,
      false,
    );
    return path;
  };

  useImperativeHandle(ref, () => ({
    handleOK,
  }));

  return (
    <View style={styles.container}>
      <View
        style={{
          height: 200,
          flexDirection: 'row',
          backgroundColor: 'white',
          borderWidth: 1,
          borderColor: 'black',
          flex: 1,
        }}>
        <View style={styles.functionButton}>
          <TouchableOpacity onPress={clear}>
            <Text style={{color: 'white'}}>Clear</Text>
          </TouchableOpacity>
        </View>
        <RNSketchCanvas
          ref={reff}
          containerStyle={{
            backgroundColor: 'transparent',
            flex: 1,
          }}
          canvasStyle={{
            backgroundColor: 'transparent',
            flex: 1,
          }}
          defaultStrokeIndex={0}
          defaultStrokeWidth={5}
          savePreference={() => {
            return {
              folder: 'PouringBookClub',
              filename: String(Math.ceil(Math.random() * 100000000)),
              transparent: false,
              includeImage: false,
              includeText: false,
              cropToImageSize: false,
              imageType: 'jpg',
            };
          }}
          onSketchSaved={(success, path) => {
            console.log('stat', success);
            console.log('path', path);
            setPath(path);
            Alert.alert(
              success ? 'Image saved!' : 'Failed to save image!',
              path,
            );
            dispatch(setPathImage(path));
          }}
          onPathsChange={pathsCount => {
            console.log('pathsCount', pathsCount);
          }}
          onStrokeEnd={pathsCount => {
            // dispatch(setCount(pathsCount));
            dispatch(setCount(true));
            console.log('stroke end', pathsCount);
          }}
          /* Function Button in canvas
          closeComponent={
            <View style={styles.functionButton}>
              <Text style={{color: 'white'}}>Close</Text>
            </View>
          }
          undoComponent={
            <View style={styles.functionButton}>
              <Text style={{color: 'white'}}>Undo</Text>
            </View>
          }

            clearComponent={
              <View style={styles.functionButton}>
                <Text style={{color: 'white'}}>Clear</Text>
              </View>
            }
          eraseComponent={
            <View style={styles.functionButton}>
              <Text style={{color: 'white'}}>Eraser</Text>
            </View>
          }
          strokeComponent={color => (
            <View
              style={[{backgroundColor: color}, styles.strokeColorButton]}
            />
          )}
          strokeSelectedComponent={(color, index, changed) => {
            return (
              <View
                style={[
                  {backgroundColor: color, borderWidth: 2},
                  styles.strokeColorButton,
                ]}
              />
            );
          }}
          strokeWidthComponent={w => {
            return (
              <View style={styles.strokeWidthButton}>
                <View
                  style={{
                    backgroundColor: 'white',
                    marginHorizontal: 2.5,
                    width: Math.sqrt(w / 3) * 10,
                    height: Math.sqrt(w / 3) * 10,
                    borderRadius: (Math.sqrt(w / 3) * 10) / 2,
                  }}
                />
              </View>
            );
          }}
            saveComponent={
              // handleOK
              <View style={styles.functionButton}>
                <Text style={{color: 'white'}}>Save</Text>
              </View>
            }
            */
        />
      </View>
      <Text>Path : {path}</Text>
    </View>
  );
};

export default forwardRef(SignPage);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: '#F5FCFF',
    borderWidth: 1,
  },
  strokeColorButton: {
    marginHorizontal: 2.5,
    marginVertical: 8,
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  strokeWidthButton: {
    marginHorizontal: 2.5,
    marginVertical: 8,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#39579A',
  },
  functionButton: {
    marginHorizontal: 2.5,
    marginVertical: 8,
    top: 0,
    right: 0,
    height: 30,
    width: 60,
    backgroundColor: '#39579A',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    position: 'absolute',
    zIndex: 1,
  },
});

// AppRegistry.registerComponent('Sign', () => Sign);
