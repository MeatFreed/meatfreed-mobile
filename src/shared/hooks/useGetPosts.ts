import { Post, adaptAvailablePosts } from 'api';
import firestore from '@react-native-firebase/firestore';
import { useEffect, useState } from 'react';
import orderBy from 'lodash.orderby';
import { useGetBounds } from './useGetBounds';

const postCollection = firestore().collection('posts_storyblock');

export const useGetPosts = () => {
  const [results, setResults] = useState<Post[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const { coordinates: location } = useGetBounds();

  useEffect(() => {
    const subscriber = postCollection
      .orderBy('published_at', 'desc')
      .where('content.active', '==', true)
      .where('content.featured', '==', false)
      .onSnapshot((snapshot) => {
        const posts = adaptAvailablePosts({ snapshot, location });

        setResults([...posts]);
      });

    return () => subscriber();
  }, [location]);

  return {
    searchQuery,
    setSearchQuery,
    results: orderBy(results, 'published_at', 'desc') as Post[],
  };
};
