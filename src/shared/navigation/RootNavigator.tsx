import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import RNBootSplash from 'react-native-bootsplash';
import { ToastMessage } from 'ui';
import { PortalProvider } from '@gorhom/portal';
import { RouteService } from 'services';
import { PostHogProvider } from 'posthog-react-native';
import Config from 'react-native-config';
import { useAnalytics } from 'hooks';
import { Stack } from './NavigationOptions';
import { Routes } from './Routes';
import { MainNavigator } from './MainNavigator';
import { linking } from './Linking';

export const RootNavigator: React.FC = () => {
  const { onScreenView } = useAnalytics();

  useEffect(() => {
    RNBootSplash.hide({ fade: true });
  }, []);

  return (
    <>
      <PortalProvider>
        <NavigationContainer
          ref={RouteService.navigationRef}
          linking={linking}
          onStateChange={onScreenView}
        >
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
        </NavigationContainer>
      </PortalProvider>

      <ToastMessage />
    </>
  );
};
