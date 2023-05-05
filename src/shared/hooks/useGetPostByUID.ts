import { useIsFocused } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { useEffect, useState } from 'react';
import { Post } from 'api';

export const useGetPostByUID = (contentId: string) => {
  const isFocused = useIsFocused();

  const [isLoading, setIsLoading] = useState(false);

  const [post, setPost] = useState<Post | null>(null);

  const getPostByUID = async () => {
    setIsLoading(true);

    try {
      const response = await firestore().collection('posts_storyblock').doc(contentId).get();

      setPost(response.data() as Post);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isFocused && contentId) {
      getPostByUID();
    }
  }, [isFocused, contentId]);

  return {
    post,
    getPostByUID,
    isLoading,
  };
};
