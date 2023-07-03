import firestore from '@react-native-firebase/firestore';
import { useEffect, useState } from 'react';
import { Restaurant, adaptAvailableRestaurants, adaptRestaurants } from 'api';
import { useGetBounds } from './useGetBounds';

const restaurantCollection = firestore().collection('companies_storyblock');

export const useGetRestaurants = () => {
  const [results, setResults] = useState<Restaurant[]>([]);

  const { coordinates: location, currentLocation } = useGetBounds();

  useEffect(() => {
    const subscriber = restaurantCollection
      .where('content.public', '==', true)
      .onSnapshot((snapshot) => {
        const restaurants = adaptAvailableRestaurants({ snapshot, location });

        setResults([...restaurants]);
      });

    return () => subscriber();
  }, [location]);

  return {
    results: adaptRestaurants(results, currentLocation),
  };
};
