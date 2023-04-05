/* eslint-disable no-undef */
/* eslint-disable no-plusplus */
/* eslint-disable no-bitwise */
/* eslint-disable no-multi-assign */
import { Platform } from 'react-native';
import { hasNotch as hasTopOffset } from 'react-native-device-info';

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
