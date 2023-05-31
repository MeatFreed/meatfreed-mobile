/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-throw-literal */
import {
  LoginManager,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk-next';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useTypedDispatch } from 'stores';
import { useTranslation } from 'react-i18next';
import { RouteService, ToastService } from 'services';
import { FirebaseUser } from 'api';
import { Routes } from 'navigation';
import { setUser } from 'stores/user';
import { AnyType, EventTypes, withDelay } from 'helpers';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useReferralCode } from './useReferralCode';
import { useAnalytics } from './useAnalytics';
import { useCourier } from './useCourier';

const { SIGN_UP_WITHOUT_REFERRAL_CODE, SIGN_UP_WITH_REFERRAL_CODE } = EventTypes;

export const useFacebook = () => {
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useTypedDispatch();

  const { getReferralCode } = useReferralCode();

  const { onLogEvent } = useAnalytics();

  const { getPermission } = useCourier();

  const onFacebookSignIn = async (referralCode = '') => {
    setIsLoading(true);

    try {
      const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

      if (result.isCancelled) {
        throw 'User cancelled the login process';
      }

      const data = await AccessToken.getCurrentAccessToken();

      if (!data) {
        throw 'Something went wrong obtaining access token';
      }

      const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

      const { user } = await auth().signInWithCredential(facebookCredential);

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

      const displayName = user.displayName?.split(' ');

      const response = await firestore().collection('users').doc(user.uid).get();

      if (response.exists) {
        dispatch(setUser({
          ...response.data(),
          uid: user.uid,
        } as FirebaseUser));

        onLogEvent(EventTypes.SIGN_IN, {
          userId: user.uid,
          event: EventTypes.SIGN_IN,
          provider: 'facebook',
          createdAt: dayjs().valueOf(),
        });
      } else {
        const code = await getReferralCode();

        const values = {
          ...(referralCode && { referralCode }),
          uid: user.uid,
          firstName: displayName?.[0] || '',
          lastName: displayName?.[1] || '',
          photoURL: user?.photoURL || '',
          email: user?.email || '',
          referralsCount: 0,
          referrer: code,
          provider: 'facebook',
        };

        await firestore().collection('users').doc(user.uid).set(values);

        const eventName = referralCode ? SIGN_UP_WITHOUT_REFERRAL_CODE : SIGN_UP_WITH_REFERRAL_CODE;

        onLogEvent(eventName, {
          ...(referralCode && { referralCode }),
          userId: user.uid,
          event: eventName,
          provider: 'facebook',
          createdAt: dayjs().valueOf(),
        });

        dispatch(setUser(values as FirebaseUser));
      }

      RouteService.reset(Routes.BOTTOM_TAB_BAR_NAVIGATOR);

      await withDelay(1000);

      getPermission();
    } catch (error: AnyType) {
      if (error !== 'User cancelled the login process') {
        const message = error?.message?.split?.('] ');

        ToastService.onDanger({ title: message?.[1] || error?.message || t('errors.server-unable') });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const onFacebookLogout = async (): Promise<unknown> => new Promise((resolve) => {
    const logoutRequest = new GraphRequest(
      '/me/permissions/',
      {
        httpMethod: 'DELETE',
      },
      (error, result) => {
        if (error) {
          // user was not logged in
          resolve(error);
        } else {
          resolve(result);
          LoginManager.logOut();
        }
      },
    );
    new GraphRequestManager().addRequest(logoutRequest).start();
  });

  return {
    onFacebookSignIn,
    onFacebookLogout,
    isLoading,
  };
};
