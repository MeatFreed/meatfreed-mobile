import { useRoute } from '@react-navigation/native';
import { RestaurantDetailsProp } from 'navigation';
import React from 'react';
import { ActivityIndicator, StatusBar } from 'ui';
import { Linking, ScrollView } from 'react-native';
import { Colors } from 'themes';
import { AnyType, isIOS, noop } from 'helpers';
import Gradient from 'react-native-linear-gradient';
import { useGetRestaurantActions, useGetRestaurantByUID } from 'hooks';
import { useGetRestaurantByIDQuery } from 'api';
import styled from 'styled-components/native';
import {
  Action, Carousel, Details, Navigation, OpeningHours,
} from './ui';

const StyledTopGradient = styled(Gradient as AnyType)`
  position: absolute;
  top: 0px;
  left: 0px;
  right: 8px;
  width: 100%;
  height: 140px;
  z-index: 1;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

export const RestaurantDetails: React.FC = () => {
  const { params } = useRoute<RestaurantDetailsProp>();

  const contentId = params?.contentId || '8f8353ed-dd81-4ce7-b588-efe4ee11030d';

  const { restaurant } = useGetRestaurantByUID(contentId);

  const { data: details } = useGetRestaurantByIDQuery(restaurant?.placeDetails?.place_id);

  const { onRestaurantWebsite } = useGetRestaurantActions();

  if (!restaurant || !details) {
    return <ActivityIndicator isVisible />;
  }

  const { content } = restaurant;

  const photos = details?.photos?.map((photo) => photo.photo_reference);

  const assets = content?.assets?.map((asset) => asset.filename);

  const onOpenWebsite = () => {
    onRestaurantWebsite(contentId);

    Linking.openURL(details?.website);
  };

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

  return (
    <>
      <StatusBar />

      <StyledTopGradient
        colors={['rgba(0, 0, 0, .5)', 'rgba(0, 0, 0, .2)', 'rgba(0, 0, 0, .01)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 0.9 }}
        locations={[0, 0.7, 0.9]}
      />

      <ScrollView
        style={{ backgroundColor: Colors.basic_100 }}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 150 }}
      >
        <Carousel photos={photos} assets={assets} hasAssets={!!assets?.length} />

        <Details
          name={details?.name}
          rating={details?.rating}
          totalRatings={details?.user_ratings_total}
          level={details?.price_level}
        />

        {!!content.main_offer && !!content.offer_title && (
          <Action iconName="fire-work" label={content.offer_title} isPrimaryColor onPress={noop} />
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
