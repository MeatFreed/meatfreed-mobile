import { geohashQueryBounds } from 'geofire-common';
import firestore from '@react-native-firebase/firestore';
import { useEffect, useMemo, useState } from 'react';
import { useTypedSelector } from 'stores';
import { placeSelectors } from 'stores/place';
import { Offer, adaptOffers } from 'api';
import sortBy from 'lodash.sortby';

export const useGetOffers = () => {
  const [initialLoading, setInitialLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setRefreshing] = useState(false);
  const [offers, setOffers] = useState<Offer[]>([]);

  const currentLocation = useTypedSelector(placeSelectors.currentLocation);
  const hasLocation = useTypedSelector(placeSelectors.hasLocation);

  const isEmpty = !initialLoading && !offers.length;

  const bounds = useMemo(() => geohashQueryBounds([
    Number(currentLocation?.latitude || 0),
    Number(currentLocation?.longitude || 0),
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

      setInitialLoading(false);
    }
  };

  const onRefresh = async () => {
    if (!hasLocation) {
      return;
    }

    setRefreshing(true);

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
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (hasLocation) {
      getOffers();
    }
  }, [currentLocation, hasLocation]);

  return {
    isLoading,
    initialLoading,
    isRefreshing,
    isEmpty,
    offers: sortBy(offers, 'refer', 'asc') as Offer[],
    onRefresh,
  };
};
