import { Geopoint, geohashQueryBounds } from 'geofire-common';
import { useTypedSelector } from 'stores';
import { placeSelectors } from 'stores/place';

export const useGetBounds = () => {
  const selectLocation = useTypedSelector(placeSelectors.selectLocation);

  const currentLocation = useTypedSelector(placeSelectors.currentLocation);

  const coordinates = [
    Number(selectLocation?.latitude || currentLocation?.latitude || 0),
    Number(selectLocation?.longitude || currentLocation?.longitude || 0),
  ] as Geopoint;

  const bounds = geohashQueryBounds(coordinates, 24000);

  const hasSelectedLocation = !!coordinates?.[0] && !!coordinates?.[1];

  return {
    bounds,
    currentLocation,
    selectLocation,
    hasSelectedLocation,
  };
};
