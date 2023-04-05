import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import i18n from 'i18next';
import styled from 'styled-components/native';
import { Images } from 'themes';
import { Routes } from './Routes';
import { SearchNavigator } from './SearchNavigator';
import { OfferNavigator } from './OfferNavigator';
import { LearnNavigator } from './LearnNavigator';
import { tabBarOptions } from './NavigationOptions';

const Tab = createBottomTabNavigator();

const titles: { [key: string]: string } = {
  [Routes.SEARCH_NAVIGATOR]: i18n.t('screens.membership'),
  [Routes.OFFER_NAVIGATOR]: i18n.t('screens.offers'),
  [Routes.LEARN_NAVIGATOR]: i18n.t('screens.learn'),
};

const tabs: { [key: string]: string } = {
  [Routes.SEARCH_NAVIGATOR]: i18n.t('tabs.search'),
  [Routes.OFFER_NAVIGATOR]: i18n.t('tabs.offers'),
  [Routes.LEARN_NAVIGATOR]: i18n.t('tabs.learn'),
};

const BarIcon = styled.Image`
  width: 20px;
  height: 20px;
`;

export const BottomTabBarNavigator: React.FC = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      ...tabBarOptions,
      tabBarLabel: tabs[route.name],
      headerTitle: titles[route.name],
    })}
  >
    <Tab.Screen
      name={Routes.SEARCH_NAVIGATOR}
      options={{
        tabBarIcon: ({ color }) => <BarIcon source={Images.Search} style={{ tintColor: color }} />,
      }}
      component={SearchNavigator}
    />

    <Tab.Screen
      name={Routes.OFFER_NAVIGATOR}
      options={{
        tabBarIcon: ({ color }) => <BarIcon source={Images.Offer} style={{ tintColor: color }} />,
      }}
      component={OfferNavigator}
    />

    <Tab.Screen
      name={Routes.LEARN_NAVIGATOR}
      options={{
        tabBarIcon: ({ color }) => <BarIcon source={Images.Learn} style={{ tintColor: color }} />,
      }}
      component={LearnNavigator}
    />
  </Tab.Navigator>
);
