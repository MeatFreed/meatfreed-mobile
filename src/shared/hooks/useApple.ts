/* eslint-disable no-plusplus */
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AnyType } from 'helpers';
import { appleAuth } from '@invertase/react-native-apple-authentication';
import { useTranslation } from 'react-i18next';
import { RouteService, ToastService } from 'services';
import { useTypedDispatch } from 'stores';
import jwtDecode from 'jwt-decode';
import { FirebaseUser } from 'api';
import { Routes } from 'navigation';
import { setUser } from 'stores/user';
import { useReferralCode } from './useReferralCode';

export const useApple = () => {
  const { t } = useTranslation();

  const dispatch = useTypedDispatch();

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
      } else {
        const code = await getReferralCode();

        const displayName = user?.displayName
          ? user.displayName.split(' ')
          : ['anonymous'];

        const values = {
          uid: user.uid,
          name: displayName?.[0] || '',
          email: token?.email || '',
          referralsCount: 0,
          referrer: code,
          provider: 'apple',
        };

        await firestore().collection('users').doc(user.uid).set(values);

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
