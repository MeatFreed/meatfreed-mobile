import React from 'react';
import { StackNavigationOptions, createStackNavigator } from '@react-navigation/stack';
import LinearGradient from 'react-native-linear-gradient';
import { AnyType, hasNotch, touchableConfig } from 'helpers';
import {
  Box, Colors, FontFamily, Spaces,
} from 'themes';
import styled from 'styled-components/native';
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { HeaderBackButtonProps } from '@react-navigation/elements';
import { RouteService } from 'services';
import { Icon } from 'ui';
import { RootStackParamList } from './RootStackParamList';

export const Stack = createStackNavigator<RootStackParamList>();

const StyledGradient = styled(LinearGradient as AnyType)<{ hasRadius?: boolean }>`
  flex: 1;
  border-top-left-radius: ${({ hasRadius }) => (hasRadius ? '16px' : '0px')};
  border-top-right-radius: ${({ hasRadius }) => (hasRadius ? '16px' : '0px')};
`;

const IconButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  border-radius: 0px;
  align-items: center;
  justify-content: center;
`;

export const tabBarOptions: BottomTabNavigationOptions = {
  tabBarHideOnKeyboard: true,
  tabBarInactiveTintColor: Colors.basic_300,
  tabBarActiveTintColor: Colors.basic_100,
  tabBarStyle: {
    height: hasNotch ? 100 : 70,
    marginTop: -10,
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
    marginTop: 10,
    width: 50,
    height: 50,
  },
  tabBarLabelStyle: {
    fontSize: 14,
    fontWeight: '500',
  },
  tabBarLabel: () => null,
  headerShown: false,
  tabBarBackground: () => (
    <StyledGradient
      locations={[0.46, 1]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      hasRadius
      colors={[Colors.gradient_100, Colors.gradient_200]}
    />
  ),
};

export const headerOptions: StackNavigationOptions = {
  headerTitleAlign: 'center',
  headerBackTitleVisible: false,
  headerTintColor: Colors.white,
  headerTitleStyle: {
    fontSize: 20,
    fontFamily: FontFamily.Bold,
    color: Colors.basic_100,
  },
  headerBackground: () => (
    <StyledGradient
      locations={[0.46, 1]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      colors={[Colors.gradient_100, Colors.gradient_200]}
    />
  ),
  headerLeft: (props: HeaderBackButtonProps) => {
    if (props.canGoBack) {
      return (
        <Box ml={Spaces.xs}>
          <IconButton {...touchableConfig} onPress={RouteService.goBack}>
            <Icon name="arrow-back" size={24} color={Colors.basic_100} />
          </IconButton>
        </Box>
      );
    }

    return null;
  },
};

export const authOptions: StackNavigationOptions = {
  headerTitleAlign: 'center',
  headerBackTitleVisible: false,
  headerTintColor: Colors.white,
  headerTitleStyle: {
    fontSize: 20,
    fontFamily: FontFamily.Bold,
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
          <IconButton {...touchableConfig} onPress={RouteService.goBack}>
            <Icon name="arrow-back" size={24} color={Colors.basic_800} />
          </IconButton>
        </Box>
      );
    }

    return null;
  },
};
