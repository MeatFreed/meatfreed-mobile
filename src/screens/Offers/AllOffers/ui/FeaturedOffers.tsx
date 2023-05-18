import React from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList } from 'react-native';
import { Box, FontFamily, Text } from 'themes';
import { useGetFeaturedOffers, useGetOffersActions } from 'hooks';
import { FeaturedCard } from './FeaturedCard';

export const FeaturedOffers: React.FC = () => {
  const { t } = useTranslation();

  const { results } = useGetFeaturedOffers();

  const { onOfferDetails } = useGetOffersActions();

  if (!results.length) {
    return null;
  }

  return (
    <Box h="166px">
      <Text fnw="600" ff={FontFamily.PoppinsSemiMedium} m={[10, 16, 0]}>{t('offers.featured')}</Text>

      <FlatList
        data={results}
        horizontal
        contentContainerStyle={{ flexGrow: 1 }}
        keyExtractor={({ uuid }) => uuid}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item: offer, index }) => (
          <FeaturedCard
            offer={offer}
            isFirst={index === 0}
            onPress={() => onOfferDetails({
              offerId: offer?.uuid,
              businessId: offer?.content?.business,
              offerType: offer?.content?.offer_type,
            })}
          />
        )}
      />
    </Box>
  );
};
