import firestore from '@react-native-firebase/firestore';
import { useIsFocused } from '@react-navigation/native';
import { Post } from 'api';
import { useEffect, useState } from 'react';

export const useGetPosts = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<Post[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const isFocused = useIsFocused();

  const getPosts = async () => {
    setIsLoading(true);

    try {
      const collection = await firestore().collection('posts').get();

      const posts = collection.docs.map((doc) => ({ ...doc.data(), uid: doc.id })) as Post[];

      setResults([...posts]);
    } finally {
      setIsLoading(false);
    }
  };

  const onRefresh = () => {
    getPosts();
  };

  useEffect(() => {
    if (isFocused) {
      getPosts();
    }
  }, [isFocused]);

  useEffect(() => {
    if (searchQuery && results.length) {
      const filteredPosts = results.filter((item) => {
        const hasTitle = item.title?.toLowerCase().includes(searchQuery.toLowerCase());

        const hasSubTitle = item.subtitle?.toLowerCase().includes(searchQuery.toLowerCase());

        return hasTitle || hasSubTitle;
      });

      setPosts([...filteredPosts]);
    } else {
      setPosts([...results]);
    }
  }, [searchQuery, results]);

  return {
    searchQuery,
    setSearchQuery,
    isLoading,
    posts,
    getPosts,
    onRefresh,
  };
};
