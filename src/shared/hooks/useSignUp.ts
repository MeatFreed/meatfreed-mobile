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

  const onSignUp = async ({ email, password, ...rest }: AnyType) => {
    setIsLoading(true);

    try {
      const { user } = await auth().createUserWithEmailAndPassword(email, password);

      await firestore().collection('users').doc(user?.uid).set({ ...rest, email });

      const code = await getReferralCode();

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
    } catch {
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
