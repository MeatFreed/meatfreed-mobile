import { useEffect, useRef, useState } from 'react';
import Geolocation from 'react-native-geolocation-service';
import { defaultLocation, isIOS, withDelay } from 'helpers';
import { MapService, PermissionsService } from 'services';
import { store, useTypedDispatch, useTypedSelector } from 'stores';
import { placeSelectors, setCurrentLocation, setSelectLocation } from 'stores/place';
import { getDistance } from 'geolib';
import throttle from 'lodash.throttle';

const SIGNIFICANT_DISTANCE = 500;

export const usePosition = () => {
  const [isPermissionDenied, setPermissionDenied] = useState(false);
  const [isPermissionGranted, setPermissionGranted] = useState(false);

  const currentLocation = useTypedSelector(placeSelectors.currentLocation);

  const hasLocation = useTypedSelector(placeSelectors.hasLocation);
  const delta = useTypedSelector(placeSelectors.delta);

  const dispatch = useTypedDispatch();

  const ref = useRef<number>(0);

  const { watchPosition, clearWatch } = Geolocation;

  const onChangeLocation = throttle((position: Geolocation.GeoPosition) => {
    const { latitude, longitude } = position.coords;

    const { location } = store.getState().place;

    const isLocationPresent = latitude !== 0 && longitude !== 0;

    const distance = getDistance(
      {
        latitude: Number(location?.latitude),
        longitude: Number(location?.longitude),
      },
      { latitude, longitude },
    );

    const isSignificantDistance = distance > SIGNIFICANT_DISTANCE;

    if (isSignificantDistance && isLocationPresent) {
      dispatch(setCurrentLocation(position));
    }
  }, 5000);

  const watchLocation = () => {
    ref.current = watchPosition(
      onChangeLocation,
      undefined,
      { distanceFilter: 500 },
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

      if (!hasLocation) {
        getCurrentLocation();
      }

      setPermissionGranted(isGranted);
      setPermissionDenied(!isGranted);
    } catch (error) {
      setPermissionGranted(false);
      setPermissionDenied(true);
    }
  };

  const onShowMyLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        dispatch(setSelectLocation(null));
        dispatch(setCurrentLocation(position));

        MapService.animateToRegion({
          latitude: position.coords.latitude || currentLocation?.latitude || 0,
          longitude: position.coords.longitude || currentLocation?.longitude || 0,
          latitudeDelta: delta?.latitudeDelta || defaultLocation.latitudeDelta,
          longitudeDelta: delta?.longitudeDelta || defaultLocation.longitudeDelta,
        });
      },
      undefined,
      {
        enableHighAccuracy: true,
        distanceFilter: 10,
      },
    );
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
    onShowMyLocation,
  };
};
