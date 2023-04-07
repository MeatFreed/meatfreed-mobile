import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

export interface Restaurant {
  address: string;
  clicksCount?: number;
  uid: string;
  geohash: string;
  place_id: string;
  name: string;
  key?: string;
  location?: FirebaseFirestoreTypes.GeoPoint;
  geolocation?: FirebaseFirestoreTypes.GeoPoint;
}
