import { Post, adaptAvailablePosts } from 'api';
import firestore from '@react-native-firebase/firestore';
import { useEffect, useState } from 'react';
import { useGetBounds } from './useGetBounds';

const postCollection = firestore().collection('posts_storyblock');

export const useGetPosts = () => {
  const [results, setResults] = useState<Post[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const { selectLocation: location } = useGetBounds();

  useEffect(() => {
    const subscriber = postCollection
      .orderBy('published_at', 'desc')
      .where('content.active', '==', true)
      .where('content.featured', '==', false)
      .onSnapshot((snapshot) => {
        const posts = snapshot.docs.map((doc) => doc.data()) as Post[];

        setResults([...posts]);
      });

    return () => subscriber();
  }, []);

  return {
    searchQuery,
    setSearchQuery,
    results: results.length ? adaptAvailablePosts({ location, data: results }) : [],
  };
};
