import { FlashList } from '@shopify/flash-list';
import { RestaurantCard, FavoriteEmptyState } from 'features';
import { useGetRestaurantActions, useGetRestaurantsFavorite } from 'hooks';
import React from 'react';
import { Box, Colors } from 'themes';

export const RestaurantFavorites: React.FC = () => {
  const { results } = useGetRestaurantsFavorite();

  const { onRestaurantDetails } = useGetRestaurantActions();

  return (
    <Box f={1} bgc={Colors.basic_100}>
      <FlashList
        data={results}
        keyExtractor={({ uuid }) => uuid}
        renderItem={({ item: restaurant }) => (
          <RestaurantCard
            restaurant={restaurant}
            onPress={() => onRestaurantDetails(restaurant.uuid)}
          />
        )}
        showsVerticalScrollIndicator={false}
        estimatedItemSize={100}
        contentContainerStyle={{ paddingVertical: 16 }}
        ListEmptyComponent={<FavoriteEmptyState />}
      />
    </Box>
  );
};
