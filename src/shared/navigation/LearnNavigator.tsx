import React from 'react';
import { Learn } from 'screens';
import { useTranslation } from 'react-i18next';
import { Routes } from './Routes';
import { Stack, headerOptions } from './NavigationOptions';

export const LearnNavigator: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Stack.Navigator screenOptions={headerOptions}>
      <Stack.Screen
        name={Routes.LEARN}
        component={Learn}
        options={{ headerTitle: t('screens.learn') }}
      />
    </Stack.Navigator>
  );
};
