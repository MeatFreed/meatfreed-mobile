import { Linking } from 'react-native';
import { Routes } from 'navigation';
import { AnyType, getFirebaseDeepLinkParam } from 'helpers';
import Config from 'react-native-config';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import { RouteService } from 'services';
import { store } from 'stores';

const { URL_SCHEMA, HOST_URL } = Config as AnyType;

export const linking = {
  prefixes: [`${URL_SCHEMA}://`, `https://${HOST_URL}/`],
  config: {
    screens: {
      [Routes.MAIN_NAVIGATOR]: {
        initialRouteName: Routes.BOTTOM_TAB_BAR_NAVIGATOR,
        screens: {
          [Routes.SIGN_UP]: 'sign-up/:code',
          [Routes.POSTS_NAVIGATOR]: 'post-details/:contentId',
        },
      },
    },
  },

  async getInitialURL() {
    const initialLink = await dynamicLinks().getInitialLink();

    if (initialLink) {
      const userId = store.getState().user.uid;

      const formattedLink = getFirebaseDeepLinkParam(initialLink) as AnyType;

      if (userId && formattedLink.contentId) {
        RouteService.navigate(Routes.POST_NAVIGATOR, {
          screen: Routes.POST_DETAILS,
          params: { contentId: formattedLink.contentId },
        });

        return `${URL_SCHEMA}://post-details/${formattedLink.contentId}`;
      }

      if (!userId && formattedLink.contentId) {
        RouteService.navigate(Routes.SIGN_UP, { code: undefined });

        return `${URL_SCHEMA}://sign-up/${undefined}`;
      }

      if (!userId && formattedLink.code) {
        RouteService.navigate(Routes.SIGN_UP, { code: formattedLink.code });

        return `${URL_SCHEMA}://sign-up/${formattedLink.code}`;
      }

      return '';
    }

    const url = await Linking.getInitialURL();

    if (url !== null) {
      return url;
    }

    return '';
  },

  subscribe(listener: (url: string) => void) {
    const onReceiveURL = ({ url }: {url: string}) => listener(url);

    const unsubscribe = dynamicLinks().onLink(({ url }) => {
      listener(url);
    });

    const subscribeUrl = Linking.addEventListener('url', onReceiveURL);

    return () => {
      subscribeUrl.remove();
      unsubscribe();
    };
  },
};
