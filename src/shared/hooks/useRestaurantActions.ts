import firestore from '@react-native-firebase/firestore';
import { Restaurant, useGetRestaurantByIDMutation } from 'api';
import { useTypedSelector } from 'stores';
import { userSelectors } from 'stores/user';
import { useEffect, useState } from 'react';
import { placeSelectors } from 'stores/place';
import {
  AnyType, parseToLocalTime, withDelay,
} from 'helpers';
import { geohashForLocation } from 'geofire-common';
import { RouteService, SwipeablePanelService, ToastService } from 'services';
import { Routes, SearchProp } from 'navigation';
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

const restaurantCollection = firestore().collection('restaurants');

export const useRestaurantActions = () => {
  const { t } = useTranslation();

  const [placeId, setPlaceId] = useState<string | null>(null);

  const user = useTypedSelector(userSelectors.user);
  const currentLocation = useTypedSelector(placeSelectors.currentLocation);

  const { params } = useRoute<SearchProp>();

  const navigation = useNavigation();

  const isFocused = useIsFocused();

  const [getRestaurantByID, { data: details, isLoading }] = useGetRestaurantByIDMutation();

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

  const getRestaurant = async (id: string) => {
    setPlaceId(id);

    try {
      await getRestaurantByID(id).unwrap();

      await withDelay(250);

      SwipeablePanelService.onOpenToTop();
    } catch (error: AnyType) {
      setPlaceId(null);

      ToastService.onDanger({ title: error?.error_message || t('errors.server-unable') });
    } finally {
      navigation.setParams({
        placeId: null,
      } as AnyType);
    }
  };

  const onRestaurant = (id: string) => {
    if (user.uid) {
      onCheckAuth(id);

      setPlaceId(id);

      return;
    }

    RouteService.reset(Routes.WELCOME);
  };

  useEffect(() => () => {
    setPlaceId(null);
  }, []);

  useEffect(() => {
    if (isFocused && params?.placeId) {
      getRestaurant(params.placeId);
    }
  }, [isFocused, params?.placeId]);

  return {
    isLoading,
    onWebsite,
    placeId,
    setPlaceId,
    onRestaurant,
    getRestaurant,
    details,
  };
};
