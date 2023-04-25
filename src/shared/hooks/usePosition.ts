import { useEffect, useRef, useState } from 'react';
import Geolocation from 'react-native-geolocation-service';
import { isIOS, withDelay } from 'helpers';
import { PermissionsService } from 'services';
import { useTypedDispatch } from 'stores';
import { setCurrentLocation } from 'stores/place';
import { useIsFocused } from '@react-navigation/native';

export const usePosition = () => {
  const isFocused = useIsFocused();

  const [isPermissionDenied, setPermissionDenied] = useState(false);
  const [isPermissionGranted, setPermissionGranted] = useState(false);

  const dispatch = useTypedDispatch();

  const ref = useRef<number>(0);

  const { watchPosition, clearWatch } = Geolocation;

  const onChangeLocation = (position: Geolocation.GeoPosition) => {
    dispatch(setCurrentLocation(position));
  };

  const watchLocation = () => {
    ref.current = watchPosition(
      onChangeLocation,
      undefined,
      { distanceFilter: 5000, interval: 600000, fastestInterval: 600000 },
    );
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      onChangeLocation,
      undefined,
      {
        enableHighAccuracy: true,
        distanceFilter: 10,
      },
    );
  };

  const getPermission = async () => {
    try {
      await withDelay(isIOS ? 1000 : 2000);

      const isGranted = await PermissionsService.requestGeolocationPermission();

      watchLocation();
      setPermissionGranted(isGranted);
      setPermissionDenied(!isGranted);
    } catch (error) {
      setPermissionGranted(false);
      setPermissionDenied(true);
    }
  };

  useEffect(() => {
    if (isFocused) {
      getCurrentLocation();
    }
  }, [isFocused]);

  useEffect(() => {
    getPermission();

    return () => {
      clearWatch(ref.current);
    };
  }, []);

  return {
    isPermissionGranted,
    isPermissionDenied,
    getPermission,
    getCurrentLocation,
  };
};
