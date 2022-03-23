import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import React, {
  useEffect,
  useState,
  useRef,
  useImperativeHandle,
  forwardRef,
} from 'react';
import {colors} from '../utils/colors';
import RNLocation from 'react-native-location';
import {useSelector, useDispatch} from 'react-redux';
import {setPath} from '../redux';

const LocationPage = (props, ref) => {
  const reff = useRef();
  const [viewLocation, isViewLocation] = useState([]);
  const formPath = useSelector(state => state.formPath);
  const dispatch = useDispatch();
  const [loading, isLoading] = useState(false);

  useEffect(() => {
    // console.log('get path', formPath);
  }, []);

  RNLocation.configure({
    distanceFilter: 0,
    desiredAccuracy: {
      ios: 'best',
      android: 'highAccuracy',
    },
    // Android only
    androidProvider: 'auto',
    interval: 10000, // Milliseconds
    // fastestInterval: 15000, // Milliseconds
    // maxWaitTime: 15000, // Milliseconds
    // // iOS Only
    activityType: 'other',
    allowsBackgroundLocationUpdates: false,
    headingFilter: 1, // Degrees
    headingOrientation: 'portrait',
    pausesLocationUpdatesAutomatically: false,
    showsBackgroundLocationIndicator: false,
  });

  const permissionHandle = async () => {
    let location;
    let permission;

    if (!permission) {
      permission = await RNLocation.requestPermission({
        ios: 'whenInUse',
        android: {
          detail: 'fine',
          rationale: {
            title: 'We need to access your location',
            message: 'We use your location to show where you are on the map',
            buttonPositive: 'OK',
            buttonNegative: 'Cancel',
          },
        },
      });
      console.log(permission);
      isLoading(true);
      await RNLocation.getLatestLocation()
        .then(res => {
          console.log('latestLocation', res);
          isViewLocation(res);
          dispatch(setPath('latitude', res.latitude.toString()));
          dispatch(setPath('longitude', res.longitude.toString()));
          isLoading(false);
        })
        .catch(err => console.log('err', err));
    } else {
      console.log('Here 7');
      location = await RNLocation.getLatestLocation();
      console.log(
        location,
        location.longitude,
        location.latitude,
        location.timestamp,
      );
    }
  };

  const submit = async () => {
    // getLokasi();
    await permissionHandle();
    return viewLocation;
  };

  useImperativeHandle(ref, () => ({
    submit,
  }));

  if (loading) {
    return (
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator size="large" color="red" />
      </View>
    );
  }

  return (
    <View style={styles.container} ref={reff}>
      <View>
        <Text>Latitude : {viewLocation.latitude}</Text>
        <Text>longitude : {viewLocation.longitude}</Text>
      </View>
      <TouchableOpacity>
        {/* <Text
          style={{...styles.button, backgroundColor: colors.skyblue}}
          onPress={submit}>
          Submit Location
        </Text> */}
      </TouchableOpacity>
    </View>
  );
};

export default forwardRef(LocationPage);

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#9be09e',
    marginTop: 10,
    padding: 10,
    color: 'white',
    borderRadius: 10,
    alignContent: 'center',
    textAlign: 'center',
  },
});
