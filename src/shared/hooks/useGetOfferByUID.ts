import firestore from '@react-native-firebase/firestore';
import { useEffect, useState } from 'react';
import {
  Offer, OfferStatus, UserOffer, useGetRestaurantByIDQuery,
} from 'api';
import { useTypedSelector } from 'stores';
import { userSelectors } from 'stores/user';
import dayjs from 'dayjs';

const { CLAIMED, WON, PENDING } = OfferStatus;

export const useGetOfferByUID = (contentId?: string) => {
  const [isLoading, setIsLoading] = useState(false);

  const userId = useTypedSelector(userSelectors.userId);

  const [offer, setOffer] = useState<Offer | null>(null);
  const [userOffer, setUserOffer] = useState<UserOffer | null>(null);
  const [totalEntries, setTotalEntries] = useState(0);

  const { data: details } = useGetRestaurantByIDQuery(offer?.placeDetails?.place_id);

  const hasData = offer || details;

  const photos = details?.photos?.map((photo) => photo.photo_reference);

  const images = offer?.content?.assets?.map((asset) => asset.filename);

  const isClaimedOffer = userOffer?.status === CLAIMED;

  const isWonOffer = userOffer?.status === WON;

  const isPendingOffer = userOffer?.status === PENDING;

  const active = offer?.content?.active || false;

  const isBefore = dayjs().isBefore(offer?.content?.end_date, 'm');

  const isAllowToUse = totalEntries <= (offer?.content?.max_claims_per_user || 0);

  const isAllowRaffleEntry = isBefore && !isWonOffer && !isClaimedOffer && active && isAllowToUse;

  const isAllowRaffleClaimed = (isWonOffer || isClaimedOffer) && active;

  const isAllowVoucherClaimed = isBefore && active && isAllowToUse;

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

    const totalEntriesSubscriber = firestore().collection('user_offers')
      .where('offerId', '==', contentId)
      .onSnapshot((documentSnapshot) => {
        setTotalEntries(documentSnapshot.size);
      });

    return () => {
      offerSubscriber();
      userOfferSubscriber();
      totalEntriesSubscriber();
    };
  }, []);

  return {
    offer,
    userOffer,
    getOfferByUID,
    isLoading,
    totalEntries,
    hasData,
    photos,
    images,
    isClaimedOffer,
    isPendingOffer,
    isAllowRaffleClaimed,
    isWonOffer,
    isAllowRaffleEntry,
    isAllowVoucherClaimed,
  };
};
