import React from 'react';
import {
  SignIn,
  SignUp,
  Welcome,
} from 'screens';
import { Routes } from './Routes';
import { Stack } from './NavigationOptions';
import { BottomTabBarNavigator } from './BottomTabBarNavigator';

export const MainNavigator: React.FC = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen
      name={Routes.BOTTOM_TAB_BAR_NAVIGATOR}
      component={BottomTabBarNavigator}
    />

    <Stack.Screen
      name={Routes.WELCOME}
      component={Welcome}
    />

    <Stack.Screen
      name={Routes.SIGN_IN}
      component={SignIn}
    />

    <Stack.Screen
      name={Routes.SIGN_UP}
      component={SignUp}
    />
  </Stack.Navigator>
);
