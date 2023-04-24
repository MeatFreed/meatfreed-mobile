import { useIsFocused } from '@react-navigation/native';
import { FirebaseUser } from 'api';
import { useEffect, useState } from 'react';
import Config from 'react-native-config';
import firestore from '@react-native-firebase/firestore';
import { AnyType, generateShareLink } from 'helpers';

const { FIREBASE_REFERRAL_URL } = Config as AnyType;

export const useGetUserByUserId = (userId?: string) => {
  const [isLoading, setIsLoading] = useState(false);

  const isFocused = useIsFocused();

  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [link, setLink] = useState<string | null>(null);

  const getCurrentUser = async () => {
    setIsLoading(true);

    try {
      const response = await firestore().collection('users').doc(userId).get();

      const data = response.data() as FirebaseUser;

      const shortLink = await generateShareLink(FIREBASE_REFERRAL_URL, 'code', data.referrer);

      setUser(data);
      setLink(shortLink);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isFocused && !!userId) {
      getCurrentUser();
    }
  }, [isFocused, userId]);

  return {
    user,
    isLoading,
    link,
  };
};
