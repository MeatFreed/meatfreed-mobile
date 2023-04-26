import { useIsFocused } from '@react-navigation/native';
import { StoryblokService } from 'services';
import firestore from '@react-native-firebase/firestore';
import { useEffect, useState } from 'react';
import { FirebasePost, Post } from 'api';
import { isDev } from 'helpers';

type Content = Post & FirebasePost

const { client } = StoryblokService;

export const useGetPostByUID = (contentId: string) => {
  const isFocused = useIsFocused();

  const [isLoading, setIsLoading] = useState(false);

  const [post, setPost] = useState<Content | null>(null);

  const getPostByUID = async () => {
    setIsLoading(true);

    try {
      if (isDev) {
        const response = await client.get('cdn/stories/', {
          by_uuids: contentId,
        });

        setPost(response.data.stories[0]);

        return;
      }

      const response = await firestore().collection('posts').doc(contentId).get();

      setPost(response.data() as Content);
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
