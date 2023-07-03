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
  const { results } = useGetAvailableOffers();

  const { onOfferDetails } = useGetOffersActions();

  return (
    <>
      <Text fnw="600" ff={FontFamily.PoppinsSemiMedium} m={[10, 16, 0]}>{t('offers.title')}</Text>

      <FlatList
        data={results}
        showsVerticalScrollIndicator={false}
        keyExtractor={({ uuid }) => uuid}
        contentContainerStyle={{ paddingTop: 10, paddingBottom: 30, flexGrow: 1 }}
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
        ListEmptyComponent={!results.length ? (
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
