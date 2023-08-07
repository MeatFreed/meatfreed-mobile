/* eslint-disable @typescript-eslint/no-unused-vars */
import { Restaurant } from 'api';
import firestore from '@react-native-firebase/firestore';
import { ToastService } from 'services';
import { useTypedSelector } from 'stores';
import { userSelectors } from 'stores/user';
import { AnyType } from 'helpers';
import { useTranslation } from 'react-i18next';

export const useGetRestaurantFavoriteActions = (restaurant: Restaurant) => {
  const { t } = useTranslation();

  const userId = useTypedSelector(userSelectors.userId);

  const favoriteUserIds = restaurant?.favoriteUserIds || [];

  const isAlreadyFavorite = favoriteUserIds?.includes(userId);

  const onRestaurantFavorite = async () => {
    try {
      const newFavoriteUserIds = isAlreadyFavorite
        ? favoriteUserIds?.filter((ids) => ids !== userId)
        : [...favoriteUserIds, userId];

      await firestore().collection('companies_storyblock').doc(restaurant.uuid).update({
        favoriteUserIds: newFavoriteUserIds,
      });

      if (!isAlreadyFavorite) {
        ToastService.onSuccess({ title: t('restaurant-details.favorites'), position: 'bottom' });
      }
    } catch (error: AnyType) {
      ToastService.onDanger({ title: error?.message || t('errors.server-unable') });
    }
  };

  return {
    onRestaurantFavorite,
    isAlreadyFavorite,
  };
};
