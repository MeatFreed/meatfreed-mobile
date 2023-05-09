import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';
import { AnyType, isIOS } from 'helpers';
import { PostDetails } from 'screens';
import { Routes } from './Routes';
import { restaurantOptions } from './NavigationOptions';

const Stack = isIOS ? createStackNavigator() : createNativeStackNavigator();

export const PostNavigator: React.FC = () => (
  <Stack.Navigator
    initialRouteName={Routes.POST_DETAILS}
    screenOptions={restaurantOptions as AnyType}
  >
    <Stack.Screen
      name={Routes.POST_DETAILS}
      component={PostDetails}
      options={{ headerTitle: '', headerTransparent: true }}
    />
  </Stack.Navigator>
);
