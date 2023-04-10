import { Linking } from 'react-native';
import { Routes } from 'navigation';
import { AnyType, getFirebaseDeepLinkParam } from 'helpers';
import Config from 'react-native-config';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import { RouteService } from 'services';

const { URL_SCHEMA, HOST_URL } = Config as AnyType;

export const linking = {
  prefixes: [`${URL_SCHEMA}://`, `https://${HOST_URL}/`],
  config: {
    screens: {
      [Routes.MAIN_NAVIGATOR]: {
        initialRouteName: Routes.BOTTOM_TAB_BAR_NAVIGATOR,
        screens: {
          [Routes.SIGN_UP]: 'sign-up/:referralCode',
        },
      },
    },
  },

  async getInitialURL() {
    const initialLink = await dynamicLinks().getInitialLink();

    if (initialLink) {
      const formattedLink = getFirebaseDeepLinkParam(initialLink) as AnyType;

      RouteService.reset(Routes.SIGN_UP, { code: formattedLink.code });

      return `${URL_SCHEMA}://sign-up/${formattedLink.code}`;
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
