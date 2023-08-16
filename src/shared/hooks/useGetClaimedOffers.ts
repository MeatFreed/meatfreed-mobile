import firestore from '@react-native-firebase/firestore';
import { useEffect, useState } from 'react';
import { useTypedSelector } from 'stores';
import { Offer, OfferType, adaptClaimedOffers } from 'api';
import { userSelectors } from 'stores/user';

const offerCollection = firestore().collection('offers_storyblock');

export const useGetClaimedOffers = (offerType = OfferType.VOUCHER) => {
  const userId = useTypedSelector(userSelectors.userId);

  const [results, setResults] = useState<Offer[]>([]);

  useEffect(() => {
    const subscriber = offerCollection
      .where('userIds', 'array-contains', userId)
      .where('content.active', '==', true)
      .where('content.offer_type', '==', offerType)
      .onSnapshot((snapshot) => {
        const offers = snapshot.docs.map((doc) => doc.data()) as Offer[];

        setResults([...offers]);
      });

    return () => subscriber();
  }, []);

  return {
    results: results.length ? adaptClaimedOffers(userId, results) : [],
  };
};
