import { Post } from 'api';
import firestore from '@react-native-firebase/firestore';
import { useEffect, useState } from 'react';
import orderBy from 'lodash.orderby';

const postCollection = firestore().collection('posts_storyblock');

export const useGetFeaturedPosts = () => {
  const [results, setResults] = useState<Post[]>([]);

  useEffect(() => {
    const subscriber = postCollection
      .orderBy('published_at', 'desc')
      .where('content.active', '==', true)
      .where('content.featured', '==', true)
      .onSnapshot((documentSnapshot) => {
        const posts = documentSnapshot.docs.map((doc) => doc.data()) as Post[];

        setResults([...posts]);
      });

    return () => subscriber();
  }, []);

  return {
    results: orderBy(results, 'published_at', 'desc') as Post[],
  };
};
