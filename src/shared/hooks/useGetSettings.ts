import { useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';
import { useTypedDispatch } from 'stores';
import { setSettings } from 'stores/settings';

interface Settings {
  totalMilesConvertedToMeters: number;
}

export const useGetSettings = () => {
  const dispatch = useTypedDispatch();

  useEffect(() => {
    const subscribe = firestore()
      .collection('settings')
      .onSnapshot((snapshot) => {
        const docs = snapshot.docs.map((doc) => doc.data()) as Settings[];

        if (docs?.[0]?.totalMilesConvertedToMeters) {
          dispatch(setSettings(Number(docs?.[0]?.totalMilesConvertedToMeters)));
        }
      });

    return () => subscribe();
  }, []);
};
