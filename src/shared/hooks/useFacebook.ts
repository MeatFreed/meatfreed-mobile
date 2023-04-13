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
import { EventTypes } from 'helpers';
import dayjs from 'dayjs';
import { useReferralCode } from './useReferralCode';
import { useAnalytics } from './useAnalytics';

export const useFacebook = () => {
  const { t } = useTranslation();

  const dispatch = useTypedDispatch();

  const { getReferralCode } = useReferralCode();

  const { onLogEvent } = useAnalytics();

  const onFacebookSignIn = async () => {
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

      const displayName = user.displayName?.split(' ');

      const response = await firestore().collection('users').doc(user.uid).get();

      if (response.data()) {
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

        onLogEvent(EventTypes.SIGN_UP_WITHOUT_REFERRAL_CODE, {
          userId: user.uid,
          event: EventTypes.SIGN_UP_WITHOUT_REFERRAL_CODE,
          provider: 'facebook',
          createdAt: dayjs().valueOf(),
        });

        dispatch(setUser(values as FirebaseUser));
      }

      RouteService.reset(Routes.BOTTOM_TAB_BAR_NAVIGATOR);
    } catch (error) {
      if (error !== 'User cancelled the login process') {
        ToastService.onDanger({ title: t('errors.server-unable') });
      }
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
  };
};
