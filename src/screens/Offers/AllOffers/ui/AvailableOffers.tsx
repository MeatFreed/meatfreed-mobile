import { useGetAvailableOffers, useGetOffersActions } from 'hooks';
import React from 'react';
import {
  Box, Colors, FontFamily, Text,
} from 'themes';
import { Loader } from 'ui';
import { FlatList } from 'react-native';
import { EmptyState, OfferCard } from 'features';
import { useTranslation } from 'react-i18next';

export const AvailableOffers: React.FC = () => {
  const { t } = useTranslation();
  const {
    results,
    onRefresh,
    isRefreshing,
    isEmpty,
  } = useGetAvailableOffers();

  const { onOfferDetails } = useGetOffersActions();

  return (
    <>
      <Text fnw="600" ff={FontFamily.PoppinsSemiMedium} m={[10, 16, 0]}>{t('offers.title')}</Text>

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
              offerId: offer?.uuid,
              businessId: offer?.content?.business,
              offerType: offer?.content?.offer_type,
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
    </>
  );
};
