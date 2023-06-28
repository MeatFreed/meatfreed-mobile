import firestore from '@react-native-firebase/firestore';
import { useEffect, useState } from 'react';
import orderBy from 'lodash.orderby';
import { Offer, adaptFeaturedOffers } from 'api';
import { useTypedSelector } from 'stores';
import { userSelectors } from 'stores/user';

const offerCollection = firestore().collection('offers_storyblock');

export const useGetFeaturedOffers = () => {
  const [results, setResults] = useState<Offer[]>([]);

  const userId = useTypedSelector(userSelectors.userId);

  useEffect(() => {
    const subscribe = offerCollection
      .where('content.active', '==', true)
      .where('content.public', '==', true)
      .where('content.featured', '==', true)
      .onSnapshot((documentSnapshot) => {
        const offers = adaptFeaturedOffers(userId, documentSnapshot);

        setResults([...offers]);
      });

    return () => subscribe();
  }, [userId]);

  return {
    results: orderBy(results, 'published_at', 'desc') as Offer[],
  };
};
