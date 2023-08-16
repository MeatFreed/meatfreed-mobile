import React from 'react';
import { useTranslation } from 'react-i18next';
import { Routes } from './Routes';
import { Stack, headerOptions } from './NavigationOptions';
import { MaterialTopTabNavigator } from './tabs/MaterialTopTabNavigator';

export const MyWalletNavigator: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Stack.Navigator screenOptions={headerOptions}>
      <Stack.Screen
        name={Routes.MY_WALLET_TOP_TAB_NAVIGATOR}
        component={MaterialTopTabNavigator}
        options={{ headerTitle: t('screens.my-wallet') }}
      />
    </Stack.Navigator>
  );
};
