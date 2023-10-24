import { useRoute } from '@react-navigation/native';
import { RestaurantDetailsProp } from 'navigation';
import React from 'react';
import {
  ActivityIndicator, Carousel, StatusBar, TopGradient,
} from 'ui';
import { Linking, ScrollView } from 'react-native';
import { Colors } from 'themes';
import { isIOS } from 'helpers';
import { useGetRestaurantActions, useGetRestaurantByUID } from 'hooks';
import { useGetRestaurantByIDQuery } from 'api';
import {
  Action, Details, Navigation, Offer, OpeningHours,
} from './ui';

export const RestaurantDetails: React.FC = () => {
  const { params } = useRoute<RestaurantDetailsProp>();

  const contentId = params?.contentId || '';

  const { restaurant } = useGetRestaurantByUID(contentId);

  const { data: details } = useGetRestaurantByIDQuery(restaurant?.placeDetails?.place_id, {
    skip: !restaurant?.placeDetails?.place_id,
  });

  const { onRestaurantWebsite } = useGetRestaurantActions();

  if (!restaurant || !details) {
    return <ActivityIndicator isVisible />;
  }

  const onOpen = () => {
    if (!details) {
      return;
    }

    if (isIOS) {
      Linking.openURL(`https://maps.apple.com/?daddr=${encodeURIComponent(`${details?.geometry?.location?.lat},${details.geometry.location.lng}`)}`);

      return;
    }

    Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(details?.name)}&destination_place_id=${contentId}`);
  };

  const { content } = restaurant;

  const photos = details?.photos?.map((photo) => photo.photo_reference);

  const assets = content?.assets?.map((asset) => asset.filename);

  const onOpenWebsite = () => {
    onRestaurantWebsite(contentId);

    Linking.openURL(details?.website);
  };

  return (
    <>
      <StatusBar />

      <TopGradient />

      <ScrollView
        style={{ backgroundColor: Colors.basic_100 }}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 150 }}
        showsVerticalScrollIndicator={false}
      >
        <Carousel photos={photos} assets={assets} hasAssets={!!assets?.length} />

        <Details
          restaurant={restaurant}
          name={details?.name}
          rating={details?.rating}
          totalRatings={details?.user_ratings_total}
          level={details?.price_level}
        />

        {!!content.main_offer && !!content.offer_title && (
          <Offer iconName="fire-work" label={content.offer_title} isPrimaryColor offerId={content.main_offer} />
        )}

        {!!details?.formatted_address && (
          <Action iconName="address" label={details?.formatted_address} onPress={onOpen} />
        )}

        {!!details?.opening_hours?.weekday_text?.length && (
          <OpeningHours openingHours={details?.opening_hours} />
        )}

        {!!details?.website && (
          <Action iconName="compass1" label={details?.website} onPress={onOpenWebsite} />
        )}

        {!!details?.international_phone_number && (
          <Action
            iconName="phone1"
            label={details?.international_phone_number}
            onPress={() => Linking.openURL(`tel:${details?.international_phone_number}`)}
          />
        )}
      </ScrollView>

      <Navigation
        hasPhoneNumber={!!details?.international_phone_number}
        onDirection={onOpen}
        onCall={() => Linking.openURL(`tel:${details?.international_phone_number}`)}
      />
    </>
  );
};
