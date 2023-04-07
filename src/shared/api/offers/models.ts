import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

export interface Offer {
  description: string;
  geohash: string;
  place_id: string;
  clicksCount: number;
  global: boolean;
  when: string;
  uid: string;
  refer: boolean;
  expires: FirebaseFirestoreTypes.Timestamp,
  url?: string;
  image?: string;
}
