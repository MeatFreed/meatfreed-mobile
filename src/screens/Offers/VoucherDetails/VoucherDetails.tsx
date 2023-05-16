/* eslint-disable camelcase */
import { useRoute } from '@react-navigation/native';
import {
  OfferDescription, OfferNavigation, VoucherTitle, VoucherCode,
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

  const contentId = params?.contentId || '';

  const {
    offer,
    userOffer,
    isAllowVoucherClaimed,
    isClaimedOffer,
    photos,
    images,
    hasData,
  } = useGetOfferByUID(contentId);

  const { offerCode } = useGetVoucherCode(offer?.content?.voucher_code?.[0]);

  const { onClaimedOffer, isLoading } = useGetOffersActions();

  if (!hasData) {
    return <ActivityIndicator isVisible />;
  }

  return (
    <>
      <StatusBar />

      <TopGradient />

      <ScrollView
        style={{ backgroundColor: Colors.basic_100 }}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 150 }}
        showsVerticalScrollIndicator={false}
      >
        <Carousel photos={photos} assets={images} hasAssets={!!images?.length} />

        <VoucherTitle title={offer?.content?.title} />

        {isClaimedOffer && !!userOffer?.voucherCode && (
          <VoucherCode code={userOffer.voucherCode} />
        )}

        <Box m={[0, 16]}>
          <HorizontalDivider />
        </Box>

        {!!offer?.content?.description && (
          <OfferDescription description={offer?.content?.description} />
        )}
      </ScrollView>

      {isAllowVoucherClaimed && (
        <OfferNavigation
          title={isClaimedOffer ? t('buttons.offer-claimed') : t('buttons.claim-offer')}
          isLoading={isLoading}
          isDisabled={isClaimedOffer}
          onPress={() => onClaimedOffer({
            offerId: contentId,
            businessId: offer?.content?.business,
            offerType: offer?.content?.offer_type,
            offerCode,
            userIds: offer?.userIds,
          })}
        />
      )}
    </>
  );
};
