import { useTypedSelector } from 'stores';
import { userSelectors } from 'stores/user';
import { placeSelectors } from 'stores/place';
import { EventTypes } from 'helpers';
import { geohashForLocation } from 'geofire-common';
import { RouteService } from 'services';
import { Routes } from 'navigation';
import dayjs from 'dayjs';
import { useAnalytics } from './useAnalytics';

export const useGetRestaurantActions = () => {
  const userId = useTypedSelector(userSelectors.userId);

  const hasLocation = useTypedSelector(placeSelectors.hasLocation);
  const currentLocation = useTypedSelector(placeSelectors.currentLocation);

  const { onLogEvent } = useAnalytics();

  const location = hasLocation ? {
    latitude: Number(currentLocation?.latitude || 0),
    longitude: Number(currentLocation?.longitude || 0),
    geohash: geohashForLocation([
      Number(currentLocation?.latitude || 0),
      Number(currentLocation?.longitude || 0),
    ]),
  } : {};

  const onRestaurantDetails = (contentId: string) => {
    if (userId) {
      onLogEvent(EventTypes.VIEW_RESTAURANT_DETAILS, {
        userId,
        businessId: contentId,
        event: EventTypes.VIEW_RESTAURANT_DETAILS,
        createdAt: dayjs().valueOf(),
        location,
      });

      RouteService.navigate(Routes.RESTAURANT_NAVIGATOR, {
        screen: Routes.RESTAURANT_DETAILS, params: { contentId },
      });

      return;
    }

    RouteService.reset(Routes.WELCOME);
  };

  const onRestaurantWebsite = async (contentId: string) => {
    onLogEvent(EventTypes.VIEW_RESTAURANT_WEBSITE, {
      userId,
      businessId: contentId,
      event: EventTypes.VIEW_RESTAURANT_WEBSITE,
      createdAt: dayjs().valueOf(),
      location,
    });
  };

  return {
    onRestaurantDetails,
    onRestaurantWebsite,
  };
};
