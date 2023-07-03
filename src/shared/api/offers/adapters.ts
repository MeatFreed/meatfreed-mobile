import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { AnyType, isBetweenAvailableTime } from 'helpers';
import { isPointWithinRadius } from 'geolib';
import { LatLng } from 'react-native-maps';
import { Offer } from './models';

interface AvailableOffersParams {
  userId: string
  snapshot: FirebaseFirestoreTypes.QuerySnapshot<FirebaseFirestoreTypes.DocumentData>
  location: LatLng | null;
}

export const adaptAvailableOffers = ({ userId, snapshot, location }: AvailableOffersParams) => {
  const adaptOffers = snapshot.docs.map((doc) => doc.data()) as Offer[];

  const filteredByUserId = adaptOffers.filter((offer) => !offer?.userIds?.includes(userId));

  const filteredByAvailableDate = filteredByUserId.filter((offer) => {
    const isBetweenTime = isBetweenAvailableTime(
      offer?.content?.start_date,
      offer?.content?.end_date,
    );

    const orderLocation = offer?.placeDetails?.geometry?.location;

    const inRadius = isPointWithinRadius({
      latitude: orderLocation.lat, longitude: orderLocation.lng,
    }, location as AnyType, 30000);

    return isBetweenTime && inRadius;
  });

  return filteredByAvailableDate as Offer[];
};

export const adaptFeaturedOffers = (
  userId: string,
  collection: FirebaseFirestoreTypes.QuerySnapshot<FirebaseFirestoreTypes.DocumentData>,
) => {
  const adaptOffers = collection.docs.map((doc) => doc.data()) as Offer[];

  const filteredByUserId = adaptOffers.filter((offer) => !offer?.userIds?.includes(userId));

  const filteredByAvailableDate = filteredByUserId.filter((offer) => isBetweenAvailableTime(
    offer?.content?.start_date,
    offer?.content?.end_date,
  ));

  return filteredByAvailableDate as Offer[];
};
