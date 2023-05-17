import { Post } from 'api';
import firestore from '@react-native-firebase/firestore';
import { useEffect, useState } from 'react';
import orderBy from 'lodash.orderby';
import { useIsFocused } from '@react-navigation/native';
import { useGetBounds } from './useGetBounds';

const postCollection = firestore().collection('posts_storyblock');

export const useGetPosts = () => {
  const isFocused = useIsFocused();
  const [offset, setOffset] = useState(5);
  const [totalCount, setTotalCount] = useState(0);
  const [initialLoading, setInitialLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setRefreshing] = useState(false);

  const [results, setResults] = useState<Post[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const shouldPaginate = results.length < totalCount;
  const isEmpty = !initialLoading && !results.length;

  const { bounds, selectLocation } = useGetBounds();

  const getTotalCount = async () => {
    try {
      const requestArray = bounds.map((bound) => postCollection
        .orderBy('geohash', 'desc')
        .orderBy('published_at', 'desc')
        .where('geohash', '>=', bound[0])
        .where('geohash', '<=', bound[1])
        .where('content.active', '==', true)
        .get());

      const collections = await Promise.all(requestArray);

      const value = collections?.reduce((acc, next) => acc + next.docs.length, 0);

      setTotalCount(value);
    } catch (error) {
      /** empty */
    }
  };

  const getPosts = async (limit = 5) => {
    setIsLoading(true);

    try {
      const requestArray = bounds.map((bound) => postCollection
        .orderBy('geohash', 'desc')
        .orderBy('published_at', 'desc')
        .where('geohash', '>=', bound[0])
        .where('geohash', '<=', bound[1])
        .where('content.active', '==', true)
        .limit(limit)
        .get());

      const response = await Promise.all(requestArray);

      const collections = response.flatMap((data) => data.docs);

      const posts = collections.map((doc) => doc.data()) as Post[];

      setResults([...posts]);
    } finally {
      setIsLoading(false);

      setInitialLoading(false);
    }
  };

  const onRefresh = async () => {
    setOffset(5);

    setRefreshing(true);

    getTotalCount();

    try {
      const requestArray = bounds.map((bound) => postCollection
        .orderBy('geohash', 'desc')
        .orderBy('published_at', 'desc')
        .where('geohash', '>=', bound[0])
        .where('geohash', '<=', bound[1])
        .where('content.active', '==', true)
        .limit(5)
        .get());

      const response = await Promise.all(requestArray);

      const collections = response.flatMap((data) => data.docs);

      const posts = collections.map((doc) => doc.data()) as Post[];

      setResults([...posts]);
    } finally {
      setRefreshing(false);
    }
  };

  const onEndReached = async () => {
    if (!shouldPaginate) {
      return;
    }

    setOffset(offset + 5);

    getPosts(offset + 5);
  };

  useEffect(() => {
    if (isFocused) {
      getTotalCount();
      getPosts();
    }
  }, [selectLocation, isFocused]);

  return {
    searchQuery,
    setSearchQuery,
    isLoading,
    initialLoading,
    isRefreshing,
    isEmpty,
    results: orderBy(results, 'published_at', 'desc') as Post[],
    getPosts,
    onRefresh,
    onEndReached,
  };
};
