import firestore from '@react-native-firebase/firestore';
import { useEffect, useState } from 'react';
import orderBy from 'lodash.orderby';
import { Offer, adaptFeaturedOffers } from 'api';
import { useTypedSelector } from 'stores';
import { userSelectors } from 'stores/user';
import { useIsFocused } from '@react-navigation/native';

const offerCollection = firestore().collection('offers_storyblock');

export const useGetFeaturedOffers = () => {
  const isFocused = useIsFocused();

  const [initialLoading, setInitialLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [results, setResults] = useState<Offer[]>([]);

  const userId = useTypedSelector(userSelectors.userId);

  const isEmpty = !initialLoading && !results.length;

  const getOffers = async () => {
    setIsLoading(true);

    try {
      const response = await offerCollection
        .where('content.active', '==', true)
        .where('content.public', '==', true)
        .where('content.featured', '==', true)
        .get();

      const offers = adaptFeaturedOffers(userId, response);

      setResults([...offers]);
    } finally {
      setIsLoading(false);

      setInitialLoading(false);
    }
  };

  useEffect(() => {
    if (isFocused) {
      getOffers();
    }
  }, [isFocused]);

  return {
    isLoading,
    initialLoading,
    isEmpty,
    results: orderBy(results, 'published_at', 'desc') as Offer[],
    getOffers,
  };
};
