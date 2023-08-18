import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, FontFamily, Text } from 'themes';
import { useGetFeaturedOffers, useGetOffersActions } from 'hooks';
import { FlashList } from '@shopify/flash-list';
import { FeaturedCard } from './FeaturedCard';

export const FeaturedOffers: React.FC = () => {
  const { t } = useTranslation();

  const { results } = useGetFeaturedOffers();

  const { onOfferDetails } = useGetOffersActions();

  if (!results.length) {
    return null;
  }

  return (
    <Box h="150px">
      <Text fnw="600" ff={FontFamily.PoppinsSemiMedium} m={[10, 16, 0]}>{t('offers.featured')}</Text>

      <FlashList
        data={results}
        horizontal
        keyExtractor={({ uuid }) => uuid}
        showsHorizontalScrollIndicator={false}
        estimatedItemSize={100}
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
