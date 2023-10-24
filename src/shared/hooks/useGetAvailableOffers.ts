import firestore from '@react-native-firebase/firestore';
import { useEffect, useState } from 'react';
import { useTypedSelector } from 'stores';
import algoliasearch from 'algoliasearch';
import { Offer, OfferType, adaptAvailableOffers } from 'api';
import { userSelectors } from 'stores/user';
import Config from 'react-native-config';
import { AnyType } from 'helpers';
import { useDebounce } from '@lumitech/mobile-hooks';
import { useGetBounds } from './useGetBounds';

const offerCollection = firestore().collection('offers_storyblock');

const searchClient = algoliasearch(
  Config.ALGOLIA_APPLICATION_ID || '',
  Config.ALGOLIA_SEARCH_API_KEY || '',
);

export const useGetAvailableOffers = (offerType = OfferType.VOUCHER) => {
  const userId = useTypedSelector(userSelectors.userId);

  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<Offer[]>([]);
  const [searchedResults, setSearchedResults] = useState<Offer[]>([]);

  const { selectLocation: location } = useGetBounds();

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const defaultResults = results.length ? results : [];

  const onSearchOffers = async () => {
    try {
      const { results: offerHits } = await searchClient.search<AnyType>([
        {
          indexName: 'offers_storyblock',
          query: debouncedSearchQuery,
          params: {
            hitsPerPage: 20,
            page: 0,
            minWordSizefor1Typo: 3,
          },
        },
      ]);

      const offers = (offerHits as AnyType)?.[0]?.hits as Offer[];

      const filteredByPublic = offers.filter(({ content }) => (
        content.public && content.active && !content.featured && content.offer_type === offerType
      ));

      setSearchedResults([...filteredByPublic]);
    } catch (error) { /** empty */ }
  };

  useEffect(() => {
    const subscriber = offerCollection
      .where('content.active', '==', true)
      .where('content.public', '==', true)
      .where('content.featured', '==', false)
      .where('content.offer_type', '==', offerType)
      .onSnapshot((snapshot) => {
        const offers = snapshot.docs.map((doc) => doc.data()) as Offer[];

        setResults([...offers]);
      });

    return () => subscriber();
  }, []);

  useEffect(() => {
    if (debouncedSearchQuery) {
      onSearchOffers();
    }
  }, [debouncedSearchQuery]);

  const items = adaptAvailableOffers({
    userId,
    location,
    data: debouncedSearchQuery ? searchedResults : defaultResults,
  });

  return {
    results: items,
    searchQuery,
    setSearchQuery,
  };
};
