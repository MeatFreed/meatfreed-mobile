import React from 'react';
import { StackNavigationOptions, createStackNavigator } from '@react-navigation/stack';
import {
  AnyType, hasNotch, isIOS, openLink,
} from 'helpers';
import {
  Box, Colors, FontFamily, Spaces,
} from 'themes';
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { HeaderBackButtonProps } from '@react-navigation/elements';
import { RouteService } from 'services';
import { Button } from 'ui';
import Config from 'react-native-config';
import { RootStackParamList } from './RootStackParamList';

const { LIVE_CHAT_URL, LIVE_CHAT_LICENSE } = Config as AnyType;

export const Stack = createStackNavigator<RootStackParamList>();

export const tabBarOptions: BottomTabNavigationOptions = {
  tabBarHideOnKeyboard: true,
  tabBarInactiveTintColor: Colors.tabBarInactiveTintColor,
  tabBarActiveTintColor: Colors.tabBarActiveTintColor,
  tabBarStyle: {
    height: hasNotch ? 100 : 70,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    backgroundColor: Colors.white,
  },
  tabBarItemStyle: {
    marginTop: 15,
    width: 50,
    height: 50,
  },
  tabBarLabelStyle: {
    fontSize: 14,
    marginTop: 10,
    fontWeight: '500',
  },
  tabBarLabel: () => null,
  headerShown: false,
};

export const headerOptions: StackNavigationOptions = {
  headerTitleAlign: 'center',
  headerBackTitleVisible: false,
  headerTintColor: Colors.white,
  headerTitleStyle: {
    fontSize: 20,
    lineHeight: 24,
    fontFamily: FontFamily.PoppinsSemiMedium,
    color: Colors.basic_800,
  },
  headerLeft: (props: HeaderBackButtonProps) => {
    if (props.canGoBack) {
      return (
        <Box ml={Spaces.xs}>
          <Button type="icon" iconColor={Colors.tabBarInactiveTintColor} iconName="arrow-back" onPress={RouteService.goBack} />
        </Box>
      );
    }

    return null;
  },
  headerRight: () => (
    <Box mr={Spaces.xs}>
      <Button type="icon" iconName="message-circle-outline" iconColor={Colors.tabBarInactiveTintColor} onPress={() => openLink(`${LIVE_CHAT_URL}=${LIVE_CHAT_LICENSE}`)} />
    </Box>
  ),
};

export const restaurantOptions: StackNavigationOptions = {
  headerTitleAlign: 'center',
  headerBackTitleVisible: false,
  headerTintColor: Colors.white,
  headerTitleStyle: {
    fontSize: 20,
    lineHeight: 24,
    fontFamily: FontFamily.PoppinsSemiMedium,
    color: Colors.basic_800,
  },
  headerLeft: (props: HeaderBackButtonProps) => {
    if (props.canGoBack) {
      return (
        <Box ml={isIOS ? Spaces.xs : -6}>
          <Button type="icon" iconColor={Colors.basic_100} iconName="arrow-back" onPress={RouteService.goBack} />
        </Box>
      );
    }

    return null;
  },
  headerRight: () => (
    <Box mr={isIOS ? Spaces.xs : -6}>
      <Button type="icon" iconName="message-circle-outline" iconColor={Colors.basic_100} onPress={() => openLink(`${LIVE_CHAT_URL}=${LIVE_CHAT_LICENSE}`)} />
    </Box>
  ),
};

export const authOptions: StackNavigationOptions = {
  headerTitleAlign: 'center',
  headerBackTitleVisible: false,
  headerTintColor: Colors.white,
  headerTitleStyle: {
    fontSize: 20,
    lineHeight: 24,
    fontFamily: FontFamily.PoppinsSemiMedium,
    color: Colors.basic_800,
  },
  headerStyle: {
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.basic_300,
  },
  headerLeft: (props: HeaderBackButtonProps) => {
    if (props.canGoBack) {
      return (
        <Box ml={Spaces.xs}>
          <Button type="icon" iconColor={Colors.tabBarInactiveTintColor} iconName="arrow-back" onPress={RouteService.goBack} />
        </Box>
      );
    }

    return null;
  },
};
