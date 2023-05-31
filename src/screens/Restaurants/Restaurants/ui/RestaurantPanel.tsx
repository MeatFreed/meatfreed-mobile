import { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { Restaurant } from 'api';
import React, { useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FontFamily, Text } from 'themes';
import { SwipeablePanel } from 'ui';
import { AnyType, hasNotch } from 'helpers';
import { useGetRestaurantActions } from 'hooks';
import { RestaurantCard } from './RestaurantCard';
import { EmptyState } from './EmptyState';

interface RestaurantPanelProps {
  restaurants: Restaurant[];
}

export const RestaurantPanel: React.FC<RestaurantPanelProps> = ({ restaurants }) => {
  const { t } = useTranslation();

  const [index, setIndex] = useState(0);

  const snapPoints = useMemo(() => [hasNotch ? '25%' : '28%', '98%'], []);

  const scrollViewRef = useRef<AnyType>(null);

  const { onRestaurantDetails } = useGetRestaurantActions();

  const onChange = (panelState: number) => {
    setIndex(panelState);

    if (!panelState && restaurants?.length) {
      scrollViewRef?.current?.scrollToIndex?.({ index: 0, animated: true });
    }
  };

  return (
    <SwipeablePanel
      snapPoints={snapPoints}
      onChange={onChange}
      hasPaddingHorizontal={false}
      enableContentPanningGesture={!!restaurants?.length}
      index={0}
    >
      <Text m={[0, 16, 16]} fs={18} lh={20} fnw="700" ff={FontFamily.PoppinsMedium}>{t('home.close-to-you')}</Text>

      <BottomSheetFlatList
        ref={scrollViewRef}
        data={restaurants}
        keyExtractor={({ uuid }) => uuid}
        renderItem={({ item: restaurant }) => (
          <RestaurantCard
            restaurant={restaurant}
            onPress={() => onRestaurantDetails(restaurant.uuid)}
          />
        )}
        initialNumToRender={10}
        windowSize={8}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={index ? { flexGrow: 1, paddingBottom: 16 } : undefined}
        ListEmptyComponent={<EmptyState />}
      />
    </SwipeablePanel>
  );
};
