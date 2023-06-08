import { LatLng } from 'react-native-maps';
import orderBy from 'lodash.orderby';
import { distanceBetween } from 'geofire-common';
import { Restaurant } from './models';

export const adaptRestaurants = (
  restaurants: Restaurant[],
  location: LatLng | null,
) => {
  const data = restaurants.map((restaurant) => ({
    ...restaurant,
    distance: distanceBetween(
      [
        Number(location?.latitude || 0),
        Number(location?.longitude || 0),
      ],
      [
        Number(restaurant?.placeDetails.geometry?.location?.lat),
        Number(restaurant?.placeDetails.geometry?.location?.lng),
      ],
    ),
  }));

  return orderBy(data, 'distance', 'asc');
};
