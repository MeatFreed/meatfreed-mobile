import { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { Restaurant } from 'api';
import React, {
  useCallback, useMemo, useRef, useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { FontFamily, Text } from 'themes';
import { SwipeablePanel } from 'ui';
import { AnyType, isIOS } from 'helpers';
import { useTypedSelector } from 'stores';
import { userSelectors } from 'stores/user';
import { ListRenderItem } from 'react-native';
import { useGetRestaurantActions } from 'hooks';
import { RestaurantCard } from './RestaurantCard';
import { EmptyState } from './EmptyState';

interface RestaurantPanelProps {
  restaurants: Restaurant[];
  onEndReached: () => Promise<void>;
}

export const RestaurantPanel: React.FC<RestaurantPanelProps> = ({ restaurants, onEndReached }) => {
  const { t } = useTranslation();

  const [index, setIndex] = useState(0);

  const snapPoints = useMemo(() => [isIOS ? '37.5%' : '40%', '98%'], []);

  const scrollViewRef = useRef<AnyType>(null);

  const userId = useTypedSelector(userSelectors.userId);

  const onChange = (panelState: number) => {
    setIndex(panelState);

    if (!panelState && restaurants?.length) {
      scrollViewRef?.current?.scrollToIndex?.({ index: 0, animated: true });
    }
  };

  const { onRestaurantDetails } = useGetRestaurantActions();

  const renderItem: ListRenderItem<Restaurant> = useCallback(({ item: restaurant }) => (
    <RestaurantCard
      restaurant={restaurant}
      onPress={() => onRestaurantDetails(restaurant.uuid)}
    />
  ), [onRestaurantDetails, userId]);

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
        onEndReachedThreshold={0.1}
        keyExtractor={({ uuid }) => uuid}
        renderItem={renderItem}
        onEndReached={onEndReached}
        contentContainerStyle={index ? { flexGrow: 1 } : undefined}
        ListEmptyComponent={<EmptyState />}
      />
    </SwipeablePanel>
  );
};
