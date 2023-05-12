import firestore from '@react-native-firebase/firestore';
import { useEffect, useState } from 'react';
import { Offer, UserOffer } from 'api';
import { useTypedSelector } from 'stores';
import { userSelectors } from 'stores/user';

export const useGetOfferByUID = (contentId: string) => {
  const [isLoading, setIsLoading] = useState(false);

  const userId = useTypedSelector(userSelectors.userId);

  const [offer, setOffer] = useState<Offer | null>(null);
  const [userOffer, setUserOffer] = useState<UserOffer | null>(null);

  const getOfferByUID = async () => {
    setIsLoading(true);

    try {
      const response = await firestore().collection('offers_storyblock').doc(contentId).get();

      setOffer(response.data() as Offer);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const offerSubscriber = firestore().collection('offers_storyblock').doc(contentId).onSnapshot((documentSnapshot) => {
      setOffer(documentSnapshot.data() as Offer);
    });

    const userOfferSubscriber = firestore().collection('user_offers')
      .where('offerId', '==', contentId)
      .where('userId', '==', userId)
      .onSnapshot((documentSnapshot) => {
        const response = documentSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))?.[0];

        setUserOffer(response as UserOffer);
      });

    return () => {
      offerSubscriber();
      userOfferSubscriber();
    };
  }, []);

  return {
    offer,
    userOffer,
    getOfferByUID,
    isLoading,
  };
};
