import { NavigationContainer } from '@react-navigation/native';
import React, { useCallback, useEffect } from 'react';
import RNBootSplash from 'react-native-bootsplash';
import { ToastMessage } from 'ui';
import { RouteService } from 'services';
import { PostHogProvider } from 'posthog-react-native';
import Config from 'react-native-config';
import {
  useAnalytics, useDynamicLinkListener, useGetPosition, useGoogle,
} from 'hooks';
import { isDev, withDelay } from 'helpers';
import { Stack } from './NavigationOptions';
import { Routes } from './Routes';
import { MainNavigator } from './MainNavigator';
import { linking } from './Linking';

export const RootNavigator: React.FC = () => {
  useDynamicLinkListener();

  const { onScreenView } = useAnalytics();

  const { getPermission } = useGetPosition();
  const { configure } = useGoogle();

  const bootstrap = useCallback(async () => {
    configure();

    RNBootSplash.hide({ fade: true });

    await withDelay(1000);

    getPermission();
  }, []);

  useEffect(() => {
    bootstrap();
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
