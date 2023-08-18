import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useTranslation } from 'react-i18next';
import { Dimensions, StyleSheet } from 'react-native';
import {
  Colors, FontFamily, FontSizes, Spaces,
} from 'themes';
import { Deals, Raffles } from 'screens';
import { Routes } from '../Routes';

const Tab = createMaterialTopTabNavigator();

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  tabBarLabelStyle: {
    fontSize: FontSizes.lg,
    fontFamily: FontFamily.PoppinsMedium,
    fontWeight: '700',
    textTransform: 'none',
  },
  tabBarIndicatorStyle: {
    backgroundColor: Colors.primary_500,
    width: width / 2 - Spaces['2xl'],
    marginHorizontal: Spaces.md,
  },
});

export const MyWalletTopTabNavigator: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Tab.Navigator
      screenOptions={{
        swipeEnabled: false,
        tabBarLabelStyle: styles.tabBarLabelStyle,
        tabBarActiveTintColor: Colors.basic_800,
        tabBarInactiveTintColor: Colors.basic_600,
        tabBarIndicatorStyle: styles.tabBarIndicatorStyle,
      }}
    >
      <Tab.Screen name={Routes.DEALS} component={Deals} options={{ tabBarLabel: t('screens.deals') }} />
      <Tab.Screen name={Routes.RAFFLES} component={Raffles} options={{ tabBarLabel: t('screens.raffles') }} />
    </Tab.Navigator>
  );
};
