import { geohashQueryBounds } from 'geofire-common';
import firestore from '@react-native-firebase/firestore';
import { useIsFocused } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { useTypedSelector } from 'stores';
import { placeSelectors } from 'stores/place';
import { Restaurant, adaptRestaurants } from 'api';
import sortBy from 'lodash.sortby';

export const useGetRestaurants = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  const isFocused = useIsFocused();

  const currentLocation = useTypedSelector(placeSelectors.currentLocation);
  const hasLocation = useTypedSelector(placeSelectors.hasLocation);

  const bounds = geohashQueryBounds([
    Number(currentLocation?.latitude || 0),
    Number(currentLocation?.longitude || 0),
  ], 24000);

  const getRestaurants = async () => {
    setIsLoading(true);

    try {
      const requestArray = bounds.map((bound) => firestore().collection('restaurants')
        .orderBy('geohash')
        .startAt(bound[0])
        .endAt(bound[1])
        .get());

      const collections = await Promise.all(requestArray);

      const result = adaptRestaurants(collections, currentLocation);

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

  useEffect(() => {
    if (hasLocation) {
      getRestaurants();
    }
  }, [isFocused, currentLocation, hasLocation]);

  return {
    isLoading,
    restaurants: sortBy(restaurants, 'distance'),
    onRefresh,
  };
};
