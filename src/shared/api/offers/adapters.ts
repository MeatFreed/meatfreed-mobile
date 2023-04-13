import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { AnyType, getLocalTime } from 'helpers';
import { Offer } from './models';

export const adaptOffers = (
  docs: FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData>[],
) => {
  const offers = docs.map((doc) => {
    const offer = { ...doc.data(), uid: doc.id } as Offer;

    if (offer?.expires?.toDate()) {
      const date = new Date(offer?.expires?.toDate());

      if (date.getTime() >= new Date().getTime()) {
        offer.expires = getLocalTime(offer?.expires) as AnyType;
      } else {
        return null;
      }
    }

    return offer;
  }).filter(Boolean);

  return offers as Offer[];
};
