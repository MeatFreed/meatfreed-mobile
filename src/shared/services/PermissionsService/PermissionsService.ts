import { Platform } from 'react-native';

import {
  check, request, PERMISSIONS, RESULTS,
} from 'react-native-permissions';

const GeolocationConfig = Platform.select({
  ios: PERMISSIONS.IOS.LOCATION_ALWAYS,
  android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
  default: PERMISSIONS.IOS.LOCATION_ALWAYS,
});

const checkGeolocationPermission = async () => {
  const response = await check(GeolocationConfig);

  return response === RESULTS.GRANTED;
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
