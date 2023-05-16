import React from 'react';
import { useTranslation } from 'react-i18next';
import { Routes } from './Routes';
import { Stack, headerOptions } from './NavigationOptions';
import { MaterialTopTabNavigator } from './tabs/MaterialTopTabNavigator';

export const OffersNavigator: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Stack.Navigator screenOptions={headerOptions}>
      <Stack.Screen
        name={Routes.OFFER_TOP_TAB_NAVIGATOR}
        component={MaterialTopTabNavigator}
        options={{ headerTitle: t('screens.offers') }}
      />
    </Stack.Navigator>
  );
};
