/* eslint-disable no-console */
import Courier from '@trycourier/courier-react-native';
import { useUpdateProfileMutation } from 'api';
import { AnyType } from 'helpers';
import Config from 'react-native-config';
import { useTypedSelector } from 'stores';
import { userSelectors } from 'stores/user';

const { COURIER_API_KEY } = Config as AnyType;

export const useCourier = () => {
  const user = useTypedSelector(userSelectors.user);

  const [updateProfile] = useUpdateProfileMutation();

  const onSignIn = async () => {
    await Courier.signIn({
      accessToken: COURIER_API_KEY,
      userId: user.uid,
    });

    updateProfile({
      userId: user.uid,
      email: user.email,
      first_name: user.firstName,
      last_name: user.lastName,
      name: `${user.firstName} ${user.lastName}`,
    }).unwrap();
  };

  const getNotificationPermission = async () => {
    const status = await Courier.notificationPermissionStatus;

    if (status === 'authorized') {
      return;
    }

    await Courier.requestNotificationPermission();
  };

  return {
    onSignIn,
    getNotificationPermission,
  };
};
