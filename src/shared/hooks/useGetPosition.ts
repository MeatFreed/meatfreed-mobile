import { useEffect, useRef } from 'react';
import Geolocation from 'react-native-geolocation-service';
import { useTypedDispatch, useTypedSelector } from 'stores';
import { placeSelectors, setCurrentLocation } from 'stores/place';

export const useGetPosition = () => {
  const dispatch = useTypedDispatch();

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
      { distanceFilter: 50 },
    );
  };

  useEffect(() => {
    watchLocation();

    return () => {
      clearWatch(ref.current);
    };
  }, []);
};
