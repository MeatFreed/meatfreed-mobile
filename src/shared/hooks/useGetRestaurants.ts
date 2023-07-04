import firestore from '@react-native-firebase/firestore';
import { useEffect, useState } from 'react';
import { Restaurant, adaptAvailableRestaurants, adaptRestaurants } from 'api';
import { useGetBounds } from './useGetBounds';

const restaurantCollection = firestore().collection('companies_storyblock');

export const useGetRestaurants = () => {
  const [results, setResults] = useState<Restaurant[]>([]);

  const { selectLocation: location, currentLocation } = useGetBounds();

  useEffect(() => {
    const subscriber = restaurantCollection
      .where('content.public', '==', true)
      .onSnapshot((snapshot) => {
        const restaurants = snapshot.docs.map((doc) => doc.data()) as Restaurant[];

        setResults([...restaurants]);
      });

    return () => subscriber();
  }, []);

  const data = adaptAvailableRestaurants({ data: results, location });

  const items = adaptRestaurants(data, currentLocation);

  return {
    results: items,
  };
};
