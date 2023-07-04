import firestore from '@react-native-firebase/firestore';
import { useEffect, useState } from 'react';
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
      .onSnapshot((snapshot) => {
        const offers = snapshot.docs.map((doc) => doc.data()) as Offer[];

        setResults([...offers]);
      });

    return () => subscribe();
  }, []);

  return {
    results: results.length ? adaptFeaturedOffers(userId, results) : [],
  };
};
