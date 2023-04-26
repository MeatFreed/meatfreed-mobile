import { useGetPosts } from 'hooks';
import React from 'react';
import { Box, Colors } from 'themes';
import { Loader, StatusBar } from 'ui';
import { FlashList } from '@shopify/flash-list';
import { isDev } from 'helpers';
import { PostCard, FirebasePostCard } from './ui';

export const Posts: React.FC = () => {
  const {
    isLoading, results, onRefresh, onEndReached,
  } = useGetPosts();

  return (
    <Box f={1} bgc={Colors.basic_150}>
      <StatusBar />

      <FlashList
        data={results}
        showsVerticalScrollIndicator={false}
        keyExtractor={(_, index: number) => index.toString()}
        onRefresh={onRefresh}
        onEndReachedThreshold={0.1}
        contentContainerStyle={{ paddingTop: 10, paddingBottom: 30 }}
        refreshing={!!results.length && isLoading}
        onEndReached={onEndReached}
        renderItem={({ item: post }) => {
          if (isDev) {
            return <PostCard post={post.content} contentId={post.uuid} />;
          }

          return <FirebasePostCard post={post} />;
        }}
        estimatedItemSize={300}
        ListEmptyComponent={isLoading && !!results.length ? (
          <Loader color={Colors.purple} size="large" />
        ) : null}
      />
    </Box>
  );
};
