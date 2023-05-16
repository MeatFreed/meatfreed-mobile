import { useTypedSelector } from 'stores';
import { userSelectors } from 'stores/user';
import { EventTypes } from 'helpers';
import { RouteService } from 'services';
import { Routes } from 'navigation';
import dayjs from 'dayjs';
import { useAnalytics } from './useAnalytics';

export const useGetRestaurantActions = () => {
  const userId = useTypedSelector(userSelectors.userId);

  const { onLogEvent } = useAnalytics();

  const onRestaurantDetails = (contentId: string) => {
    if (userId) {
      onLogEvent(EventTypes.VIEW_RESTAURANT_DETAILS, {
        userId,
        businessId: contentId,
        event: EventTypes.VIEW_RESTAURANT_DETAILS,
        createdAt: dayjs().valueOf(),
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
    });
  };

  return {
    onRestaurantDetails,
    onRestaurantWebsite,
  };
};
