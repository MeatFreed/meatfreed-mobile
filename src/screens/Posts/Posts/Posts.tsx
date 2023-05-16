import { useGetPosts } from 'hooks';
import React, { useCallback, useState } from 'react';
import { Box, Colors } from 'themes';
import { Loader, StatusBar } from 'ui';
import {
  FlatList, NativeScrollEvent, NativeSyntheticEvent,
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { PostCard, EmptyState } from './ui';

const ITEM_HEIGHT = 620;

export const Posts: React.FC = () => {
  const isFocused = useIsFocused();

  const [isMuted, setIsMuted] = useState(true);

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
    results,
    onRefresh,
    onEndReached,
  } = useGetPosts();

  return (
    <Box f={1} bgc={Colors.basic_150}>
      <StatusBar />

      <FlatList
        data={results}
        onScroll={handleScroll}
        showsVerticalScrollIndicator={false}
        keyExtractor={(_, index: number) => index.toString()}
        onRefresh={onRefresh}
        onEndReachedThreshold={0.1}
        initialNumToRender={3}
        windowSize={3}
        contentContainerStyle={{ flexGrow: 1 }}
        refreshing={isRefreshing}
        onEndReached={onEndReached}
        renderItem={({ item: post, index }) => (
          <PostCard
            isMuted={isMuted}
            isFirst={index === 0}
            isAutoPlay={isFocused && focusedIndex === index}
            post={post.content}
            contentId={post.uuid}
            onChangeVolume={() => setIsMuted(!isMuted)}
          />
        )}
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
