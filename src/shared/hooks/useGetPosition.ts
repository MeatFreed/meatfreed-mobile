import { isIOS, withDelay } from 'helpers';
import { PermissionsService } from 'services';
import { useGetPositionActions } from './useGetPositionActions';
import { useCourier } from './useCourier';

export const useGetPosition = () => {
  const { onShowMyLocation } = useGetPositionActions();

  const { getPermission: getNotificationPermission } = useCourier();

  const getPermission = async () => {
    await withDelay(isIOS ? 2500 : 3500);

    await PermissionsService.requestGeolocationPermission();

    await getNotificationPermission();

    onShowMyLocation();
  };

  return {
    getPermission,
  };
};
