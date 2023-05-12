import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';
import { AnyType, isIOS } from 'helpers';
import { RaffleDetails, VoucherDetails } from 'screens';
import { Routes } from './Routes';
import { restaurantOptions } from './NavigationOptions';

const Stack = isIOS ? createStackNavigator() : createNativeStackNavigator();

export const OfferNavigator: React.FC = () => (
  <Stack.Navigator screenOptions={restaurantOptions as AnyType}>
    <Stack.Screen
      name={Routes.VOUCHER_DETAILS}
      component={VoucherDetails}
      options={{ headerTitle: '', headerTransparent: true }}
    />

    <Stack.Screen
      name={Routes.RAFFLE_DETAILS}
      component={RaffleDetails}
      options={{ headerTitle: '', headerTransparent: true }}
    />
  </Stack.Navigator>
);
