import { LatLng } from 'react-native-maps';
import orderBy from 'lodash.orderby';
import { isPointWithinRadius } from 'geolib';
import { distanceBetween } from 'geofire-common';
import { AnyType } from 'helpers';
import { store } from 'stores';
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

interface AvailableRestaurantsParams {
  data: Restaurant[]
  location: LatLng | null;
}

export const adaptAvailableRestaurants = ({ data, location }: AvailableRestaurantsParams) => {
  if (!location) {
    return [];
  }

  const filteredByLocation = data.filter((restaurant) => {
    const restaurantLocation = restaurant?.placeDetails?.geometry?.location;

    const inRadius = isPointWithinRadius({
      latitude: restaurantLocation.lat, longitude: restaurantLocation.lng,
    }, location as AnyType, store.getState().settings.totalMilesConvertedToMeters);

    return inRadius;
  });

  return filteredByLocation as Restaurant[];
};
