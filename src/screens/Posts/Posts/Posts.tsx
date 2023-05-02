import { useGetPosts } from 'hooks';
import React, { useCallback, useState } from 'react';
import { Box, Colors } from 'themes';
import { Loader, StatusBar } from 'ui';
import { isDev } from 'helpers';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  FlatList, ListRenderItem, NativeScrollEvent, NativeSyntheticEvent,
} from 'react-native';
import { FirebasePost, Post } from 'api';
import { useIsFocused } from '@react-navigation/native';
import { PostCard, FirebasePostCard, EmptyState } from './ui';

const ITEM_HEIGHT = 620;

type Content = Post & FirebasePost

export const Posts: React.FC = () => {
  const isFocused = useIsFocused();

  const [focusedIndex, setFocusedIndex] = useState(0);

  const handleScroll = useCallback(({
    nativeEvent: { contentOffset: { y } },
  }: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offset = Math.round(y / ITEM_HEIGHT);

    setFocusedIndex(Math.abs(offset || 0));
  }, [setFocusedIndex]);

  const {
    isRefreshing,
    isEmpty,
    isLoading,
    results,
    onRefresh,
    onEndReached,
  } = useGetPosts();

  const renderItem: ListRenderItem<Content> = useCallback(({ item: post, index }) => {
    if (isDev) {
      return (
        <PostCard
          isAutoPlay={isFocused && focusedIndex === index}
          post={post.content}
          contentId={post.uuid}
        />
      );
    }

    return <FirebasePostCard post={post} />;
  }, [focusedIndex, isFocused]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.basic_150 }} edges={['top']}>
      <Box f={1} bgc={Colors.basic_150}>
        <StatusBar />

        <FlatList
          data={results}
          onScroll={handleScroll}
          showsVerticalScrollIndicator={false}
          keyExtractor={(_, index: number) => index.toString()}
          onRefresh={onRefresh}
          onEndReachedThreshold={0.2}
          contentContainerStyle={{ paddingTop: 10, paddingBottom: 30, flexGrow: 1 }}
          refreshing={isRefreshing}
          onEndReached={onEndReached}
          windowSize={3}
          renderItem={renderItem}
          ListEmptyComponent={isEmpty ? (
            <EmptyState />
          ) : (
            <Box f={1} ai="center" jc="center">
              <Loader color={Colors.primary_500} size="large" />
            </Box>
          )}
          ListFooterComponent={isLoading && !!results.length ? (
            <Loader color={Colors.primary_500} />
          ) : null}
        />
      </Box>
    </SafeAreaView>
  );
};
