import { useEffect } from 'react';
import Config from 'react-native-config';
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { AnyType, generateShareLink } from 'helpers';
import { useTypedDispatch, useTypedSelector } from 'stores';
import { setReferralLink, setUser, userSelectors } from 'stores/user';
import { useCourier } from './useCourier';

const { FIREBASE_REFERRAL_URL } = Config as AnyType;

export const useGetUserByUserId = () => {
  const user = useTypedSelector(userSelectors.user);

  const dispatch = useTypedDispatch();

  const { onSignIn } = useCourier();

  const onSnapshot = async (
    snapshot: FirebaseFirestoreTypes.DocumentSnapshot<FirebaseFirestoreTypes.DocumentData>,
  ) => {
    const userInfo = { ...user, ...snapshot.data(), uid: user.uid };

    if (!userInfo.uid) {
      dispatch(setUser({ ...userInfo, referralLink: '' }));

      return;
    }

    onSignIn();

    dispatch(setUser(userInfo));

    const shortLink = await generateShareLink(FIREBASE_REFERRAL_URL, 'code', userInfo.referrer);

    if (shortLink) {
      dispatch(setReferralLink(shortLink));
    }
  };

  useEffect(() => {
    const subscribe = firestore()
      .collection('users')
      .doc(user?.uid)
      .onSnapshot(onSnapshot);

    return () => subscribe();
  }, [user?.uid]);
};
