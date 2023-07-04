/* eslint-disable camelcase */

import { isPointWithinRadius } from 'geolib';
import { AnyType } from 'helpers';
import orderBy from 'lodash.orderby';
import { LatLng } from 'react-native-maps';
import { Post, PostCard } from './models';

interface AvailablePostsParams {
  data: Post[]
  location: LatLng | null;
}

export const adaptPosts = (data: Post[]) => data.map(({ content, published_at, uuid }) => ({
  description: content.description,
  assets: content.assets,
  title: content.title,
  uuid,
  published_at,
}));

export const adaptAvailablePosts = ({ data, location }: AvailablePostsParams) => {
  if (!location) {
    return [];
  }

  const filteredByLocation = data.filter((post) => {
    const postLocation = post?.placeDetails?.geometry?.location;

    const inRadius = isPointWithinRadius({
      latitude: postLocation.lat, longitude: postLocation.lng,
    }, location as AnyType, 30000);

    return inRadius;
  });

  return orderBy(adaptPosts(filteredByLocation), 'published_at', 'desc') as PostCard[];
};
