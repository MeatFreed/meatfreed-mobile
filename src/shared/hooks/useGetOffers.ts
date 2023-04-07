import { geohashQueryBounds } from 'geofire-common';
import firestore from '@react-native-firebase/firestore';
import { useIsFocused } from '@react-navigation/native';
import { useEffect, useMemo, useState } from 'react';
import { useTypedSelector } from 'stores';
import { placeSelectors } from 'stores/place';
import { Offer, adaptOffers } from 'api';
import sortBy from 'lodash.sortby';

export const useGetOffers = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [offers, setOffers] = useState<Offer[]>([]);

  const isFocused = useIsFocused();

  const currentLocation = useTypedSelector(placeSelectors.currentLocation);

  const bounds = useMemo(() => geohashQueryBounds([
    currentLocation?.latitude,
    currentLocation?.longitude,
  ], 5000), [currentLocation]);

  const getOffers = async () => {
    setIsLoading(true);

    try {
      const response = await firestore().collection('offers').where('global', '==', true).get();

      const requestArray = bounds.map((bound) => firestore().collection('offers')
        .orderBy('geohash')
        .startAt(bound[0])
        .endAt(bound[1])
        .get());

      const collections = await Promise.all(requestArray);

      const regularCollections = collections.flatMap((collection) => collection.docs);

      const globalOffers = adaptOffers(response.docs);

      const regularOffers = adaptOffers(regularCollections);

      setOffers([...globalOffers, ...regularOffers]);
    } finally {
      setIsLoading(false);
    }
  };

  const onRefresh = () => {
    getOffers();
  };

  useEffect(() => {
    if (isFocused) {
      getOffers();
    }
  }, [isFocused, currentLocation]);

  return {
    isLoading,
    offers: sortBy(offers, 'refer', 'asc') as Offer[],
    onRefresh,
  };
};
