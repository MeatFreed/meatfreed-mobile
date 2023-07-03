import firestore from '@react-native-firebase/firestore';
import { useEffect, useState } from 'react';
import { useTypedSelector } from 'stores';
import orderBy from 'lodash.orderby';
import { Offer } from 'api';
import { userSelectors } from 'stores/user';

const offerCollection = firestore().collection('offers_storyblock');

export const useGetClaimedOffers = () => {
  const userId = useTypedSelector(userSelectors.userId);

  const [results, setResults] = useState<Offer[]>([]);

  useEffect(() => {
    const subscriber = offerCollection
      .where('userIds', 'array-contains', userId)
      .where('content.active', '==', true)
      .onSnapshot((documentSnapshot) => {
        const offers = documentSnapshot.docs.map((doc) => doc.data()) as Offer[];

        setResults([...offers]);
      });

    return () => subscriber();
  }, [userId]);

  return {
    results: orderBy(results, 'published_at', 'desc') as Offer[],
  };
};
