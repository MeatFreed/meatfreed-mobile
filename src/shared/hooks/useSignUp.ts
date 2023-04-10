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
import { AnyType } from 'helpers';
import { useReferralCode } from './useReferralCode';

export const useSignUp = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { t } = useTranslation();

  const dispatch = useTypedDispatch();

  const { getReferralCode } = useReferralCode();

  const onSignUp = async ({
    email, password, referralCode, confirmPassword, ...rest
  }: AnyType) => {
    setIsLoading(true);

    try {
      if (referralCode) {
        const response = await firestore().collection('users').where('referrer', '==', referralCode).get();

        if (response.empty) {
          ToastService.onDanger({ title: t('errors.invalid-code') });

          return;
        }

        const { user } = await auth().createUserWithEmailAndPassword(email, password);

        const code = await getReferralCode();

        await firestore().collection('users').doc(user.uid).set({
          ...rest,
          uid: user.uid,
          email,
          firstName: rest.name,
          lastName: rest.name,
          referrer: code,
          referralsCount: 0,
        });

        const referral = response.docs.map((doc) => ({
          ...doc.data(), uid: doc.id,
        }))?.[0] as FirebaseUser;

        await firestore().collection('users').doc(referral.uid).update({
          referrals: referral?.referrals?.length ? [...referral.referrals, user.uid] : [user.uid],
          referralsCount: referral.referralsCount + 1,
        });

        dispatch(setUser({
          ...rest,
          uid: user.uid,
          email,
          firstName: rest.name,
          lastName: rest.name,
          referrer: code,
          referralsCount: 0,
        } as unknown as FirebaseUser));

        RouteService.reset(Routes.BOTTOM_TAB_BAR_NAVIGATOR);

        return;
      }

      const { user } = await auth().createUserWithEmailAndPassword(email, password);

      const code = await getReferralCode();

      await firestore().collection('users').doc(user?.uid).set({
        ...rest,
        uid: user.uid,
        email,
        firstName: rest.name,
        lastName: rest.name,
        referrer: code,
        referralsCount: 0,
      });

      RouteService.reset(Routes.BOTTOM_TAB_BAR_NAVIGATOR);
    } catch (error) {
      ToastService.onDanger({ title: t('errors.server-unable') });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    onSignUp,
  };
};
