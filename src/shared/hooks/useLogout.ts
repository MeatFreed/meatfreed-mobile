import { useTypedDispatch } from 'stores';
import auth from '@react-native-firebase/auth';
import { resetUser } from 'stores/user';
import { RouteService } from 'services';
import { Routes } from 'navigation';

export const useLogout = () => {
  const dispatch = useTypedDispatch();

  const onLogout = async () => {
    try {
      const { currentUser } = auth();

      if (!currentUser?.uid) {
        return;
      }

      await auth().signOut();

      RouteService.navigate(Routes.SEARCH_NAVIGATOR);
    } finally {
      dispatch(resetUser());
    }
  };

  return {
    onLogout,
  };
};
