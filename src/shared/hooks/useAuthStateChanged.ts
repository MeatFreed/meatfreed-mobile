import { useTypedDispatch } from 'stores';
import auth from '@react-native-firebase/auth';
import { useEffect } from 'react';
import { AnyType } from 'helpers';
import { resetUser } from 'stores/user';

export const useAuthStateChanged = () => {
  const dispatch = useTypedDispatch();

  const onAuthStateChanged = (user: AnyType) => {
    if (!user) {
      dispatch(resetUser());
    }
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);

    return subscriber;
  }, []);
};
