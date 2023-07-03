import { useGetOffersActions, useGetClaimedOffers } from 'hooks';
import React from 'react';
import { Box, Colors } from 'themes';
import { Loader, StatusBar } from 'ui';
import { FlatList } from 'react-native';
import { EmptyState, OfferCard } from 'features';

export const ClaimedOffers: React.FC = () => {
  const {
    results,
  } = useGetClaimedOffers();

  const { onOfferDetails } = useGetOffersActions();

  return (
    <Box f={1} bgc={Colors.basic_150}>
      <StatusBar />

      <FlatList
        data={results}
        showsVerticalScrollIndicator={false}
        keyExtractor={({ uuid }) => uuid}
        onEndReachedThreshold={0.1}
        contentContainerStyle={{ paddingTop: 10, paddingBottom: 30, flexGrow: 1 }}
        renderItem={({ item: offer }) => (
          <OfferCard
            offer={offer}
            onPress={() => onOfferDetails({
              offerId: offer.uuid,
              businessId: offer.content.business,
              offerType: offer.content.offer_type,
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
