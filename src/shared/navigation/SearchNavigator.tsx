import React from 'react';
import { Search } from 'screens';
import { useTranslation } from 'react-i18next';
import { Routes } from './Routes';
import { Stack, headerOptions } from './NavigationOptions';

export const SearchNavigator: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Stack.Navigator screenOptions={headerOptions}>
      <Stack.Screen
        name={Routes.SEARCH}
        component={Search}
        options={{ headerTitle: t('screens.membership') }}
      />
    </Stack.Navigator>
  );
};
