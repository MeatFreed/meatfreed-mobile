import firestore from '@react-native-firebase/firestore';
import { useEffect, useState } from 'react';
import { useTypedSelector } from 'stores';
import orderBy from 'lodash.orderby';
import { Offer, adaptAvailableOffers } from 'api';
import { userSelectors } from 'stores/user';
import { useGetBounds } from './useGetBounds';

const offerCollection = firestore().collection('offers_storyblock');

export const useGetAvailableOffers = () => {
  const userId = useTypedSelector(userSelectors.userId);

  const [results, setResults] = useState<Offer[]>([]);

  const { coordinates: location } = useGetBounds();

  useEffect(() => {
    const subscriber = offerCollection
      .where('content.active', '==', true)
      .where('content.public', '==', true)
      .where('content.featured', '==', false)
      .onSnapshot((snapshot) => {
        const offers = adaptAvailableOffers({ userId, snapshot, location });

        setResults([...offers]);
      });

    return () => subscriber();
  }, [userId, location]);

  return {
    results: orderBy(results, 'published_at', 'desc') as Offer[],
  };
};
