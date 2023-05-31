import { useGetFeaturedPosts, useGetPosts } from 'hooks';
import React, { useCallback, useState } from 'react';
import {
  Box, Colors, FontFamily, Text,
} from 'themes';
import { Loader, StatusBar } from 'ui';
import {
  FlatList, NativeScrollEvent, NativeSyntheticEvent,
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Post } from 'api';
import { AnyType } from 'helpers';
import { PostCard, EmptyState, FeaturedPosts } from './ui';

const ITEM_HEIGHT = 620;

export const Posts: React.FC = () => {
  const { t } = useTranslation();

  const isFocused = useIsFocused();

  const { results: featuredPosts } = useGetFeaturedPosts();

  const [isMuted, setIsMuted] = useState(true);

  const [focusedIndex, setFocusedIndex] = useState(0);

  const safe = useSafeAreaInsets();

  const {
    isRefreshing,
    isEmpty,
    results,
    onRefresh,
    onEndReached,
  } = useGetPosts();

  const handleScroll = useCallback(({ nativeEvent }: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentOffset: { y } } = nativeEvent;

    const offset = Math.round(y / ITEM_HEIGHT);

    setFocusedIndex(Math.abs(offset || 0));
  }, [setFocusedIndex]);

  return (
    <Box f={1} bgc={Colors.basic_150} pt={safe.top || 10}>
      <StatusBar />

      <FlatList
        data={results}
        keyExtractor={({ uuid }: Post) => uuid}
        onRefresh={onRefresh}
        onEndReached={onEndReached}
        refreshing={isRefreshing}
        initialNumToRender={3}
        onScroll={handleScroll}
        ListHeaderComponent={(
          <>
            <FeaturedPosts results={featuredPosts} />

            <Text
              fnw="600"
              ff={FontFamily.PoppinsSemiMedium}
              m={[0, 16, 4]}
            >
              {t('posts.browse-all')}
            </Text>
          </>
          )}
        ListEmptyComponent={isEmpty ? (
          <EmptyState />
        ) : (
          <Box f={1} ai="center" jc="center">
            <Loader color={Colors.primary_500} size="large" />
          </Box>
        )}
        renderItem={({ item: post, index }: AnyType) => (
          <PostCard
            isMuted={isMuted}
            isAutoPlay={isFocused && focusedIndex === index}
            post={post.content}
            contentId={post.uuid}
            onChangeVolume={() => setIsMuted(!isMuted)}
          />
        )}
      />
    </Box>
  );
};
