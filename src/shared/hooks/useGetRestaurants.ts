import firestore from '@react-native-firebase/firestore';
import { useEffect, useState } from 'react';
import { Restaurant, adaptRestaurants } from 'api';
import orderBy from 'lodash.orderby';
import { useIsFocused } from '@react-navigation/native';
import { useGetBounds } from './useGetBounds';

const restaurantCollection = firestore().collection('companies_storyblock');

export const useGetRestaurants = () => {
  const isFocused = useIsFocused();

  const [isLoading, setIsLoading] = useState(false);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  const { bounds, currentLocation, selectLocation } = useGetBounds();

  const getRestaurants = async () => {
    setIsLoading(true);

    try {
      const requestArray = bounds.map((bound) => restaurantCollection
        .orderBy('geohash')
        .startAt(bound[0])
        .endAt(bound[1])
        .where('content.public', '==', true)
        .get());

      const collections = await Promise.all(requestArray);

      const result = adaptRestaurants(collections, currentLocation);

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
    if (isFocused) {
      getRestaurants();
    }
  }, [selectLocation, isFocused, currentLocation]);

  return {
    isLoading,
    restaurants: orderBy(restaurants, 'distance', 'asc') as Restaurant[],
    onRefresh,
  };
};
