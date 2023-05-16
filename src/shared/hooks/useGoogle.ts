import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AnyType, EventTypes, isIOS } from 'helpers';
import { useTranslation } from 'react-i18next';
import Config from 'react-native-config';
import { RouteService, ToastService } from 'services';
import { useTypedDispatch } from 'stores';
import { FirebaseUser } from 'api';
import { Routes } from 'navigation';
import dayjs from 'dayjs';
import { setUser } from 'stores/user';
import { useState } from 'react';
import { useAnalytics } from './useAnalytics';
import { useReferralCode } from './useReferralCode';

const { SIGN_UP_WITHOUT_REFERRAL_CODE, SIGN_UP_WITH_REFERRAL_CODE } = EventTypes;

export const useGoogle = () => {
  const { t } = useTranslation();

  const dispatch = useTypedDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const { onLogEvent } = useAnalytics();

  const { getReferralCode } = useReferralCode();

  const configure = () => {
    if (isIOS) {
      GoogleSignin.configure({
        forceCodeForRefreshToken: true,
        iosClientId: Config.GOOGLE_IOS_CLIENT_ID as string,
      });
    } else {
      GoogleSignin.configure({
        forceCodeForRefreshToken: true,
        webClientId: Config.GOOGLE_WEB_ID as string,
      });
    }
  };

  const onGoogleSignIn = async (referralCode = '') => {
    setIsLoading(true);

    try {
      if (!isIOS) {
        await GoogleSignin.hasPlayServices();
      }

      const google = await GoogleSignin.signIn();

      const googleCredential = auth.GoogleAuthProvider.credential(google.idToken);

      const { user } = await auth().signInWithCredential(googleCredential);

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
          provider: 'google',
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
          provider: 'apple',
        };

        await firestore().collection('users').doc(user.uid).set(values);

        const eventName = referralCode ? SIGN_UP_WITHOUT_REFERRAL_CODE : SIGN_UP_WITH_REFERRAL_CODE;

        onLogEvent(eventName, {
          ...(referralCode && { referralCode }),
          userId: user.uid,
          event: eventName,
          provider: 'google',
          createdAt: dayjs().valueOf(),
        });

        dispatch(setUser(values as FirebaseUser));
      }

      RouteService.reset(Routes.BOTTOM_TAB_BAR_NAVIGATOR);
    } catch (error: AnyType) {
      if (error.code !== '-5') {
        const message = error?.message?.replace(`[${error?.code}] `, '');

        ToastService.onDanger({ title: message || t('errors.server-unable') });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const onGoogleLogout = async () => {
    const isSignedInUser = await GoogleSignin.isSignedIn();

    if (isSignedInUser) {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
    }
  };

  return {
    configure,
    onGoogleSignIn,
    onGoogleLogout,
    isLoading,
  };
};
