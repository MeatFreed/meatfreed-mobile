import { geohashQueryBounds } from 'geofire-common';
import firestore from '@react-native-firebase/firestore';
import { useIsFocused } from '@react-navigation/native';
import { useEffect, useMemo, useState } from 'react';
import { useTypedSelector } from 'stores';
import { placeSelectors } from 'stores/place';
import { Restaurant } from 'api';

export const useGetRestaurants = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  const isFocused = useIsFocused();

  const currentLocation = useTypedSelector(placeSelectors.currentLocation);

  const bounds = useMemo(() => geohashQueryBounds([
    currentLocation?.latitude,
    currentLocation?.longitude,
  ], 24000), [currentLocation]);

  const getRestaurants = async () => {
    setIsLoading(true);

    try {
      const requestArray = bounds.map((bound) => firestore().collection('restaurants')
        .orderBy('geohash')
        .startAt(bound[0])
        .endAt(bound[1])
        .get());

      const collections = await Promise.all(requestArray);

      const data = collections
        .flatMap((collection) => collection.docs)
        .map((doc) => ({ ...doc.data(), uid: doc.id })) as Restaurant[];

      setRestaurants([...data]);
    } finally {
      setIsLoading(false);
    }
  };

  const onRefresh = () => {
    getRestaurants();
  };

  useEffect(() => {
    getRestaurants();
  }, [isFocused, currentLocation]);

  return {
    isLoading,
    restaurants,
    onRefresh,
  };
};
