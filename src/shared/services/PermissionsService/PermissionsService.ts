import { isIOS } from 'helpers';
import { PermissionsAndroid, Platform } from 'react-native';

import {
  check, request, PERMISSIONS, RESULTS,
} from 'react-native-permissions';

const GeolocationConfig = Platform.select({
  ios: PERMISSIONS.IOS.LOCATION_ALWAYS,
  android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
  default: PERMISSIONS.IOS.LOCATION_ALWAYS,
});

const checkGeolocationPermission = async () => {
  if (isIOS) {
    const response = await check(GeolocationConfig);

    return response === RESULTS.GRANTED;
  }

  const granted = await PermissionsAndroid.requestMultiple([
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
  ]);

  const isGranted = granted['android.permission.READ_EXTERNAL_STORAGE'] === 'granted'
    || granted['android.permission.WRITE_EXTERNAL_STORAGE'] === 'granted';

  return isGranted;
};

const requestGeolocationPermission = async () => {
  const permission = await checkGeolocationPermission();

  if (permission) {
    return true;
  }

  const status = await request(GeolocationConfig);

  return status === RESULTS.GRANTED;
};

export const PermissionsService = {
  checkGeolocationPermission,
  requestGeolocationPermission,
};
