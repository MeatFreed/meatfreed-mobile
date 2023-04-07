import { FlashList } from '@shopify/flash-list';
import { useGetOffers, useOfferActions, usePosition } from 'hooks';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box, Colors, HorizontalDivider, Text,
} from 'themes';
import { GoogleSearchBar, Loader, StatusBar } from 'ui';
import { GlobalOfferCard, RegularOfferCard } from './ui';

export const Offers: React.FC = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');

  const { offers, onRefresh, isLoading } = useGetOffers();

  const { onRegular, onGlobal } = useOfferActions();

  usePosition();

  return (
    <Box f={1} bgc={Colors.basic_100}>
      <StatusBar />
      <Box z={1} jc="space-between" bgc={Colors.basic_150} shadowed>
        <Text ta="center" p={[10, 0]} fs={14} color={Colors.watermelon}>{t('offers.description')}</Text>

        <Box m={[0, 25, 16]}>
          <GoogleSearchBar
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
            label={t('labels.restaurant')}
            placeholder={t('placeholders.search-restaurant')}
          />
        </Box>
      </Box>

      <FlashList
        data={offers}
        showsVerticalScrollIndicator={false}
        keyExtractor={({ uid }) => uid}
        onRefresh={onRefresh}
        contentContainerStyle={{ paddingTop: 10, paddingBottom: 30 }}
        refreshing={!!offers.length && isLoading}
        renderItem={({ item: offer }) => {
          if (offer?.refer) {
            return <GlobalOfferCard offer={offer} onPress={onGlobal} />;
          }

          return <RegularOfferCard offer={offer} onPress={() => onRegular(offer)} />;
        }}
        ItemSeparatorComponent={() => (
          <Box m={[0, 16]}>
            <HorizontalDivider />
          </Box>
        )}
        estimatedItemSize={300}
        ListEmptyComponent={isLoading && !!offers.length ? (
          <Loader color={Colors.purple} size="large" />
        ) : null}
      />
    </Box>
  );
};
