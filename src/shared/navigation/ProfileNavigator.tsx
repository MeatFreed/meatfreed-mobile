import React from 'react';
import { Profile } from 'screens';
import { useTranslation } from 'react-i18next';
import { Routes } from './Routes';
import { Stack, headerOptions } from './NavigationOptions';

export const ProfileNavigator: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Stack.Navigator screenOptions={headerOptions}>
      <Stack.Screen
        name={Routes.PROFILE}
        component={Profile}
        options={{ headerTitle: t('screens.profile') }}
      />
    </Stack.Navigator>
  );
};
