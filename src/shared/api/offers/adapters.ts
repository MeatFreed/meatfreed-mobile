/* eslint-disable camelcase */
import { AnyType, isBetweenAvailableTime } from 'helpers';
import { isPointWithinRadius } from 'geolib';
import { LatLng } from 'react-native-maps';
import orderBy from 'lodash.orderby';
import { Offer, OfferCard } from './models';

interface AvailableOffersParams {
  userId: string;
  data: Offer[];
  location: LatLng | null;
}

const adaptOffers = (data: Offer[]) => data.map(({
  content, placeDetails, published_at, uuid,
}) => ({
  uuid,
  assets: content.assets,
  title: content.title,
  subtitle: content.subtitle,
  offer_type: content.offer_type,
  end_date: content.end_date,
  photos: placeDetails.photos,
  business: content.business,
  published_at,
}));

export const adaptAvailableOffers = ({ userId, data, location }: AvailableOffersParams) => {
  if (!location) {
    return [];
  }

  const filteredByAvailableDate = data.filter((offer) => {
    const isBetweenTime = isBetweenAvailableTime(
      offer?.content?.start_date,
      offer?.content?.end_date,
    );

    const orderLocation = offer?.placeDetails?.geometry?.location;

    const inRadius = isPointWithinRadius({
      latitude: orderLocation.lat, longitude: orderLocation.lng,
    }, location as AnyType, 30000);

    return isBetweenTime && inRadius && !offer?.userIds?.includes(userId);
  });

  const offers = adaptOffers(filteredByAvailableDate);

  return orderBy(offers, 'published_at', 'desc') as OfferCard[];
};

export const adaptFeaturedOffers = (
  userId: string,
  data: Offer[],
) => {
  const filteredByAvailableDate = data.filter((offer) => isBetweenAvailableTime(
    offer?.content?.start_date,
    offer?.content?.end_date,
  ) && !offer?.userIds?.includes(userId));

  return orderBy(filteredByAvailableDate, 'published_at', 'desc') as Offer[];
};

export const adaptClaimedOffers = (
  userId: string,
  data: Offer[],
) => {
  const filteredByUserId = data.filter((offer) => offer?.userIds?.includes(userId));

  const offers = adaptOffers(filteredByUserId);

  return orderBy(offers, 'published_at', 'desc') as OfferCard[];
};
