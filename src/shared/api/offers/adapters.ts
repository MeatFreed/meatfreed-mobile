import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { isBetweenAvailableTime } from 'helpers';
import { Offer } from './models';

export const adaptAvailableOffers = (
  userId: string,
  collections: FirebaseFirestoreTypes.QuerySnapshot<FirebaseFirestoreTypes.DocumentData>[],
) => {
  const flatData = collections.flatMap((collection) => collection.docs);

  const adaptOffers = flatData.map((doc) => doc.data()) as Offer[];

  const filteredByUserId = adaptOffers.filter((offer) => !offer?.userIds?.includes(userId));

  const filteredByAvailableDate = filteredByUserId.filter((offer) => isBetweenAvailableTime(
    offer?.content?.start_date,
    offer?.content?.end_date,
  ));

  return filteredByAvailableDate as Offer[];
};

export const adaptClaimedOffers = (
  userId: string,
  collections: FirebaseFirestoreTypes.QuerySnapshot<FirebaseFirestoreTypes.DocumentData>[],
) => {
  const flatData = collections.flatMap((collection) => collection.docs);

  const adaptOffers = flatData.map((doc) => doc.data()) as Offer[];

  const filteredByUserId = adaptOffers.filter((offer) => offer?.userIds?.includes(userId));

  return filteredByUserId as Offer[];
};
