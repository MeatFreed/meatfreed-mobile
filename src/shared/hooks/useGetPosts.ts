import { useIsFocused } from '@react-navigation/native';
import { Post } from 'api';
import dayjs from 'dayjs';
import uniqBy from 'lodash.uniqby';
import { useEffect, useState } from 'react';
import { StoryblokService } from 'services';

const { client } = StoryblokService;

export const useGetPosts = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [results, setResults] = useState<Post[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const isFocused = useIsFocused();

  const shouldPaginate = results.length >= 10;

  const getPosts = async (page = 1) => {
    setIsLoading(true);

    try {
      const response = await client.get('cdn/stories/', {
        filter_query: {
          active: {
            in: true,
          },
          component: {
            in: 'Post',
          },
          available_from: {
            lt_date: dayjs().format('YYYY-MM-DD HH:mm'),
          },
        },
        sort_by: 'published_at:desc',
        page,
        per_page: 10,
      });

      setResults([...results, ...response.data.stories]);
    } finally {
      setIsLoading(false);
    }
  };

  const onRefresh = () => {
    setPage(1);
    getPosts();
  };

  const onEndReached = () => {
    if (!shouldPaginate) {
      return;
    }

    setPage(page + 1);

    getPosts(page + 1);
  };

  useEffect(() => {
    if (isFocused) {
      getPosts();
    }
  }, [isFocused]);

  return {
    searchQuery,
    setSearchQuery,
    isLoading,
    results: uniqBy(results, 'uuid'),
    getPosts,
    onRefresh,
    onEndReached,
  };
};
