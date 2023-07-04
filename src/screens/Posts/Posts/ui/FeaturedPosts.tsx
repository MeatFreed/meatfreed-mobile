import React from 'react';
import { useTranslation } from 'react-i18next';
import { Dimensions } from 'react-native';
import { Box, FontFamily, Text } from 'themes';
import { RouteService } from 'services';
import { Routes } from 'navigation';
import { useGetFeaturedPosts } from 'hooks';
import { FlashList } from '@shopify/flash-list';
import { FeaturedCard } from './FeaturedCard';

const { width } = Dimensions.get('window');

const ITEM_HEIGHT = width / 2;

export const FeaturedPosts: React.FC = () => {
  const { t } = useTranslation();

  const { results } = useGetFeaturedPosts();

  if (!results.length) {
    return null;
  }

  return (
    <Box h="270px">
      <Text fnw="600" ff={FontFamily.PoppinsSemiMedium} m={[10, 16, 0]}>{t('posts.featured')}</Text>

      <FlashList
        data={results}
        horizontal
        contentContainerStyle={{ paddingBottom: 10 }}
        keyExtractor={({ uuid }) => uuid}
        estimatedItemSize={ITEM_HEIGHT}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item: post, index }) => (
          <FeaturedCard
            assets={post.assets}
            isFirst={index === 0}
            onPress={() => RouteService.navigate(Routes.POST_NAVIGATOR, {
              screen: Routes.POST_DETAILS,
              params: { contentId: post.uuid },
            })}
          />
        )}
      />
    </Box>
  );
};
