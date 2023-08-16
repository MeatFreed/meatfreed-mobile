import { useGetOffersActions, useGetClaimedOffers } from 'hooks';
import React from 'react';
import { Box, Colors } from 'themes';
import { Loader, StatusBar } from 'ui';
import { EmptyState, OfferCard } from 'features';
import { FlashList } from '@shopify/flash-list';
import { OfferType } from 'api';

export const Deals: React.FC = () => {
  const {
    results,
  } = useGetClaimedOffers(OfferType.VOUCHER);

  const { onOfferDetails } = useGetOffersActions();

  return (
    <Box f={1} bgc={Colors.basic_150}>
      <StatusBar />

      <FlashList
        data={results}
        showsVerticalScrollIndicator={false}
        keyExtractor={({ uuid }) => uuid}
        estimatedItemSize={100}
        contentContainerStyle={{ paddingTop: 10, paddingBottom: 30 }}
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
