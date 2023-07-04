import React from 'react';
import {
  Box, Colors, FontFamily, Text,
} from 'themes';
import { Loader, StatusBar } from 'ui';
import { FlashList } from '@shopify/flash-list';
import { EmptyState, OfferCard } from 'features';
import { useGetAvailableOffers, useGetOffersActions } from 'hooks';
import { useTranslation } from 'react-i18next';
import { FeaturedOffers } from './ui';

export const AllOffers: React.FC = () => {
  const { t } = useTranslation();
  const { results } = useGetAvailableOffers();

  const { onOfferDetails } = useGetOffersActions();

  return (
    <Box f={1} bgc={Colors.basic_150}>
      <StatusBar />

      <FlashList
        data={results}
        showsVerticalScrollIndicator={false}
        keyExtractor={({ uuid }) => uuid}
        contentContainerStyle={{ paddingTop: 10, paddingBottom: 30 }}
        estimatedItemSize={100}
        ListHeaderComponent={(
          <>
            <FeaturedOffers />

            <Text fnw="600" ff={FontFamily.PoppinsSemiMedium} m={[10, 16, 0]}>{t('offers.title')}</Text>
          </>
        )}
        renderItem={({ item: offer }) => (
          <OfferCard
            {...offer}
            onPress={() => onOfferDetails({
              offerId: offer?.uuid,
              businessId: offer?.business,
              offerType: offer?.offer_type,
            })}
          />
        )}
        ListEmptyComponent={!results.length ? (
          <EmptyState />
        ) : (
          <Box f={1} ai="center" jc="center">
            <Loader color={Colors.primary_500} size="large" />
          </Box>
        )}
      />
    </Box>
  );
};
