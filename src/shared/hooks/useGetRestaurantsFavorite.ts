import firestore from '@react-native-firebase/firestore';
import { useEffect, useState } from 'react';
import { Restaurant, adaptRestaurants } from 'api';
import { useTypedSelector } from 'stores';
import { userSelectors } from 'stores/user';
import { useGetBounds } from './useGetBounds';

const restaurantCollection = firestore().collection('companies_storyblock');

export const useGetRestaurantsFavorite = () => {
  const [results, setResults] = useState<Restaurant[]>([]);

  const { currentLocation } = useGetBounds();

  const userId = useTypedSelector(userSelectors.userId);

  useEffect(() => {
    const subscriber = restaurantCollection
      .where('favoriteUserIds', 'array-contains', userId)
      .onSnapshot((snapshot) => {
        const restaurants = snapshot.docs.map((doc) => doc.data()) as Restaurant[];

        setResults([...restaurants]);
      });

    return () => subscriber();
  }, []);

  const items = adaptRestaurants(results, currentLocation);

  return {
    results: items,
  };
};
