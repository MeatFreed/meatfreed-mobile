import React from 'react';
import {
  LearnDetails,
  SignIn,
  SignUp,
  Welcome,
} from 'screens';
import { usePosition } from 'hooks';
import { useTranslation } from 'react-i18next';
import { Routes } from './Routes';
import { Stack, headerOptions } from './NavigationOptions';
import { BottomTabBarNavigator } from './BottomTabBarNavigator';

export const MainNavigator: React.FC = () => {
  const { t } = useTranslation();

  usePosition();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Routes.BOTTOM_TAB_BAR_NAVIGATOR}
        component={BottomTabBarNavigator}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name={Routes.WELCOME}
        component={Welcome}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name={Routes.SIGN_IN}
        component={SignIn}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name={Routes.SIGN_UP}
        component={SignUp}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name={Routes.LEARN_DETAILS}
        component={LearnDetails}
        options={{ ...headerOptions, headerTitle: t('screens.post-details') }}
      />
    </Stack.Navigator>
  );
};
