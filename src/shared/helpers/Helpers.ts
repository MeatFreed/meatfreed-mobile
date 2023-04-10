/* eslint-disable no-undef */
/* eslint-disable no-plusplus */
/* eslint-disable no-bitwise */
/* eslint-disable no-multi-assign */
import { Linking, Platform } from 'react-native';
import i18n from 'i18next';
import { hasNotch as hasTopOffset } from 'react-native-device-info';
import dynamicLinks, { FirebaseDynamicLinksTypes } from '@react-native-firebase/dynamic-links';
import Config from 'react-native-config';

export type AnyType = any;

export const isDev = __DEV__;

export const hasNotch = hasTopOffset();

export const noop = () => {};

export const isIOS = Platform.OS === 'ios';

export const touchableConfig = {
  delayPressIn: 0,
  delayPressOut: 0,
  activeOpacity: 0.8,
};

export const withDelay = (ms: number) => new Promise((resolve) => {
  setTimeout(resolve, ms);
});

export const uuid = () => {
  const chars = '0123456789abcdef'.split('');

  const uuids = [];
  const rnd = Math.random;

  let r;

  uuids[8] = uuids[13] = uuids[18] = uuids[23] = '-';
  uuids[14] = '4';

  for (let i = 0; i < 36; i++) {
    if (!uuids[i]) {
      r = 0 | (rnd() * 16);

      uuids[i] = chars[i === 19 ? (r & 0x3) | 0x8 : r & 0xf];
    }
  }

  return uuids.join('');
};

export const generateShareLink = async (
  field: string,
  value: string,
) => {
  try {
    const generatedLink = await dynamicLinks().buildShortLink({
      link: `${Config.FIREBASE_DYNAMIC_URL || ''}?${field}=${value}`,
      domainUriPrefix: Config.FIREBASE_DYNAMIC_URL_PREFIX || '',
      android: {
        packageName: Config.BUNDLE_ID || '',
      },
      ios: {
        bundleId: Config.BUNDLE_ID || '',
        appStoreId: Config.APP_STORE_ID || '',
      },
    });

    return generatedLink || '';
  } catch {
    return Promise.reject(i18n.t('errors.generate-share-link'));
  }
};

export const getFirebaseDeepLinkParam = (
  firebaseUrl: FirebaseDynamicLinksTypes.DynamicLink | null,
  isDynamicLink?: boolean,
) => {
  if (!firebaseUrl) {
    return '';
  }

  const urlParts = firebaseUrl.url.split('?');

  const param = urlParts[1];
  const parts = param.split('=');

  return {
    [parts[0]]: parts[1],
    ...(isDynamicLink ? { isDynamicLink: 'true' } : {}),
  };
};

export const openLink = (link: string) => {
  if (!link) {
    return;
  }

  Linking.canOpenURL(link).then((value) => {
    if (value) {
      Linking.openURL(link);
    }
  });
};
