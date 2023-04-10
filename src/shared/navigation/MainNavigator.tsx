import React from 'react';
import {
  LearnDetails,
  Referral,
  SignIn,
  SignUp,
  Welcome,
} from 'screens';
import { useTranslation } from 'react-i18next';
import { Routes } from './Routes';
import { Stack, authOptions, headerOptions } from './NavigationOptions';
import { BottomTabBarNavigator } from './BottomTabBarNavigator';

export const MainNavigator: React.FC = () => {
  const { t } = useTranslation();

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
        options={{
          ...authOptions,
          headerTitle: t('screens.sign-in'),
        }}
      />

      <Stack.Screen
        name={Routes.SIGN_UP}
        component={SignUp}
        options={{
          ...authOptions,
          headerTitle: t('screens.register'),
        }}
      />

      <Stack.Screen
        name={Routes.REFERRAL}
        component={Referral}
        options={{ ...headerOptions, headerTitle: t('screens.my-referral') }}
      />

      <Stack.Screen
        name={Routes.LEARN_DETAILS}
        component={LearnDetails}
        options={{ ...headerOptions, headerTitle: t('screens.post-details') }}
      />
    </Stack.Navigator>
  );
};
