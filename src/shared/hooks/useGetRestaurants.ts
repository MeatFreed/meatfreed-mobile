import { geohashQueryBounds } from 'geofire-common';
import firestore from '@react-native-firebase/firestore';
import { useIsFocused } from '@react-navigation/native';
import { useEffect, useMemo, useState } from 'react';
import { useTypedSelector } from 'stores';
import { placeSelectors } from 'stores/place';
import { Restaurant } from 'api';
import { getDistance } from 'geolib';
import sortBy from 'lodash.sortby';

export const useGetRestaurants = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  const isFocused = useIsFocused();

  const currentLocation = useTypedSelector(placeSelectors.currentLocation);
  const hasLocation = useTypedSelector(placeSelectors.hasLocation);

  const bounds = useMemo(() => geohashQueryBounds([
    Number(currentLocation?.latitude || 0),
    Number(currentLocation?.longitude || 0),
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

      const flatData = collections.flatMap((collection) => collection.docs);

      const result = flatData.map((doc) => {
        const data = doc.data() as Restaurant;

        const distance = getDistance(
          {
            latitude: Number(currentLocation?.latitude || 0),
            longitude: Number(currentLocation?.longitude || 0),
          },
          {
            latitude: Number(data?.location?.latitude),
            longitude: Number(data?.location?.longitude),
          },
        );

        return {
          ...data,
          distance,
          uid: doc.id,
        };
      });

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
