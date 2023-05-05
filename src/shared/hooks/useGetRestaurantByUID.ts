import { useIsFocused } from '@react-navigation/native';

import firestore from '@react-native-firebase/firestore';
import { useEffect, useState } from 'react';
import { Restaurant } from 'api';

export const useGetRestaurantByUID = (contentId: string) => {
  const isFocused = useIsFocused();

  const [isLoading, setIsLoading] = useState(false);

  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);

  const getRestaurantByUID = async () => {
    setIsLoading(true);

    try {
      const response = await firestore().collection('companies_storyblock').doc(contentId).get();

      setRestaurant(response.data() as Restaurant);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isFocused && contentId) {
      getRestaurantByUID();
    }
  }, [isFocused, contentId]);

  return {
    restaurant,
    getRestaurantByUID,
    isLoading,
  };
};
