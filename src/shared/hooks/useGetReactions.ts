import { useLayoutEffect } from 'react';
import firestore from '@react-native-firebase/firestore';
import { ReactionType } from 'api';
import { useTypedDispatch } from 'stores';
import { setReactions } from 'stores/reactions';

export const useGetReactions = () => {
  const dispatch = useTypedDispatch();

  const getReactions = async () => {
    const response = await firestore().collection('reaction_types').get();

    if (!response.empty) {
      const data = response.docs.map((doc) => ({ ...doc.data(), uid: doc.id })) as ReactionType[];

      dispatch(setReactions([...data]));
    }
  };

  useLayoutEffect(() => {
    getReactions();
  }, [getReactions]);
};
