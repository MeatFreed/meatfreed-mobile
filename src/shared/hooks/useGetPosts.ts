import { Post } from 'api';
import firestore from '@react-native-firebase/firestore';
import dayjs from 'dayjs';
import uniqBy from 'lodash.uniqby';
import { useEffect, useState } from 'react';
import { isDev } from 'helpers';

const postCollection = firestore().collection('posts_storyblock');

export const useGetPosts = () => {
  const [offset, setOffset] = useState(5);
  const [totalCount, setTotalCount] = useState(0);
  const [initialLoading, setInitialLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setRefreshing] = useState(false);

  const [results, setResults] = useState<Post[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const shouldPaginate = results.length < totalCount;

  const isEmpty = !initialLoading && !results.length;

  const timestamp = dayjs().startOf('day').valueOf() / 1000;

  const getTotalCount = async () => {
    try {
      const response = await postCollection
        .orderBy('published_at', 'desc')
        .where('published_at', '>', timestamp)
        .where('content.active', '==', true)
        .get();

      setTotalCount(response.size);
    } catch (error) {
      /** empty */
    }
  };

  const getPosts = async (limit = 5) => {
    setIsLoading(true);

    try {
      const collection = await postCollection
        .orderBy('published_at', 'desc')
        .where('published_at', '>', timestamp)
        .where('content.active', '==', true)
        .limit(limit)
        .get();

      const posts = collection.docs.map((doc) => doc.data()) as Post[];

      setResults([...posts]);
    } finally {
      setIsLoading(false);

      setInitialLoading(false);
    }
  };

  const onRefresh = async () => {
    setOffset(5);

    setRefreshing(true);

    try {
      const collection = await postCollection
        .orderBy('published_at', 'desc')
        .where('published_at', '>=', timestamp)
        .where('content.active', '==', true)
        .limit(5)
        .get();

      const posts = collection.docs.map((doc) => doc.data()) as Post[];

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
    getTotalCount();
    getPosts();
  }, []);

  return {
    searchQuery,
    setSearchQuery,
    isLoading,
    initialLoading,
    isRefreshing,
    isEmpty,
    results: isDev ? uniqBy(results, 'uuid') : results,
    getPosts,
    onRefresh,
    onEndReached,
  };
};
