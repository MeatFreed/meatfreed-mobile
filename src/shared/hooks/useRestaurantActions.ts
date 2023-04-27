import firestore from '@react-native-firebase/firestore';
import { Restaurant, useGetRestaurantByIDQuery } from 'api';
import { useTypedSelector } from 'stores';
import { userSelectors } from 'stores/user';
import { useState } from 'react';
import { placeSelectors } from 'stores/place';
import { AnyType, parseToLocalTime } from 'helpers';
import { geohashForLocation } from 'geofire-common';
import { RouteService } from 'services';
import { Routes } from 'navigation';

const restaurantCollection = firestore().collection('restaurants');

export const useRestaurantActions = () => {
  const [placeId, setPlaceId] = useState<string | null>(null);

  const user = useTypedSelector(userSelectors.user);
  const currentLocation = useTypedSelector(placeSelectors.currentLocation);

  const { data: details, isLoading } = useGetRestaurantByIDQuery(
    placeId as AnyType,
  );

  const onWebsite = async (placeId: string) => {
    try {
      const response = await restaurantCollection.where('place_id', '==', placeId).get();

      const data = response.docs.map((doc) => ({ ...doc.data, uid: doc.id }))[0] as Restaurant;

      await restaurantCollection.doc(data.uid).update({
        clicksCount: data.clicksCount ? data.clicksCount + 1 : 1,
      });

      await restaurantCollection.doc(data.uid).collection('clicks').add({
        time: parseToLocalTime().valueOf(),
        type: 'restaurantWebsite',
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
    // eslint-disable-next-line no-empty
    } finally {}
  };

  const onCheckAuth = async (placeId: string) => {
    try {
      const response = await restaurantCollection.where('place_id', '==', placeId).get();

      const data = response.docs.map((doc) => ({ ...doc.data, uid: doc.id }))[0] as Restaurant;

      await restaurantCollection.doc(data.uid).update({
        clicksCount: data.clicksCount ? data.clicksCount + 1 : 1,
      });

      await restaurantCollection.doc(data.uid).collection('clicks').add({
        time: parseToLocalTime().valueOf(),
        type: 'restaurant',
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
    // eslint-disable-next-line no-empty
    } finally {}
  };

  const onRestaurant = (id: string) => {
    if (user.uid) {
      onCheckAuth(id);

      setPlaceId(id);

      return;
    }

    RouteService.reset(Routes.WELCOME);
  };

  return {
    isLoading,
    onWebsite,
    placeId,
    setPlaceId,
    onRestaurant,
    details,
  };
};
