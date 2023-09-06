/* eslint-disable camelcase */
import { useRoute } from '@react-navigation/native';
import {
  OfferDescription, OfferNavigation, RaffleTitle, VoucherCode,
} from 'features';
import { useGetOfferByUID, useGetOffersActions, useGetVoucherCode } from 'hooks';
import { OfferDetailsProp, Routes } from 'navigation';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView } from 'react-native';
import { Box, Colors, HorizontalDivider } from 'themes';
import {
  ActivityIndicator, Carousel, StatusBar, TopGradient,
} from 'ui';
import { RouteService } from 'services';
import { getBasicDateFormat } from 'helpers';
import { EnteredModal, Timer } from './ui';

export const RaffleDetails: React.FC = () => {
  const { t } = useTranslation();

  const { params } = useRoute<OfferDetailsProp>();

  const contentId = params?.contentId || '2e758af2-471a-4abb-84ef-75b654daf068';

  const {
    offer,
    userOffer,
    isWonOffer,
    isAllowRaffleEntry,
    photos,
    images,
    hasData,
    isPendingOffer,
    totalEntries,
    isLoseOffer,
  } = useGetOfferByUID(contentId);

  const { offerCode } = useGetVoucherCode(offer?.content?.voucher_code?.[0]);

  const {
    isLoading, onEnterOffer, isVisible, setIsVisible,
  } = useGetOffersActions();

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

        <RaffleTitle
          title={offer?.content?.title}
          subtitle={(isLoseOffer || isWonOffer) ? t('offers.draw-closes-in', { date: getBasicDateFormat(offer?.content.end_date) }) : undefined}
          isHideEntries={isLoseOffer || isWonOffer}
          totalEntries={totalEntries}
        />

        {!isWonOffer && !isLoseOffer && offer?.content?.end_date && (
          <Timer endDate={offer?.content?.end_date} />
        )}

        {isWonOffer && !!userOffer?.voucherCode && (
          <VoucherCode code={userOffer.voucherCode} />
        )}

        <Box m={[0, 16]}>
          <HorizontalDivider />
        </Box>

        {isLoseOffer && (
          <OfferDescription title={t('raffle-details.title')} description={t('raffle-details.description')} />
        )}

        {!!offer?.content?.description && !isLoseOffer && (
          <OfferDescription description={offer?.content?.description} />
        )}
      </ScrollView>

      {isAllowRaffleEntry && (
        <OfferNavigation
          isLoading={isLoading}
          isDisabled={isPendingOffer}
          onPress={() => onEnterOffer({
            offerId: contentId,
            businessId: offer?.content?.business,
            offerType: offer?.content?.offer_type,
            offerCode,
            userIds: offer?.userIds,
          })}
          title={isPendingOffer ? t('buttons.raffle-entered') : t('buttons.enter-raffle')}
        />
      )}

      <EnteredModal
        isModalVisible={isVisible}
        onModalClose={() => setIsVisible(false)}
        endDate={offer?.content.end_date}
      />

      {isLoseOffer && (
        <OfferNavigation
          withoutIcon
          title={t('buttons.see-similar-offers')}
          onPress={() => RouteService.reset(Routes.BOTTOM_TAB_BAR_NAVIGATOR, {
            screen: Routes.OFFERS_NAVIGATOR,
          })}
        />
      )}
    </>
  );
};
