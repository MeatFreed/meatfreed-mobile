/* eslint-disable consistent-return */
/* eslint-disable no-await-in-loop */
import { nanoid } from 'nanoid/non-secure';
import firestore from '@react-native-firebase/firestore';

export const useReferralCode = () => {
  const getReferralCode = async () => {
    let repeat = true;

    while (repeat) {
      const code = nanoid(5);

      const response = await firestore().collection('users').where('referrer', '==', code).get();

      if (response.empty) {
        repeat = false;

        return code;
      }
    }
  };

  return {
    getReferralCode,
  };
};
