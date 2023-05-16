import firestore from '@react-native-firebase/firestore';
import { useEffect, useState } from 'react';
import { useTypedSelector } from 'stores';
import { placeSelectors } from 'stores/place';
import orderBy from 'lodash.orderby';
import { Offer } from 'api';
import { userSelectors } from 'stores/user';
import { useIsFocused } from '@react-navigation/native';

const offerCollection = firestore().collection('offers_storyblock');

export const useGetClaimedOffers = () => {
  const [offset, setOffset] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  const isFocused = useIsFocused();

  const userId = useTypedSelector(userSelectors.userId);

  const [initialLoading, setInitialLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setRefreshing] = useState(false);

  const [results, setResults] = useState<Offer[]>([]);

  const isEmpty = !initialLoading && !results.length;
  const shouldPaginate = results.length < totalCount;

  const location = useTypedSelector(placeSelectors.currentLocation);

  const getTotalCount = async () => {
    try {
      const response = await offerCollection
        .where('userIds', 'array-contains', userId)
        .where('content.active', '==', true)
        .get();

      setTotalCount(response.size);
    } catch (error) {
      /** empty */
    }
  };

  const getOffers = async (limit = 10) => {
    setIsLoading(true);

    try {
      const response = await offerCollection
        .where('userIds', 'array-contains', userId)
        .where('content.active', '==', true)
        .limit(limit)
        .get();

      const offers = response.docs.map((doc) => doc.data()) as Offer[];

      setResults([...offers]);
    } finally {
      setIsLoading(false);

      setInitialLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);

    setOffset(10);

    getTotalCount();

    try {
      const response = await offerCollection
        .where('userIds', 'array-contains', userId)
        .where('content.active', '==', true)
        .limit(10)
        .get();

      const offers = response.docs.map((doc) => doc.data()) as Offer[];

      setResults([...offers]);
    } finally {
      setRefreshing(false);
    }
  };

  const onEndReached = async () => {
    if (!shouldPaginate) {
      return;
    }

    setOffset(offset + 10);

    getOffers(offset + 10);
  };

  useEffect(() => {
    if (location?.latitude && location?.longitude && isFocused) {
      getOffers();
      getTotalCount();
    }
  }, [location, isFocused]);

  return {
    isLoading,
    initialLoading,
    isRefreshing,
    isEmpty,
    results: orderBy(results, 'published_at', 'desc') as Offer[],
    getOffers,
    onRefresh,
    onEndReached,
  };
};
