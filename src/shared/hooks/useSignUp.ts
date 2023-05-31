/* eslint-disable @typescript-eslint/no-unused-vars */
import firestore from '@react-native-firebase/firestore';
import { useState } from 'react';
import auth from '@react-native-firebase/auth';
import { RouteService, ToastService } from 'services';
import { useTranslation } from 'react-i18next';
import { FirebaseUser } from 'api';
import { useTypedDispatch } from 'stores';
import { Routes } from 'navigation';
import { setUser } from 'stores/user';
import { AnyType, EventTypes, withDelay } from 'helpers';
import dayjs from 'dayjs';
import { useReferralCode } from './useReferralCode';
import { useAnalytics } from './useAnalytics';
import { useCourier } from './useCourier';

const { SIGN_UP_WITHOUT_REFERRAL_CODE, SIGN_UP_WITH_REFERRAL_CODE } = EventTypes;

export const useSignUp = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { t } = useTranslation();

  const { onLogEvent } = useAnalytics();

  const dispatch = useTypedDispatch();

  const { getReferralCode } = useReferralCode();

  const { getPermission } = useCourier();

  const onSignUp = async ({
    email, password, referralCode, confirmPassword, ...rest
  }: AnyType) => {
    setIsLoading(true);

    try {
      const { user } = await auth().createUserWithEmailAndPassword(email, password);

      if (referralCode) {
        const response = await firestore().collection('users').where('referrer', '==', referralCode).get();

        if (response.empty) {
          ToastService.onDanger({ title: t('errors.invalid-code') });

          return;
        }

        const referral = response.docs.map((doc) => ({
          ...doc.data(), uid: doc.id,
        }))?.[0] as FirebaseUser;

        await firestore().collection('users').doc(referral.uid).update({
          referrals: referral?.referrals?.length ? [...referral.referrals, user.uid] : [user.uid],
          referralsCount: referral.referralsCount + 1,
        });
      }

      const code = await getReferralCode();

      const values = {
        ...rest,
        ...(referralCode && { referralCode }),
        uid: user.uid,
        firstName: rest.name,
        lastName: rest.name,
        email,
        referralsCount: 0,
        referrer: code,
        provider: 'form',
        photoURL: '',
      };

      await firestore().collection('users').doc(user.uid).set(values);

      dispatch(setUser(values as unknown as FirebaseUser));

      const eventName = referralCode ? SIGN_UP_WITHOUT_REFERRAL_CODE : SIGN_UP_WITH_REFERRAL_CODE;

      onLogEvent(eventName, {
        ...(referralCode && { referralCode }),
        userId: user.uid,
        event: eventName,
        provider: 'form',
        createdAt: dayjs().valueOf(),
      });

      RouteService.reset(Routes.BOTTOM_TAB_BAR_NAVIGATOR);

      await withDelay(1000);

      getPermission();
    } catch (error: AnyType) {
      const message = error?.message?.split?.('] ');

      ToastService.onDanger({ title: message?.[1] || error?.message || t('errors.server-unable') });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    onSignUp,
  };
};
