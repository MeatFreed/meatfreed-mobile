import { adaptNotifications } from 'api';
import firestore from '@react-native-firebase/firestore';
import { useEffect } from 'react';
import { useTypedDispatch, useTypedSelector } from 'stores';
import { userSelectors } from 'stores/user';
import { setNotifications } from 'stores/notifications';

const notificationCollection = firestore().collection('notifications_storyblock');

export const useGetNotifications = () => {
  const userId = useTypedSelector(userSelectors.userId);

  const dispatch = useTypedDispatch();

  useEffect(() => {
    const subscriber = notificationCollection
      .where('content.userId', '==', userId)
      .onSnapshot((snapshot) => {
        dispatch(setNotifications([...adaptNotifications(snapshot)]));
      });

    return () => subscriber();
  }, [userId]);
};
