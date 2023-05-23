import React from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList } from 'react-native';
import { Box, FontFamily, Text } from 'themes';
import { Post } from 'api';
import { RouteService } from 'services';
import { Routes } from 'navigation';
import { FeaturedCard } from './FeaturedCard';

interface FeaturedPostsProps {
  results: Post[];
}

export const FeaturedPosts: React.FC<FeaturedPostsProps> = ({ results }) => {
  const { t } = useTranslation();

  if (!results.length) {
    return null;
  }

  return (
    <Box h="270px">
      <Text fnw="600" ff={FontFamily.PoppinsSemiMedium} m={[10, 16, 0]}>{t('posts.featured')}</Text>

      <FlatList
        data={results}
        horizontal
        contentContainerStyle={{ flexGrow: 1, marginBottom: 10 }}
        keyExtractor={({ uuid }) => uuid}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item: post, index }) => (
          <FeaturedCard
            post={post.content}
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
