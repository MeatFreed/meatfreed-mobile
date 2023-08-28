/* eslint-disable no-console */
import { NavigationContainer } from '@react-navigation/native';
import React, { useCallback, useEffect } from 'react';
import RNBootSplash from 'react-native-bootsplash';
import { ToastMessage } from 'ui';
import { RouteService } from 'services';
import { PostHogProvider } from 'posthog-react-native';
import Config from 'react-native-config';
import Courier from '@trycourier/courier-react-native';
import {
  useAnalytics,
  useBrevoContact,
  useDynamicLinkListener,
  useGetPosition,
  useGetReactions,
  useGetUserByUserId,
  useGoogle,
} from 'hooks';
import { AnyType, isDev } from 'helpers';
import { Stack } from './NavigationOptions';
import { Routes } from './Routes';
import { MainNavigator } from './MainNavigator';
import { linking } from './Linking';

export const RootNavigator: React.FC = () => {
  useDynamicLinkListener();

  const { onScreenView } = useAnalytics();

  useBrevoContact();

  useGetReactions();

  const { getPermissions, onClearWatch } = useGetPosition();

  useGetUserByUserId();

  const { configure } = useGoogle();

  const onPushNotificationClicked = (push: AnyType) => {
    console.log({ push });
  };

  const onPushNotificationDelivered = (push: AnyType) => {
    console.log({ push });
  };

  const bootstrap = useCallback(async () => {
    configure();

    RNBootSplash.hide({ fade: true });

    getPermissions();
  }, []);

  useEffect(() => {
    bootstrap();

    const subscribe = Courier.registerPushNotificationListeners({
      onPushNotificationClicked,
      onPushNotificationDelivered,
    });

    return () => {
      subscribe?.();
      onClearWatch();
    };
  }, [bootstrap]);

  return (
    <>
      <NavigationContainer
        ref={RouteService.navigationRef}
        linking={linking}
        onStateChange={onScreenView}
      >
        {isDev ? (
          <Stack.Navigator>
            <Stack.Screen
              name={Routes.MAIN_NAVIGATOR}
              component={MainNavigator}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        ) : (
          <PostHogProvider
            apiKey={Config.POST_HOG_API_KEY}
            options={{ host: Config.POST_HOG_API_HOST }}
          >
            <Stack.Navigator>
              <Stack.Screen
                name={Routes.MAIN_NAVIGATOR}
                component={MainNavigator}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          </PostHogProvider>
        )}
      </NavigationContainer>

      <ToastMessage />
    </>
  );
};
