import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { LatLng } from 'react-native-maps';
import { getDistance } from 'geolib';
import { Restaurant } from './models';

export const adaptRestaurants = (
  collections: FirebaseFirestoreTypes.QuerySnapshot<FirebaseFirestoreTypes.DocumentData>[],
  location: LatLng | null,
) => {
  const flatData = collections.flatMap((collection) => collection.docs);

  const result = flatData.map((doc) => {
    const data = doc.data() as Restaurant;

    const distance = getDistance(
      {
        latitude: Number(location?.latitude || 0),
        longitude: Number(location?.longitude || 0),
      },
      {
        latitude: Number(data?.location?.latitude),
        longitude: Number(data?.location?.longitude),
      },
    );

    return {
      ...data,
      distance,
      uid: doc.id,
    };
  });

  return result as Restaurant[];
};
