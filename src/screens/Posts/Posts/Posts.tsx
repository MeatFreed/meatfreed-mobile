import { useGetPosts } from 'hooks';
import React, { useCallback, useState } from 'react';
import { Box, Colors } from 'themes';
import { Loader, StatusBar } from 'ui';
import { isDev } from 'helpers';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { PostCard, FirebasePostCard } from './ui';

const ITEM_HEIGHT = 620;

export const Posts: React.FC = () => {
  const [focusedIndex, setFocusedIndex] = useState(0);

  const handleScroll = useCallback(({
    nativeEvent: { contentOffset: { y } },
  }: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offset = Math.round(y / ITEM_HEIGHT);

    setFocusedIndex(Math.abs(offset || 0));
  }, [setFocusedIndex]);

  const {
    isLoading, results, onRefresh, onEndReached,
  } = useGetPosts();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.basic_100 }} edges={['top']}>
      <Box f={1} bgc={Colors.basic_150}>
        <StatusBar />

        <FlatList
          data={results}
          onScroll={handleScroll}
          showsVerticalScrollIndicator={false}
          keyExtractor={(_, index: number) => index.toString()}
          onRefresh={onRefresh}
          onEndReachedThreshold={0.1}
          contentContainerStyle={{ paddingTop: 10, paddingBottom: 30 }}
          refreshing={!!results.length && isLoading}
          onEndReached={onEndReached}
          windowSize={3}
          renderItem={({ item: post, index }) => {
            if (isDev) {
              return (
                <PostCard
                  isAutoPlay={focusedIndex === index}
                  post={post.content}
                  contentId={post.uuid}
                />
              );
            }

            return <FirebasePostCard post={post} />;
          }}
          ListEmptyComponent={isLoading && !!results.length ? (
            <Loader color={Colors.purple} size="large" />
          ) : null}
        />
      </Box>
    </SafeAreaView>
  );
};
