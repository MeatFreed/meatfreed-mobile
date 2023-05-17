import { geohashQueryBounds } from 'geofire-common';
import firestore from '@react-native-firebase/firestore';
import { useEffect, useState } from 'react';
import { useTypedSelector } from 'stores';
import { placeSelectors } from 'stores/place';
import { Restaurant, adaptRestaurants } from 'api';
import sortBy from 'lodash.sortby';

const restaurantCollection = firestore().collection('companies_storyblock');

export const useGetRestaurants = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  const selectLocation = useTypedSelector(placeSelectors.selectLocation);

  const bounds = geohashQueryBounds([
    Number(selectLocation?.latitude || 0),
    Number(selectLocation?.longitude || 0),
  ], 24000);

  const getRestaurants = async () => {
    setIsLoading(true);

    try {
      const requestArray = bounds.map((bound) => restaurantCollection
        .orderBy('geohash')
        .startAt(bound[0])
        .endAt(bound[1])
        .get());

      const collections = await Promise.all(requestArray);

      const result = adaptRestaurants(collections, selectLocation);

      setRestaurants([...result]);
    } finally {
      setIsLoading(false);
    }
  };

  const onRefresh = () => {
    if (selectLocation) {
      getRestaurants();
    }
  };

  useEffect(() => {
    getRestaurants();
  }, [selectLocation]);

  return {
    isLoading,
    restaurants: sortBy(restaurants, 'distance') as Restaurant[],
    onRefresh,
  };
};
