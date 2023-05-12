import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { AllOffers, ClaimedOffers } from 'screens';
import { useTranslation } from 'react-i18next';
import { Dimensions, StyleSheet } from 'react-native';
import {
  Colors, FontFamily, FontSizes, Spaces,
} from 'themes';
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

export const MaterialTopTabNavigator: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: styles.tabBarLabelStyle,
        tabBarActiveTintColor: Colors.basic_800,
        tabBarInactiveTintColor: Colors.basic_600,
        tabBarIndicatorStyle: styles.tabBarIndicatorStyle,
      }}
    >
      <Tab.Screen name={Routes.ALL_OFFERS} component={AllOffers} options={{ tabBarLabel: t('screens.all-offers') }} />
      <Tab.Screen name={Routes.CLAIMED_OFFERS} component={ClaimedOffers} options={{ tabBarLabel: t('screens.claimed-offers') }} />
    </Tab.Navigator>
  );
};
