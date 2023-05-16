/* eslint-disable @typescript-eslint/no-unused-vars */
import firestore from '@react-native-firebase/firestore';
import { useTypedSelector } from 'stores';
import { userSelectors } from 'stores/user';
import { AnyType, EventTypes, withDelay } from 'helpers';
import { RouteService, ToastService } from 'services';
import { Routes } from 'navigation';
import dayjs from 'dayjs';
import { OfferStatus, OfferType } from 'api';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAnalytics } from './useAnalytics';

interface OfferDetails {
  offerId: string;
  offerType?: OfferType;
  businessId?: string;
  offerCode?: string;
  userIds?: string[]
}

const {
  VIEW_VOUCHER_DETAILS, VIEW_RAFFLE_DETAILS, CLAIMED_OFFER, ENTER_COMPETITION,
} = EventTypes;

export const useGetOffersActions = () => {
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);

  const userId = useTypedSelector(userSelectors.userId);

  const { onLogEvent } = useAnalytics();

  const onOfferDetails = (params: OfferDetails) => {
    if (userId) {
      const isVoucher = params.offerType === OfferType.VOUCHER;

      const eventName = isVoucher ? VIEW_VOUCHER_DETAILS : VIEW_RAFFLE_DETAILS;

      const screenName = isVoucher ? Routes.VOUCHER_DETAILS : Routes.RAFFLE_DETAILS;

      onLogEvent(eventName, {
        ...params,
        userId,
        event: eventName,
        createdAt: dayjs().valueOf(),
      });

      RouteService.navigate(Routes.OFFER_NAVIGATOR, {
        screen: screenName,
        params: { contentId: params.offerId },
      });

      return;
    }

    RouteService.reset(Routes.WELCOME);
  };

  const onClaimedOffer = async ({
    businessId, offerId, offerCode, userIds = [],
  }: OfferDetails) => {
    setIsLoading(true);

    try {
      await firestore().collection('user_offers').add({
        ...(offerCode && { voucherCode: offerCode }),
        offerId,
        userId,
        createdAt: dayjs().valueOf(),
        status: OfferStatus.CLAIMED,
      });

      await firestore().collection('offers_storyblock').doc(offerId).update({
        userIds: [...new Set([...userIds, userId])],
      });

      onLogEvent(CLAIMED_OFFER, {
        offerId,
        userId,
        businessId,
        event: CLAIMED_OFFER,
        createdAt: dayjs().valueOf(),
      });
    } catch (error: AnyType) {
      ToastService.onDanger({ title: error?.message || t('errors.server-unable') });
    } finally {
      setIsLoading(false);
    }
  };

  const onEnterOffer = async ({
    businessId, offerId, userIds = [],
  }: OfferDetails) => {
    setIsLoading(true);

    try {
      await firestore().collection('user_offers').add({
        offerCode: '',
        offerId,
        userId,
        createdAt: dayjs().valueOf(),
        status: OfferStatus.PENDING,
      });

      await firestore().collection('offers_storyblock').doc(offerId).update({
        userIds: [...new Set([...userIds, userId])],
      });

      onLogEvent(ENTER_COMPETITION, {
        offerId,
        userId,
        businessId,
        event: ENTER_COMPETITION,
        createdAt: dayjs().valueOf(),
      });
    } catch (error: AnyType) {
      ToastService.onDanger({ title: error?.message || t('errors.server-unable') });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    onOfferDetails,
    onClaimedOffer,
    onEnterOffer,
    isLoading,
  };
};
