import firestore from '@react-native-firebase/firestore';
import { useEffect, useState } from 'react';
import { useTypedSelector } from 'stores';
import orderBy from 'lodash.orderby';
import { Offer, adaptAvailableOffers } from 'api';
import { userSelectors } from 'stores/user';
import { useIsFocused } from '@react-navigation/native';
import { useGetBounds } from './useGetBounds';

const offerCollection = firestore().collection('offers_storyblock');

export const useGetAvailableOffers = () => {
  const isFocused = useIsFocused();

  const userId = useTypedSelector(userSelectors.userId);

  const [initialLoading, setInitialLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setRefreshing] = useState(false);

  const [results, setResults] = useState<Offer[]>([]);

  const isEmpty = !initialLoading && !results.length;

  const { bounds, selectLocation } = useGetBounds();

  const getOffers = async () => {
    setIsLoading(true);

    try {
      const requestArray = bounds.map((bound) => offerCollection
        .orderBy('geohash', 'desc')
        .where('geohash', '>=', bound[0])
        .where('geohash', '<=', bound[1])
        .where('content.active', '==', true)
        .where('content.public', '==', true)
        .where('content.featured', '==', false)
        .get());

      const collections = await Promise.all(requestArray);

      const offers = adaptAvailableOffers(userId, collections);

      setResults([...offers]);
    } finally {
      setIsLoading(false);

      setInitialLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);

    try {
      const requestArray = bounds.map((bound) => offerCollection
        .orderBy('geohash', 'desc')
        .where('geohash', '>=', bound[0])
        .where('geohash', '<=', bound[1])
        .where('content.active', '==', true)
        .where('content.public', '==', true)
        .where('content.featured', '==', false)
        .get());

      const collections = await Promise.all(requestArray);

      const offers = adaptAvailableOffers(userId, collections);

      setResults([...offers]);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (isFocused) {
      getOffers();
    }
  }, [selectLocation, isFocused]);

  return {
    isLoading,
    initialLoading,
    isRefreshing,
    isEmpty,
    results: orderBy(results, 'published_at', 'desc') as Offer[],
    getOffers,
    onRefresh,
  };
};
