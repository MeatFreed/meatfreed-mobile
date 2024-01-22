import firestore from '@react-native-firebase/firestore';
import { useEffect, useState } from 'react';
import algoliasearch from 'algoliasearch';
import { Restaurant, adaptAvailableRestaurants, adaptRestaurants } from 'api';
import { useDebounce } from '@lumitech/mobile-hooks';
import Config from 'react-native-config';
import { AnyType } from 'helpers';
import { useGetBounds } from './useGetBounds';

const restaurantCollection = firestore().collection('companies_storyblock');

const searchClient = algoliasearch(
  Config.ALGOLIA_APPLICATION_ID || '',
  Config.ALGOLIA_SEARCH_API_KEY || '',
);

export const useGetRestaurants = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<Restaurant[]>([]);
  const [searchedResults, setSearchedResults] = useState<Restaurant[]>([]);

  const { selectLocation: location, currentLocation } = useGetBounds();

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const onSearchRestaurants = async () => {
    try {
      const { results: restaurantHits } = await searchClient.search<AnyType>([
        {
          indexName: 'companies_storyblock',
          query: debouncedSearchQuery,
          params: {
            hitsPerPage: 20,
            page: 0,
            minWordSizefor1Typo: 3,
          },
        },
      ]);

      const restaurants = (restaurantHits as AnyType)?.[0]?.hits as Restaurant[];

      const filteredByPublic = restaurants.filter((restaurant) => restaurant?.content?.public);

      setSearchedResults([...filteredByPublic]);
    } catch (error) { /** empty */ }
  };

  useEffect(() => {
    const subscriber = restaurantCollection
      .where('content.public', '==', true)
      .onSnapshot((snapshot) => {
        const restaurants = snapshot.docs.map((doc) => doc.data()) as Restaurant[];

        setResults([...restaurants]);
      });

    return () => subscriber?.();
  }, []);

  useEffect(() => {
    if (debouncedSearchQuery) {
      onSearchRestaurants();
    }
  }, [debouncedSearchQuery]);

  const data = adaptAvailableRestaurants({
    data: debouncedSearchQuery ? searchedResults : results, location,
  });

  const items = adaptRestaurants(data, currentLocation);

  return {
    results: items,
    searchQuery,
    setSearchQuery,
  };
};
