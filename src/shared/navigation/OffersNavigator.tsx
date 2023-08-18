import React from 'react';
import { useTranslation } from 'react-i18next';
import { Routes } from './Routes';
import { OffersTopTabNavigator } from './tabs/OffersTopTabNavigator';
import { Stack, headerOptions } from './NavigationOptions';

export const OffersNavigator: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Stack.Navigator screenOptions={headerOptions}>
      <Stack.Screen
        name={Routes.OFFERS_TOP_TAB_NAVIGATOR}
        component={OffersTopTabNavigator}
        options={{ headerTitle: t('screens.offers') }}
      />
    </Stack.Navigator>
  );
};
