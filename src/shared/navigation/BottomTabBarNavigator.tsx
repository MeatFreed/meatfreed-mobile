import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import i18n from 'i18next';
import { useTypedSelector } from 'stores';
import { userSelectors } from 'stores/user';
import { Icon } from 'ui';
import { Routes } from './Routes';
import { SearchNavigator } from './SearchNavigator';
import { OfferNavigator } from './OfferNavigator';
import { LearnNavigator } from './LearnNavigator';
import { tabBarOptions } from './NavigationOptions';
import { ProfileNavigator } from './ProfileNavigator';

const Tab = createBottomTabNavigator();

const titles: { [key: string]: string } = {
  [Routes.SEARCH_NAVIGATOR]: i18n.t('screens.membership'),
  [Routes.OFFER_NAVIGATOR]: i18n.t('screens.offers'),
  [Routes.LEARN_NAVIGATOR]: i18n.t('screens.learn'),
  [Routes.PROFILE_NAVIGATOR]: i18n.t('screens.profile'),
};

const tabs: { [key: string]: string } = {
  [Routes.SEARCH_NAVIGATOR]: i18n.t('tabs.search'),
  [Routes.OFFER_NAVIGATOR]: i18n.t('tabs.offers'),
  [Routes.LEARN_NAVIGATOR]: i18n.t('tabs.learn'),
  [Routes.PROFILE_NAVIGATOR]: i18n.t('tabs.profile'),
};

export const BottomTabBarNavigator: React.FC = () => {
  const userId = useTypedSelector(userSelectors.userId);

  return (
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
          tabBarIcon: ({ color }) => (
            <Icon name="earth" size={24} color={color} />
          ),
        }}
        component={SearchNavigator}
      />

      <Tab.Screen
        name={Routes.OFFER_NAVIGATOR}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="percent" size={24} color={color} />
          ),
        }}
        component={OfferNavigator}
      />

      <Tab.Screen
        name={Routes.LEARN_NAVIGATOR}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="book-outline" size={24} color={color} />
          ),
        }}
        component={LearnNavigator}
      />

      {!!userId && (
        <Tab.Screen
          name={Routes.PROFILE_NAVIGATOR}
          options={{
            tabBarIcon: ({ color }) => (
              <Icon name="person-outline" size={24} color={color} />
            ),
          }}
          component={ProfileNavigator}
        />
      )}
    </Tab.Navigator>
  );
};
