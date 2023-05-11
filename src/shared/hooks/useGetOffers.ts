import { geohashQueryBounds } from 'geofire-common';
import firestore from '@react-native-firebase/firestore';
import { useEffect, useState } from 'react';
import { useTypedSelector } from 'stores';
import { placeSelectors } from 'stores/place';
import { Offer, adaptOffers } from 'api';
import sortBy from 'lodash.sortby';
import uniqBy from 'lodash.uniqby';

const offerCollection = firestore().collection('offers');

export const useGetOffers = () => {
  const [initialLoading, setInitialLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setRefreshing] = useState(false);
  const [offers, setOffers] = useState<Offer[]>([]);

  const location = useTypedSelector(placeSelectors.currentLocation);

  const isEmpty = !initialLoading && !offers.length;

  const bounds = geohashQueryBounds([
    Number(location?.latitude || 0),
    Number(location?.longitude || 0),
  ], 5000);

  const getOffers = async () => {
    setIsLoading(true);

    try {
      const response = await offerCollection.where('global', '==', true).get();

      const requestArray = bounds.map((bound) => offerCollection.orderBy('geohash').startAt(bound[0]).endAt(bound[1]).get());

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
    setRefreshing(true);

    try {
      const response = await offerCollection.where('global', '==', true).get();

      const requestArray = bounds.map((bound) => offerCollection.orderBy('geohash').startAt(bound[0]).endAt(bound[1]).get());

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
    getOffers();
  }, [location]);

  return {
    isLoading,
    initialLoading,
    isRefreshing,
    isEmpty,
    offers: sortBy(uniqBy(offers, 'uid'), 'refer', 'asc') as Offer[],
    onRefresh,
  };
};
