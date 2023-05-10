import { geohashQueryBounds } from 'geofire-common';
import firestore from '@react-native-firebase/firestore';
import { useEffect, useState } from 'react';
import { useTypedSelector } from 'stores';
import { placeSelectors } from 'stores/place';
import { Restaurant, adaptRestaurants } from 'api';
import sortBy from 'lodash.sortby';

const restaurantCollection = firestore().collection('restaurants');

export const useGetRestaurants = () => {
  const [offset, setOffset] = useState(5);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  const shouldPaginate = restaurants.length < totalCount;

  const hasLocation = useTypedSelector(placeSelectors.hasLocation);

  const location = useTypedSelector(placeSelectors.currentLocation);

  const bounds = geohashQueryBounds([
    Number(location?.latitude || 0),
    Number(location?.longitude || 0),
  ], 24000);

  const getTotalCount = async () => {
    try {
      const requestArray = bounds.map((bound) => restaurantCollection
        .orderBy('geohash')
        .startAt(bound[0])
        .endAt(bound[1])
        .get());

      const collections = await Promise.all(requestArray);

      const value = collections?.reduce((acc, next) => acc + next.docs.length, 0);

      setTotalCount(value);
    } catch (error) {
      /** empty */
    }
  };

  const getRestaurants = async (limit = 5) => {
    setIsLoading(true);

    console.log('!');

    try {
      const requestArray = bounds.map((bound) => restaurantCollection
        .orderBy('geohash')
        .startAt(bound[0])
        .endAt(bound[1])
        .limit(limit)
        .get());

      const collections = await Promise.all(requestArray);

      const result = adaptRestaurants(collections, location);

      setRestaurants([...result]);
    } finally {
      setIsLoading(false);
    }
  };

  const onRefresh = () => {
    if (hasLocation) {
      getRestaurants();
    }
  };

  const onEndReached = async () => {
    if (!shouldPaginate) {
      return;
    }

    setOffset(offset + 5);
    getRestaurants(offset + 5);
  };

  useEffect(() => {
    getTotalCount();
    getRestaurants();
  }, [location]);

  return {
    isLoading,
    restaurants: sortBy(restaurants, 'distance') as Restaurant[],
    onRefresh,
    onEndReached,
  };
};
