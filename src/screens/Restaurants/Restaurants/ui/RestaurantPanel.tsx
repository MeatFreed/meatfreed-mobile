import { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { Restaurant } from 'api';
import React, { useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { FontFamily, Text } from 'themes';
import { SwipeablePanel } from 'ui';
import { AnyType } from 'helpers';
import { RouteService } from 'services';
import { Routes } from 'navigation';
import { useTypedSelector } from 'stores';
import { userSelectors } from 'stores/user';
import { RestaurantCard } from './RestaurantCard';

interface RestaurantPanelProps {
  restaurants: Restaurant[];
}

export const RestaurantPanel: React.FC<RestaurantPanelProps> = ({ restaurants }) => {
  const { t } = useTranslation();

  const snapPoints = useMemo(() => ['37.5%', '98%'], []);

  const scrollViewRef = useRef<AnyType>(null);

  const userId = useTypedSelector(userSelectors.userId);

  const onChange = (panelState: number) => {
    if (!panelState && restaurants?.length) {
      scrollViewRef?.current?.scrollToIndex?.({ index: 0, animated: true });
    }
  };

  const onRestaurantDetails = (contentId: string) => {
    if (userId) {
      RouteService.navigate(Routes.RESTAURANT_NAVIGATOR, {
        screen: Routes.RESTAURANT_DETAILS, params: { contentId },
      });

      return;
    }

    RouteService.reset(Routes.WELCOME);
  };

  return (
    <SwipeablePanel
      snapPoints={snapPoints}
      onChange={onChange}
      index={0}
    >
      <Text mb={16} fs={18} fnw="700" ff={FontFamily.PoppinsMedium}>{t('home.close-to-you')}</Text>

      <BottomSheetFlatList
        ref={scrollViewRef}
        data={restaurants}
        keyExtractor={({ uid }) => uid}
        renderItem={({ item: restaurant }) => (
          <RestaurantCard
            restaurant={restaurant}
            onPress={() => onRestaurantDetails(restaurant.place_id)}
          />
        )}
      />
    </SwipeablePanel>
  );
};
