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

export const useApple = () => {
  const { t } = useTranslation();

  const dispatch = useTypedDispatch();

  const { onLogEvent } = useAnalytics();

  const { getReferralCode } = useReferralCode();

  const onAppleSignIn = async () => {
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

      const response = await firestore().collection('users').doc(user.uid).get();

      if (response.data()) {
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

        onLogEvent(EventTypes.SIGN_UP_WITHOUT_REFERRAL_CODE, {
          userId: user.uid,
          event: EventTypes.SIGN_UP_WITHOUT_REFERRAL_CODE,
          provider: 'apple',
          createdAt: dayjs().valueOf(),
        });

        dispatch(setUser(values as FirebaseUser));
      }

      RouteService.reset(Routes.BOTTOM_TAB_BAR_NAVIGATOR);
    } catch (error: AnyType) {
      if (error.code !== '1001' && error.code !== '1000') {
        ToastService.onDanger({ title: error?.message || t('errors.server-unable') });
      }
    }
  };

  return {
    onAppleSignIn,
  };
};
