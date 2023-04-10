import { useIsFocused } from '@react-navigation/native';
import { FirebaseUser } from 'api';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import { useEffect, useState } from 'react';
import Config from 'react-native-config';
import firestore from '@react-native-firebase/firestore';
import { AnyType } from 'helpers';

const {
  FIREBASE_DYNAMIC_URL, FIREBASE_DYNAMIC_URL_PREFIX, BUNDLE_ID, APP_STORE_ID,
} = Config as AnyType;

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

      const shortLink = await dynamicLinks().buildShortLink({
        link: `${FIREBASE_DYNAMIC_URL}?code=${data.referrer}`,
        domainUriPrefix: FIREBASE_DYNAMIC_URL_PREFIX,
        android: {
          packageName: BUNDLE_ID,
        },
        ios: {
          bundleId: BUNDLE_ID,
          appStoreId: APP_STORE_ID,
        },
      });

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
