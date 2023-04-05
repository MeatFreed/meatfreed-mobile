import { useIsFocused } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { useEffect, useState } from 'react';
import { Post } from 'api';
import { useTypedSelector } from 'stores';
import { userSelectors } from 'stores/user';
import { parseToLocalTime } from 'helpers';
import {
  geohashForLocation,
} from 'geofire-common';
import { placeSelectors } from 'stores/place';

const postCollection = firestore().collection('posts');

export const useGetMomentByUID = (uid: string) => {
  const isFocused = useIsFocused();

  const user = useTypedSelector(userSelectors.user);

  const currentLocation = useTypedSelector(placeSelectors.currentLocation);

  const [isLoading, setIsLoading] = useState(false);

  const [post, setPost] = useState<Post | null>(null);

  const getMomentByUID = async () => {
    setIsLoading(true);

    try {
      const response = await postCollection.doc(uid).get();

      const data = response.data() as Post;

      await postCollection.doc(uid).update({
        clicksCount: data.clicksCount ? data.clicksCount + 1 : 1,
      });

      await postCollection.doc(uid).collection('clicks').add({
        time: parseToLocalTime().valueOf(),
        type: 'post',
        user: user?.uid || 'Anonymous',
        ...(currentLocation && {
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
          geohash: geohashForLocation([
            currentLocation.coords.latitude,
            currentLocation.coords.longitude,
          ]),
        }),
      });

      setPost({ ...data, uid });
    } finally {
      setIsLoading(false);
    }
  };

  const onUpdatePlayCount = async () => {
    setIsLoading(true);

    try {
      await postCollection.doc(uid).collection('clicks').add({
        time: parseToLocalTime().valueOf(),
        type: 'videoPlay',
        user: user?.uid || 'Anonymous',
        ...(currentLocation && {
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
          geohash: geohashForLocation([
            currentLocation.coords.latitude,
            currentLocation.coords.longitude,
          ]),
        }),
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isFocused) {
      getMomentByUID();
    }
  }, [isFocused]);

  return {
    post,
    getMomentByUID,
    onUpdatePlayCount,
    isLoading,
  };
};
