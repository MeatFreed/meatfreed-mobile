/* eslint-disable @typescript-eslint/no-unused-vars */
import { Routes } from 'navigation';
import firestore from '@react-native-firebase/firestore';
import { useState } from 'react';
import auth from '@react-native-firebase/auth';
import { RouteService, ToastService } from 'services';
import { useTranslation } from 'react-i18next';
import { useTypedDispatch } from 'stores';
import { setUser } from 'stores/user';
import { FirebaseUser } from 'api';
import dayjs from 'dayjs';
import { AnyType, EventTypes } from 'helpers';
import { useAnalytics } from './useAnalytics';

export const useSignIn = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { onLogEvent } = useAnalytics();

  const { t } = useTranslation();

  const dispatch = useTypedDispatch();

  const onSubmit = async (email: string, password: string) => {
    setIsLoading(true);

    try {
      const { user } = await auth().signInWithEmailAndPassword(email, password);

      const response = await firestore().collection('users').doc(user.uid).get();

      dispatch(setUser({
        ...response.data(),
        uid: user.uid,
      } as FirebaseUser));

      onLogEvent(EventTypes.SIGN_IN, {
        userId: user.uid,
        event: EventTypes.SIGN_IN,
        provider: 'form',
        createdAt: dayjs().valueOf(),
      });

      RouteService.reset(Routes.BOTTOM_TAB_BAR_NAVIGATOR);
    } catch (error: AnyType) {
      const message = error?.message?.split?.('] ');

      ToastService.onDanger({ title: message?.[1] || error?.message || t('errors.server-unable') });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    onSubmit,
  };
};
