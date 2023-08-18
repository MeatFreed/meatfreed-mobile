import firestore from '@react-native-firebase/firestore';
import { useEffect, useState } from 'react';
import { useTypedSelector } from 'stores';
import { Offer, OfferType, adaptAvailableOffers } from 'api';
import { userSelectors } from 'stores/user';
import { useGetBounds } from './useGetBounds';

const offerCollection = firestore().collection('offers_storyblock');

export const useGetAvailableOffers = (offerType = OfferType.VOUCHER) => {
  const userId = useTypedSelector(userSelectors.userId);

  const [results, setResults] = useState<Offer[]>([]);

  const { selectLocation: location } = useGetBounds();

  useEffect(() => {
    const subscriber = offerCollection
      .where('content.active', '==', true)
      .where('content.public', '==', true)
      .where('content.featured', '==', false)
      .where('content.offer_type', '==', offerType)
      .onSnapshot((snapshot) => {
        const offers = snapshot.docs.map((doc) => doc.data()) as Offer[];

        setResults([...offers]);
      });

    return () => subscriber();
  }, []);

  return {
    results: results.length ? adaptAvailableOffers({ userId, location, data: results }) : [],
  };
};
