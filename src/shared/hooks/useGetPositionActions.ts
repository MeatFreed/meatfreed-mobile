import Geolocation from 'react-native-geolocation-service';
import { Region } from 'react-native-maps';
import { MapService } from 'services';
import { useTypedDispatch, useTypedSelector } from 'stores';
import {
  onChangeRegion,
  placeSelectors, setCurrentLocation, setSelectLocation,
} from 'stores/place';

export const useGetPositionActions = () => {
  const dispatch = useTypedDispatch();

  const location = useTypedSelector(placeSelectors.currentLocation);

  const onShowMyLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        dispatch(setSelectLocation({
          latitude: position.coords.latitude || location?.latitude || 0,
          longitude: position.coords.longitude || location?.longitude || 0,
        }));

        dispatch(setCurrentLocation(position));

        MapService.animateCamera({
          center: {
            latitude: position.coords.latitude || location?.latitude || 0,
            longitude: position.coords.longitude || location?.longitude || 0,
          },
        });
      },
      undefined,
      {
        enableHighAccuracy: true,
        distanceFilter: 10,
      },
    );
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        dispatch(setCurrentLocation(position));
      },
      undefined,
      {
        distanceFilter: 10,
      },
    );
  };

  const onRegionChangeComplete = (region: Region) => {
    dispatch(onChangeRegion({
      delta: {
        latitudeDelta: region.latitudeDelta,
        longitudeDelta: region.longitudeDelta,
      },
      selectLocation: {
        latitude: region.latitude,
        longitude: region.longitude,
      },
    }));
  };

  return {
    onShowMyLocation,
    getCurrentLocation,
    onRegionChangeComplete,
  };
};
