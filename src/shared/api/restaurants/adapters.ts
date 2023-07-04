import { LatLng } from 'react-native-maps';
import orderBy from 'lodash.orderby';
import { isPointWithinRadius, getDistance } from 'geolib';
import { AnyType } from 'helpers';
import { Restaurant } from './models';

export const adaptRestaurants = (
  restaurants: Restaurant[],
  location: LatLng | null,
) => {
  const data = restaurants.map((restaurant) => ({
    ...restaurant,
    distance: getDistance(
      {
        latitude: Number(location?.latitude || 0),
        longitude: Number(location?.longitude || 0),
      },
      {
        latitude: Number(restaurant?.placeDetails.geometry?.location?.lat),
        longitude: Number(restaurant?.placeDetails.geometry?.location?.lng),
      },
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
    }, location as AnyType, 30000);

    return inRadius;
  });

  return filteredByLocation as Restaurant[];
};
