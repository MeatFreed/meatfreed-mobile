import { useGetFeaturedPosts, useGetPosts } from 'hooks';
import React, { useCallback, useState } from 'react';
import {
  Box, Colors, FontFamily, Text,
} from 'themes';
import { Loader, StatusBar } from 'ui';
import { FlatList, NativeScrollEvent } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  useStickyHeaderFlashListScrollProps,
  withStickyHeaderFlashList,
} from 'react-native-sticky-parallax-header';
import { Post } from 'api';
import { AnyType } from 'helpers';
import { PostCard, EmptyState, FeaturedPosts } from './ui';

const PARALLAX_HEIGHT = 330;
const SNAP_START_THRESHOLD = 50;
const SNAP_STOP_THRESHOLD = 330;

const ITEM_HEIGHT = 620;

const StickyHeaderFlashList = withStickyHeaderFlashList(FlatList) as AnyType;

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

  const {
    onMomentumScrollEnd,
    onScroll,
    onScrollEndDrag,
    scrollViewRef,
  } = useStickyHeaderFlashListScrollProps({
    parallaxHeight: PARALLAX_HEIGHT,
    snapStartThreshold: SNAP_START_THRESHOLD,
    snapStopThreshold: SNAP_STOP_THRESHOLD,
    snapToEdge: true,
  });

  const handleScroll = useCallback((event: NativeScrollEvent) => {
    const { contentOffset: { y } } = event;

    const offset = Math.round(y / ITEM_HEIGHT);

    setFocusedIndex(Math.abs(offset || 0));

    onScroll(event);
  }, [setFocusedIndex]);

  return (
    <Box f={1} bgc={Colors.basic_150} pt={safe.top || 10}>
      <StatusBar />

      <StickyHeaderFlashList
        ref={scrollViewRef}
        data={results}
        decelerationRate="fast"
        keyExtractor={({ uuid }: Post) => uuid}
        onScroll={(e: NativeScrollEvent) => {
          onScroll(e);
          handleScroll(e);
        }}
        onMomentumScrollEnd={onMomentumScrollEnd}
        onScrollEndDrag={onScrollEndDrag}
        refreshing={isRefreshing}
        onEndReached={onEndReached}
        onRefresh={onRefresh}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 50 }}
        renderHeader={() => (
          <FeaturedPosts results={featuredPosts} />
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
        renderTabs={() => <Text fnw="600" ff={FontFamily.PoppinsSemiMedium} m={[0, 16, 4]}>{t('posts.browse-all')}</Text>}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={isEmpty ? (
          <EmptyState />
        ) : (
          <Box f={1} ai="center" jc="center">
            <Loader color={Colors.primary_500} size="large" />
          </Box>
        )}
      />
    </Box>
  );
};
