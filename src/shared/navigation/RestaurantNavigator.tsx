import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';
import { AnyType, isIOS } from 'helpers';
import { RestaurantDetails } from 'screens';
import { Routes } from './Routes';
import { restaurantOptions } from './NavigationOptions';

const Stack = isIOS ? createStackNavigator() : createNativeStackNavigator();

export const RestaurantNavigator: React.FC = () => (
  <Stack.Navigator
    initialRouteName={Routes.RESTAURANT_DETAILS}
    screenOptions={restaurantOptions as AnyType}
  >
    <Stack.Screen
      name={Routes.RESTAURANT_DETAILS}
      component={RestaurantDetails}
      options={{ headerTitle: '', headerTransparent: true }}
    />
  </Stack.Navigator>
);
