import { NavigationState } from '@react-navigation/native';
import analytics from '@react-native-firebase/analytics';
import { usePostHog } from 'posthog-react-native';
import { RouteService } from 'services';
import debounce from 'lodash.debounce';
import isEqual from 'lodash.isequal';

export const useAnalytics = () => {
  const postHog = usePostHog();

  const onScreenView = debounce(async (state?: NavigationState) => {
    const previousRoute = RouteService.navigationRef?.current;
    const currentRoute = state?.routes[state?.index];

    const currentRouteName = currentRoute?.name;

    if (!isEqual(previousRoute, currentRoute)) {
      analytics().logScreenView({
        screen_name: currentRouteName,
        screen_class: currentRouteName,
      });

      postHog?.capture('screen_view', {
        screen_name: currentRouteName,
        screen_class: currentRouteName,
      });
    }
  }, 1000);

  const onLogEvent = (event: string, params?: object) => {
    analytics().logEvent(event, params);
    postHog?.capture(event, params);
  };

  return {
    onScreenView,
    onLogEvent,
  };
};
