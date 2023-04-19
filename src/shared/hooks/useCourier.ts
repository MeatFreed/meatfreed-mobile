/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import Courier from '@trycourier/courier-react-native';
import { AnyType } from 'helpers';

export const useCourier = () => {
  const [permission, setPermission] = useState<string | null>(null);

  const onPushNotificationClicked = (push: AnyType) => {
    console.log({ push });
  };

  const onPushNotificationDelivered = (push: AnyType) => {
    console.log({ push });
  };

  const onSignIn = async (userId: string) => {
    await Courier.apnsToken;
    await Courier.fcmToken;

    return Courier.signIn({ accessToken: 'pk_test_3V3BBTZYPX4KEXQ2PDGWZPBNBK07', userId });
  };

  const getPermission = async () => {
    const status = await Courier.notificationPermissionStatus;

    setPermission(status);

    const requestStatus = await Courier.requestNotificationPermission();

    setPermission(requestStatus);
  };

  useEffect(() => {
    const subscribe = Courier.registerPushNotificationListeners({
      onPushNotificationClicked,
      onPushNotificationDelivered,
    });

    return () => {
      subscribe?.();
    };
  }, []);

  return {
    onSignIn,
    getPermission,
    permission,
  };
};
