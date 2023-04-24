import { useGetPosts } from 'hooks';
import React from 'react';
import { Box, Colors } from 'themes';
import { Loader, StatusBar } from 'ui';
import { FlashList } from '@shopify/flash-list';
import { Post } from 'api';
import { PostCard } from './ui';

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
        keyExtractor={({ uuid }: Post) => uuid}
        onRefresh={onRefresh}
        onEndReachedThreshold={0.1}
        contentContainerStyle={{ paddingTop: 10, paddingBottom: 30 }}
        refreshing={!!results.length && isLoading}
        onEndReached={onEndReached}
        renderItem={({ item: post }) => <PostCard post={post.content} contentId={post.uuid} />}
        estimatedItemSize={300}
        ListEmptyComponent={isLoading && !!results.length ? (
          <Loader color={Colors.purple} size="large" />
        ) : null}
      />
    </Box>
  );
};
