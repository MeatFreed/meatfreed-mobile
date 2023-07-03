import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { isPointWithinRadius } from 'geolib';
import { AnyType } from 'helpers';
import { LatLng } from 'react-native-maps';
import { Post } from './models';

interface AvailablePostsParams {
  snapshot: FirebaseFirestoreTypes.QuerySnapshot<FirebaseFirestoreTypes.DocumentData>
  location: LatLng | null;
}

export const adaptAvailablePosts = ({ snapshot, location }: AvailablePostsParams) => {
  const adaptPosts = snapshot.docs.map((doc) => ({
    ...doc.data(), uid: doc.id,
  })) as unknown as Post[];

  const filteredByLocation = adaptPosts.filter((post) => {
    const postLocation = post?.placeDetails?.geometry?.location;

    const inRadius = isPointWithinRadius({
      latitude: postLocation.lat, longitude: postLocation.lng,
    }, location as AnyType, 30000);

    return inRadius;
  });

  return filteredByLocation as Post[];
};
