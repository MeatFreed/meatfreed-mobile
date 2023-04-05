import { useGetPosts } from 'hooks';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Colors, Text } from 'themes';
import { Loader, SearchBar } from 'ui';
import { FlashList } from '@shopify/flash-list';
import { PostCard } from './ui';

export const Learn: React.FC = () => {
  const { t } = useTranslation();

  const {
    isLoading, posts, onRefresh, searchQuery, setSearchQuery,
  } = useGetPosts();

  return (
    <Box f={1} bgc={Colors.basic_100}>
      <Box h="150px" jc="space-between" bgc={Colors.basic_150} shadowed>
        <Text ta="center" p={[10, 0]} fs={14} color={Colors.watermelon}>{t('learn.description')}</Text>

        <Box m={[0, 25, 16]}>
          <SearchBar
            value={searchQuery}
            onChangeText={(value) => setSearchQuery(value)}
            label={t('labels.restaurant')}
            placeholder={t('placeholders.search-restaurant')}
          />
        </Box>
      </Box>

      <FlashList
        data={posts}
        showsVerticalScrollIndicator={false}
        keyExtractor={({ uid }) => uid}
        onRefresh={onRefresh}
        contentContainerStyle={{ paddingBottom: 30 }}
        refreshing={!!posts.length && isLoading}
        renderItem={({ item: post }) => <PostCard post={post} />}
        ListEmptyComponent={isLoading && !!posts.length ? (
          <Loader color={Colors.purple} size="large" />
        ) : null}
      />
    </Box>
  );
};
