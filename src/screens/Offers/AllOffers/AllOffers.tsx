import { useGetAvailableOffers, useGetOffersActions } from 'hooks';
import React from 'react';
import { Box, Colors } from 'themes';
import { Loader, StatusBar } from 'ui';
import { FlatList } from 'react-native';
import { EmptyState, OfferCard } from 'features';

export const AllOffers: React.FC = () => {
  const {
    results,
    onRefresh,
    isRefreshing,
    isEmpty,
  } = useGetAvailableOffers();

  const { onOfferDetails } = useGetOffersActions();

  return (
    <Box f={1} bgc={Colors.basic_150}>
      <StatusBar />

      <FlatList
        data={results}
        showsVerticalScrollIndicator={false}
        keyExtractor={({ uuid }) => uuid}
        onRefresh={onRefresh}
        onEndReachedThreshold={0.1}
        contentContainerStyle={{ paddingTop: 10, paddingBottom: 30, flexGrow: 1 }}
        refreshing={isRefreshing}
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
        ListEmptyComponent={isEmpty ? (
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
