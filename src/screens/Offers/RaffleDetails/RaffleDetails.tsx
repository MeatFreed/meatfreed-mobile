/* eslint-disable camelcase */
import { useRoute } from '@react-navigation/native';
import { useGetRestaurantByIDQuery } from 'api';
import { OfferDescription, OfferNavigation, OfferTitle } from 'features';
import { useGetOfferByUID } from 'hooks';
import { OfferDetailsProp } from 'navigation';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView } from 'react-native';
import { Colors } from 'themes';
import {
  ActivityIndicator, Carousel, StatusBar, TopGradient,
} from 'ui';

export const RaffleDetails: React.FC = () => {
  const { t } = useTranslation();

  const { params } = useRoute<OfferDetailsProp>();

  const contentId = params?.contentId || '';

  const { offer } = useGetOfferByUID(contentId);

  const { data: details } = useGetRestaurantByIDQuery(offer?.placeDetails?.place_id);

  if (!offer || !details) {
    return <ActivityIndicator isVisible />;
  }

  const {
    assets, title, end_date, offer_type, description,
  } = offer.content;

  const photos = details?.photos?.map((photo) => photo.photo_reference);

  const images = assets?.map((asset) => asset.filename);

  return (
    <>
      <StatusBar />

      <TopGradient />

      <ScrollView
        style={{ backgroundColor: Colors.basic_100 }}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 150 }}
        showsVerticalScrollIndicator={false}
      >
        <Carousel photos={photos} assets={images} hasAssets={!!assets?.length} />

        <OfferTitle endDate={end_date} type={offer_type} title={title} />

        {!!description && (
          <OfferDescription description={description} />
        )}
      </ScrollView>

      <OfferNavigation title={t('buttons.enter-competition')} />
    </>
  );
};
