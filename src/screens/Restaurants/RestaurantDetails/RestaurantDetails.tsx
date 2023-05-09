import { useRoute } from '@react-navigation/native';
import { useGetRestaurantByIDQuery } from 'api';
import { RestaurantDetailsProp } from 'navigation';
import React from 'react';
import { ActivityIndicator, StatusBar } from 'ui';
import { Linking, ScrollView } from 'react-native';
import { Colors } from 'themes';
import { AnyType, isIOS } from 'helpers';
import styled from 'styled-components/native';
import Gradient from 'react-native-linear-gradient';
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
        showsVerticalScrollIndicator={false}
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
