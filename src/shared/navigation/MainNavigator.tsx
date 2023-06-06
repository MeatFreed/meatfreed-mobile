import React from 'react';
import {
  Settings,
  SignIn,
  SignUp,
  Referral,
} from 'screens';
import { useTranslation } from 'react-i18next';
import { Routes } from './Routes';
import { Stack, authOptions, headerOptions } from './NavigationOptions';
import { BottomTabBarNavigator } from './tabs/BottomTabBarNavigator';
import { RestaurantNavigator } from './RestaurantNavigator';
import { PostNavigator } from './PostNavigator';
import { OfferNavigator } from './OfferNavigator';
import { AuthNavigator } from './AuthNavigation';

export const MainNavigator: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Stack.Navigator initialRouteName={Routes.BOTTOM_TAB_BAR_NAVIGATOR}>
      <Stack.Screen
        name={Routes.BOTTOM_TAB_BAR_NAVIGATOR}
        component={BottomTabBarNavigator}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name={Routes.AUTH_NAVIGATOR}
        component={AuthNavigator}
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
        name={Routes.POST_NAVIGATOR}
        component={PostNavigator}
        options={{
          ...headerOptions,
          headerShown: false,
        }}
      />

      <Stack.Screen
        name={Routes.OFFER_NAVIGATOR}
        component={OfferNavigator}
        options={{
          ...headerOptions,
          headerShown: false,
        }}
      />

      <Stack.Screen
        name={Routes.SETTINGS}
        component={Settings}
        options={{
          ...headerOptions,
          headerTitle: t('screens.settings'),
        }}
      />

      <Stack.Screen
        name={Routes.REFERRAL}
        component={Referral}
        options={{
          ...headerOptions,
          headerTitle: t('screens.referral'),
        }}
      />

      <Stack.Screen
        name={Routes.RESTAURANT_NAVIGATOR}
        component={RestaurantNavigator}
        options={{
          ...headerOptions,
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
