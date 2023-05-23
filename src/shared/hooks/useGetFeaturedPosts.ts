import { Post } from 'api';
import firestore from '@react-native-firebase/firestore';
import { useEffect, useState } from 'react';
import orderBy from 'lodash.orderby';
import { useIsFocused } from '@react-navigation/native';

const postCollection = firestore().collection('posts_storyblock');

export const useGetFeaturedPosts = () => {
  const isFocused = useIsFocused();

  const [initialLoading, setInitialLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [results, setResults] = useState<Post[]>([]);

  const isEmpty = !initialLoading && !results.length;

  const getPosts = async () => {
    setIsLoading(true);

    try {
      const response = await postCollection
        .orderBy('published_at', 'desc')
        .where('content.active', '==', true)
        .where('content.featured', '==', true)
        .get();

      const posts = response.docs.map((doc) => doc.data()) as Post[];

      setResults([...posts]);
    } finally {
      setIsLoading(false);

      setInitialLoading(false);
    }
  };

  useEffect(() => {
    if (isFocused) {
      getPosts();
    }
  }, [isFocused]);

  return {
    isLoading,
    initialLoading,
    isEmpty,
    results: orderBy(results, 'published_at', 'desc') as Post[],
    getPosts,
  };
};
