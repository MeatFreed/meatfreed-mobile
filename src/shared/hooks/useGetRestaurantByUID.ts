import firestore from '@react-native-firebase/firestore';
import { useEffect, useState } from 'react';
import { Restaurant } from 'api';

export const useGetRestaurantByUID = (contentId: string) => {
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);

  useEffect(() => {
    const subscriber = firestore().collection('companies_storyblock')
      .doc(contentId)
      .onSnapshot((documentSnapshot) => {
        setRestaurant(documentSnapshot.data() as Restaurant);
      });

    return () => {
      subscriber();
    };
  }, [contentId]);

  return {
    restaurant,
  };
};
