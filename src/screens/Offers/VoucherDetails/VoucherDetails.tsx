/* eslint-disable camelcase */
import { useRoute } from '@react-navigation/native';
import { OfferStatus, useGetRestaurantByIDQuery } from 'api';
import dayjs from 'dayjs';
import {
  OfferDescription, OfferNavigation, OfferTitle, VoucherCode,
} from 'features';
import { useGetOfferByUID, useGetOffersActions, useGetVoucherCode } from 'hooks';
import { OfferDetailsProp } from 'navigation';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView } from 'react-native';
import { Box, Colors, HorizontalDivider } from 'themes';
import {
  ActivityIndicator, Carousel, StatusBar, TopGradient,
} from 'ui';

export const VoucherDetails: React.FC = () => {
  const { t } = useTranslation();

  const { params } = useRoute<OfferDetailsProp>();

  const contentId = params?.contentId || '9192fc7b-316c-46b6-a0cf-078b4dbc7da6';

  const { offer, userOffer } = useGetOfferByUID(contentId);

  const { data: details } = useGetRestaurantByIDQuery(offer?.placeDetails?.place_id);

  const { offerCode } = useGetVoucherCode(offer?.content?.voucher_code?.[0]);

  const { onClaimedOffer, isLoading } = useGetOffersActions();

  if (!offer || !details) {
    return <ActivityIndicator isVisible />;
  }

  const {
    assets, title, end_date, offer_type, description, business,
  } = offer.content;

  const photos = details?.photos?.map((photo) => photo.photo_reference);

  const images = assets?.map((asset) => asset.filename);

  const isClaimedOffer = userOffer?.status === OfferStatus.CLAIMED;

  const isBefore = dayjs().isBefore(end_date, 'm');

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

        {isClaimedOffer && !!userOffer.voucherCode && (
          <VoucherCode code={userOffer.voucherCode} />
        )}

        <Box m={[0, 16]}>
          <HorizontalDivider />
        </Box>

        {!!description && (
          <OfferDescription description={description} />
        )}
      </ScrollView>

      {isBefore && (
        <OfferNavigation
          title={isClaimedOffer ? t('buttons.offer-claimed') : t('buttons.claim-offer')}
          isLoading={isLoading}
          isDisabled={isClaimedOffer}
          onPress={() => onClaimedOffer({
            offerId: contentId,
            businessId: business,
            offerType: offer_type,
            offerCode,
            userIds: offer?.userIds,
          })}
        />
      )}
    </>
  );
};
