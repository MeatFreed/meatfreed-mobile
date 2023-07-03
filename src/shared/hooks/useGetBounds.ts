import { useTypedSelector } from 'stores';
import { placeSelectors } from 'stores/place';

export const useGetBounds = () => {
  const selectLocation = useTypedSelector(placeSelectors.selectLocation);

  const currentLocation = useTypedSelector(placeSelectors.currentLocation);

  const coordinates = {
    latitude: Number(selectLocation?.latitude || currentLocation?.latitude || 0),
    longitude: Number(selectLocation?.longitude || currentLocation?.longitude || 0),
  };

  return {
    currentLocation,
    selectLocation,
    coordinates,
  };
};
