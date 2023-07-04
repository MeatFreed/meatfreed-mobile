import { useInterval } from '@lumitech/mobile-hooks';
import { useRef } from 'react';
import Geolocation from 'react-native-geolocation-service';
import { useTypedDispatch, useTypedSelector } from 'stores';
import { placeSelectors, setCurrentLocation } from 'stores/place';
import { isIOS, withDelay } from 'helpers';
import { PermissionsService } from 'services';
import { useGetPositionActions } from './useGetPositionActions';
import { useCourier } from './useCourier';

export const useGetPosition = () => {
  const dispatch = useTypedDispatch();

  const { onShowMyLocation } = useGetPositionActions();

  const { getNotificationPermission } = useCourier();

  const ref = useRef<number>(0);

  const hasLocation = useTypedSelector(placeSelectors.hasLocation);

  const { watchPosition, clearWatch } = Geolocation;

  const watchLocation = () => {
    ref.current = watchPosition(
      (position) => {
        if (!hasLocation) {
          dispatch(setCurrentLocation(position));
        }
      },
      undefined,
      { enableHighAccuracy: true },
    );
  };

  const getPermissions = async () => {
    try {
      await withDelay(isIOS ? 1000 : 2000);

      await PermissionsService.requestGeolocationPermission();

      watchLocation();

      onShowMyLocation();

      if (isIOS) {
        getNotificationPermission();
      }
    } catch (error) { /** empty */ }
  };

  const onClearWatch = () => {
    clearWatch(ref.current);
  };

  useInterval(() => {
    onShowMyLocation();
  }, hasLocation ? null : 1000);

  return {
    getPermissions,
    onClearWatch,
  };
};
