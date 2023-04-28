import { RouteService } from 'services';
import { Linking } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { Offer } from 'api';
import { Routes } from 'navigation';
import { useTypedSelector } from 'stores';
import { userSelectors } from 'stores/user';
import { useState } from 'react';
import { placeSelectors } from 'stores/place';
import { parseToLocalTime } from 'helpers';
import { geohashForLocation } from 'geofire-common';

const offerCollection = firestore().collection('offers');

export const useOfferActions = () => {
  const [isLoading, setIsLoading] = useState(false);

  const user = useTypedSelector(userSelectors.user);
  const currentLocation = useTypedSelector(placeSelectors.currentLocation);

  const onCheckAuth = async (offer: Offer) => {
    setIsLoading(true);

    try {
      const response = await offerCollection.doc(offer.uid).get();

      const data = response.data() as Offer;

      await offerCollection.doc(offer.uid).update({
        clicksCount: data.clicksCount ? data.clicksCount + 1 : 1,
      });

      await offerCollection.doc(offer.uid).collection('clicks').add({
        time: parseToLocalTime().valueOf(),
        type: 'offer',
        user: user?.uid || 'anonymous',
        ...(currentLocation && {
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
          geohash: geohashForLocation([
            currentLocation.latitude,
            currentLocation.longitude,
          ]),
        }),
      });

      if (offer?.url) {
        Linking.openURL(offer.url);

        return;
      }

      RouteService.navigate(Routes.RESTAURANT_NAVIGATOR, {
        screen: Routes.RESTAURANT_DETAILS,
        params: { contentId: offer.place_id },
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onRegular = (offer: Offer) => {
    if (user.uid) {
      onCheckAuth(offer);

      return;
    }

    RouteService.reset(Routes.WELCOME);
  };

  const onGlobal = () => {
    if (user.uid) {
      RouteService.navigate(Routes.REFERRAL);

      return;
    }

    RouteService.reset(Routes.WELCOME);
  };

  return {
    isLoading,
    onRegular,
    onGlobal,
  };
};
