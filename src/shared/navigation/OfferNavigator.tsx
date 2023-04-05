import React from 'react';
import { Offers } from 'screens';
import { useTranslation } from 'react-i18next';
import { Routes } from './Routes';
import { Stack, headerOptions } from './NavigationOptions';

export const OfferNavigator: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Stack.Navigator screenOptions={headerOptions}>
      <Stack.Screen
        name={Routes.OFFER}
        component={Offers}
        options={{ headerTitle: t('screens.offers') }}
      />
    </Stack.Navigator>
  );
};
