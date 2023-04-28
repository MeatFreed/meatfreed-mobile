import { useRoute } from '@react-navigation/native';
import { useGetRestaurantByIDQuery } from 'api';
import { RestaurantDetailsProp } from 'navigation';
import React from 'react';
import { ActivityIndicator } from 'ui';
import { Linking, ScrollView } from 'react-native';
import { Colors } from 'themes';
import { isIOS } from 'helpers';
import {
  Action, Carousel, Details, Navigation, OpeningHours,
} from './ui';

export const RestaurantDetails: React.FC = () => {
  const { params } = useRoute<RestaurantDetailsProp>();

  const contentId = params?.contentId || '';

  const { data: details, isLoading } = useGetRestaurantByIDQuery(contentId);

  if (isLoading) {
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

  return (
    <>
      <ScrollView
        style={{ backgroundColor: Colors.basic_100 }}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 150 }}
      >
        <Carousel photos={details?.photos} />

        <Details
          name={details?.name}
          rating={details?.rating}
          totalRatings={details?.user_ratings_total}
          level={details?.price_level}
        />

        {!!details?.formatted_address && (
          <Action iconName="address" label={details?.formatted_address} onPress={onOpen} />
        )}

        {!!details?.opening_hours?.weekday_text?.length && (
          <OpeningHours openingHours={details?.opening_hours} />
        )}

        {!!details?.website && (
          <Action iconName="compass1" label={details?.website} onPress={() => Linking.openURL(details.website)} />
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
