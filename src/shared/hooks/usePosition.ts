import { useEffect, useRef, useState } from 'react';
import Geolocation from 'react-native-geolocation-service';
import { isIOS, withDelay } from 'helpers';
import { PermissionsService } from 'services';
import { store, useTypedDispatch } from 'stores';
import { setCurrentLocation } from 'stores/place';
import { getDistance } from 'geolib';
import throttle from 'lodash.throttle';

const SIGNIFICANT_DISTANCE = 1000;

export const usePosition = () => {
  const [isPermissionDenied, setPermissionDenied] = useState(false);
  const [isPermissionGranted, setPermissionGranted] = useState(false);

  const dispatch = useTypedDispatch();

  const ref = useRef<number>(0);

  const { watchPosition, clearWatch } = Geolocation;

  const onChangeLocation = throttle((position: Geolocation.GeoPosition) => {
    const { latitude, longitude } = position.coords;

    const { currentLocation } = store.getState().place;

    const isLocationPresent = latitude !== 0 && longitude !== 0;

    const distance = getDistance(
      {
        latitude: Number(currentLocation?.latitude),
        longitude: Number(currentLocation?.longitude),
      },
      { latitude, longitude },
    );

    const isSignificantDistance = distance > SIGNIFICANT_DISTANCE;

    if (isSignificantDistance && isLocationPresent) {
      dispatch(setCurrentLocation(position));
    }
  }, 300000);

  const watchLocation = () => {
    ref.current = watchPosition(
      onChangeLocation,
      undefined,
      { distanceFilter: 2500 },
    );
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        dispatch(setCurrentLocation(position));
      },
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

      getCurrentLocation();

      setPermissionGranted(isGranted);
      setPermissionDenied(!isGranted);
    } catch (error) {
      setPermissionGranted(false);
      setPermissionDenied(true);
    }
  };

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
