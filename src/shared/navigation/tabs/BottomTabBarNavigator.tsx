import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import i18n from 'i18next';
import { useTypedSelector } from 'stores';
import { userSelectors } from 'stores/user';
import { Box, Colors, Images } from 'themes';
import { Routes } from '../Routes';
import { HomeNavigator } from '../HomeNavigator';
import { OffersNavigator } from '../OffersNavigator';
import { PostsNavigator } from '../PostsNavigator';
import { tabBarOptions } from '../NavigationOptions';
import { ProfileNavigator } from '../ProfileNavigator';
import { MyWalletNavigator } from '../MyWalletNavigator';

const Tab = createBottomTabNavigator();

const titles: { [key: string]: string } = {
  [Routes.HOME_NAVIGATOR]: i18n.t('screens.membership'),
  [Routes.OFFERS_NAVIGATOR]: i18n.t('screens.offers'),
  [Routes.MY_WALLET_NAVIGATOR]: i18n.t('screens.my-wallet'),
  [Routes.POSTS_NAVIGATOR]: i18n.t('screens.posts'),
  [Routes.PROFILE_NAVIGATOR]: i18n.t('screens.profile'),
};

const tabs: { [key: string]: string } = {
  [Routes.HOME_NAVIGATOR]: i18n.t('tabs.search'),
  [Routes.OFFERS_NAVIGATOR]: i18n.t('tabs.offers'),
  [Routes.MY_WALLET_NAVIGATOR]: '',
  [Routes.POSTS_NAVIGATOR]: i18n.t('tabs.posts'),
  [Routes.PROFILE_NAVIGATOR]: i18n.t('tabs.profile'),
};

export const BottomTabBarNavigator: React.FC = () => {
  const userId = useTypedSelector(userSelectors.userId);

  return (
    <Tab.Navigator
      initialRouteName={Routes.OFFERS_NAVIGATOR}
      screenOptions={({ route }) => ({
        ...tabBarOptions,
        tabBarLabel: tabs[route.name],
        headerTitle: titles[route.name],
      })}
    >
      <Tab.Screen
        name={Routes.HOME_NAVIGATOR}
        options={{
          tabBarIcon: ({ color }) => <Images.Home color={color} />,
        }}
        component={HomeNavigator}
      />

      <Tab.Screen
        name={Routes.OFFERS_NAVIGATOR}
        options={{
          tabBarIcon: ({ color }) => <Images.Offers color={color} />,
        }}
        component={OffersNavigator}
      />

      {!!userId && (
        <Tab.Screen
          name={Routes.MY_WALLET_NAVIGATOR}
          options={{
            tabBarIcon: () => (
              <Box br="100px" bgc={Colors.basic_550} ai="center" jc="center" w="61px" h="61px">
                <Images.MyWallet />
              </Box>
            ),
            tabBarLabel: () => null,
            tabBarItemStyle: {
              marginTop: 8,
              width: 61,
              height: 61,
            },
          }}
          component={MyWalletNavigator}
        />
      )}

      <Tab.Screen
        name={Routes.POSTS_NAVIGATOR}
        options={{
          tabBarIcon: ({ color }) => <Images.Latest color={color} />,
        }}
        component={PostsNavigator}
      />

      {!!userId && (
        <Tab.Screen
          name={Routes.PROFILE_NAVIGATOR}
          options={{
            tabBarIcon: ({ color }) => <Images.User color={color} />,
          }}
          component={ProfileNavigator}
        />
      )}
    </Tab.Navigator>
  );
};
