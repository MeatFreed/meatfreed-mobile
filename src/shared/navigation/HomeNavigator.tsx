import React from 'react';
import { Home } from 'screens';
import { PortalProvider } from '@gorhom/portal';
import { useTranslation } from 'react-i18next';
import { Colors, FontFamily } from 'themes';
import { Routes } from './Routes';
import { Stack, headerOptions } from './NavigationOptions';

export const HomeNavigator: React.FC = () => {
  const { t } = useTranslation();

  return (
    <PortalProvider>
      <Stack.Navigator screenOptions={headerOptions}>
        <Stack.Screen
          name={Routes.HOME}
          component={Home}
          options={{
            headerTitle: t('screens.membership'),
            headerTitleStyle: {
              fontSize: 28,
              fontFamily: FontFamily.PoppinsSemiMedium,
              fontWeight: '600',
              color: Colors.primary_500,
            },
          }}
        />
      </Stack.Navigator>
    </PortalProvider>
  );
};
