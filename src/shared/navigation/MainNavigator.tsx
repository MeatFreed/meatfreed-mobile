import React from 'react';
import {
  PostDetails,
  Referral,
  Settings,
  SignIn,
  SignUp,
  Welcome,
} from 'screens';
import { useTranslation } from 'react-i18next';
import { useGetReactions } from 'hooks';
import { Routes } from './Routes';
import { Stack, authOptions, headerOptions } from './NavigationOptions';
import { BottomTabBarNavigator } from './BottomTabBarNavigator';

export const MainNavigator: React.FC = () => {
  const { t } = useTranslation();

  useGetReactions();

  return (
    <Stack.Navigator initialRouteName={Routes.BOTTOM_TAB_BAR_NAVIGATOR}>
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
        name={Routes.POST_DETAILS}
        component={PostDetails}
        options={{ ...headerOptions, headerTitle: t('screens.post-details') }}
      />

      <Stack.Screen
        name={Routes.SETTINGS}
        component={Settings}
        options={{
          ...headerOptions,
          headerTitle: t('screens.settings'),
        }}
      />
    </Stack.Navigator>
  );
};
