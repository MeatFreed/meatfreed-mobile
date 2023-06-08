import firestore from '@react-native-firebase/firestore';
import { useEffect, useState } from 'react';
import { Restaurant, adaptRestaurants } from 'api';
import { useIsFocused } from '@react-navigation/native';
import { useGetBounds } from './useGetBounds';

const restaurantCollection = firestore().collection('companies_storyblock');

export const useGetRestaurants = () => {
  const isFocused = useIsFocused();

  const [isLoading, setIsLoading] = useState(false);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  const {
    bounds, selectLocation, currentLocation, hasSelectedLocation,
  } = useGetBounds();

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

      const flatData = collections.flatMap((collection) => collection.docs);

      const data = flatData.map((doc) => {
        const restaurant = doc.data() as Restaurant;

        return { ...restaurant, uid: doc.id };
      });

      setRestaurants([...data]);
    } finally {
      setIsLoading(false);
    }
  };

  const onRefresh = () => {
    if (hasSelectedLocation) {
      getRestaurants();
    }
  };

  useEffect(() => {
    if (isFocused && hasSelectedLocation) {
      getRestaurants();
    }
  }, [selectLocation, isFocused, hasSelectedLocation]);

  return {
    isLoading,
    restaurants: adaptRestaurants(restaurants, currentLocation),
    onRefresh,
  };
};
