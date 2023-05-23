import { isIOS, withDelay } from 'helpers';
import { PermissionsService } from 'services';
import { useGetPositionActions } from './useGetPositionActions';

export const useGetPosition = () => {
  const { onShowMyLocation } = useGetPositionActions();

  const getPermission = async () => {
    await withDelay(isIOS ? 2500 : 3500);

    await PermissionsService.requestGeolocationPermission();

    onShowMyLocation();
  };

  return {
    getPermission,
  };
};
