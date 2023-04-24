import { useIsFocused } from '@react-navigation/native';
import { StoryblokService } from 'services';
import { useEffect, useState } from 'react';
import { Post } from 'api';

const { client } = StoryblokService;

export const useGetPostByUID = (contentId: string) => {
  const isFocused = useIsFocused();

  const [isLoading, setIsLoading] = useState(false);

  const [post, setPost] = useState<Post | null>(null);

  const getPostByUID = async () => {
    setIsLoading(true);

    try {
      const response = await client.get('cdn/stories/', {
        by_uuids: contentId,
      });

      setPost(response.data.stories[0]);
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
