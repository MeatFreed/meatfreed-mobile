/* eslint-disable no-console */
import Courier from '@trycourier/courier-react-native';
import { AnyType, isDev, isIOS } from 'helpers';
import Config from 'react-native-config';

const { COURIER_API_KEY } = Config as AnyType;

export const useCourier = () => {
  const onCourierSignIn = async (userId: string) => {
    if (isIOS) {
      const token = await Courier.apnsToken;

      console.log({ token });
    } else {
      await Courier.fcmToken;
    }

    Courier.setIsDebugging(!!isDev);

    Courier.signIn({
      accessToken: COURIER_API_KEY,
      userId,
    });
  };

  const getPermission = async () => {
    const status = await Courier.notificationPermissionStatus;

    if (status === 'authorized') {
      return;
    }

    await Courier.requestNotificationPermission();
  };

  return {
    onCourierSignIn,
    getPermission,
  };
};
