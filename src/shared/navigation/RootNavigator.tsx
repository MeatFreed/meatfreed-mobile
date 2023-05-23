import { NavigationContainer } from '@react-navigation/native';
import React, { useCallback, useEffect } from 'react';
import RNBootSplash from 'react-native-bootsplash';
import { ToastMessage } from 'ui';
import { RouteService } from 'services';
import { PostHogProvider } from 'posthog-react-native';
import Config from 'react-native-config';
import Courier from '@trycourier/courier-react-native';
import {
  useAnalytics, useCourier, useDynamicLinkListener, useGetPosition, useGetReactions, useGoogle,
} from 'hooks';
import { AnyType, isDev, withDelay } from 'helpers';
import { useTypedSelector } from 'stores';
import { userSelectors } from 'stores/user';
import { Stack } from './NavigationOptions';
import { Routes } from './Routes';
import { MainNavigator } from './MainNavigator';
import { linking } from './Linking';

export const RootNavigator: React.FC = () => {
  useDynamicLinkListener();

  const { onScreenView } = useAnalytics();

  const userId = useTypedSelector(userSelectors.userId);

  useGetReactions();

  const { getPermission } = useGetPosition();
  const { configure } = useGoogle();

  const { onCourierSignIn } = useCourier();

  const onPushNotificationClicked = (push: AnyType) => {
    console.log({ push });
  };

  const onPushNotificationDelivered = (push: AnyType) => {
    console.log({ push });
  };

  const bootstrap = useCallback(async () => {
    configure();

    RNBootSplash.hide({ fade: true });

    await withDelay(1000);

    getPermission();
  }, []);

  useEffect(() => {
    bootstrap();

    const subscribe = Courier.registerPushNotificationListeners({
      onPushNotificationClicked,
      onPushNotificationDelivered,
    });

    return () => {
      subscribe?.();
    };
  }, [bootstrap]);

  useEffect(() => {
    if (userId) {
      onCourierSignIn(userId);
    }
  }, [userId]);

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
