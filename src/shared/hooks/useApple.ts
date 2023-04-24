/* eslint-disable no-plusplus */
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AnyType, EventTypes } from 'helpers';
import { appleAuth } from '@invertase/react-native-apple-authentication';
import { useTranslation } from 'react-i18next';
import { RouteService, ToastService } from 'services';
import { useTypedDispatch } from 'stores';
import jwtDecode from 'jwt-decode';
import { FirebaseUser } from 'api';
import { Routes } from 'navigation';
import { setUser } from 'stores/user';
import dayjs from 'dayjs';
import { useReferralCode } from './useReferralCode';
import { useAnalytics } from './useAnalytics';

const { SIGN_UP_WITHOUT_REFERRAL_CODE, SIGN_UP_WITH_REFERRAL_CODE } = EventTypes;

export const useApple = () => {
  const { t } = useTranslation();

  const dispatch = useTypedDispatch();

  const { onLogEvent } = useAnalytics();

  const { getReferralCode } = useReferralCode();

  const onAppleSignIn = async (referralCode = '') => {
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });

      if (!appleAuthRequestResponse.identityToken) {
        throw new Error(t('errors.apple-sign-in-failed'));
      }

      const { identityToken, nonce } = appleAuthRequestResponse;
      const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce);

      const token: AnyType = jwtDecode(identityToken);

      const { user } = await auth().signInWithCredential(appleCredential);

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

      const response = await firestore().collection('users').doc(user.uid).get();

      if (response.exists) {
        dispatch(setUser({
          ...response.data(),
          uid: user.uid,
        } as FirebaseUser));

        onLogEvent(EventTypes.SIGN_IN, {
          userId: user.uid,
          event: EventTypes.SIGN_IN,
          provider: 'apple',
          createdAt: dayjs().valueOf(),
        });
      } else {
        const code = await getReferralCode();

        const displayName = user?.displayName
          ? user.displayName.split(' ')
          : ['anonymous'];

        const values = {
          ...(referralCode && { referralCode }),
          uid: user.uid,
          firstName: displayName?.[0] || '',
          lastName: displayName?.[1] || '',
          photoURL: user?.photoURL || '',
          email: token?.email || '',
          referralsCount: 0,
          referrer: code,
          provider: 'apple',
        };

        await firestore().collection('users').doc(user.uid).set(values);

        const eventName = referralCode ? SIGN_UP_WITHOUT_REFERRAL_CODE : SIGN_UP_WITH_REFERRAL_CODE;

        onLogEvent(eventName, {
          ...(referralCode && { referralCode }),
          userId: user.uid,
          event: eventName,
          provider: 'apple',
          createdAt: dayjs().valueOf(),
        });

        dispatch(setUser(values as FirebaseUser));
      }

      RouteService.reset(Routes.BOTTOM_TAB_BAR_NAVIGATOR);
    } catch (error: AnyType) {
      if (error.code !== '1001' && error.code !== '1000') {
        const message = error?.message?.split?.('] ');

        ToastService.onDanger({ title: message?.[1] || error?.message || t('errors.server-unable') });
      }
    }
  };

  return {
    onAppleSignIn,
  };
};
