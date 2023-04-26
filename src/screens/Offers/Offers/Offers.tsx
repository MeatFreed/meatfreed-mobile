import { FlashList } from '@shopify/flash-list';
import { useGetOffers, useOfferActions, usePosition } from 'hooks';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Colors, HorizontalDivider } from 'themes';
import { Loader, SearchBar, StatusBar } from 'ui';
import { GlobalOfferCard, RegularOfferCard } from './ui';

export const Offers: React.FC = () => {
  const { t } = useTranslation();
  const { offers, onRefresh, isLoading } = useGetOffers();

  const { onRegular, onGlobal } = useOfferActions();

  const { getCurrentLocation } = usePosition();

  return (
    <Box f={1} bgc={Colors.basic_100}>
      <StatusBar />

      <SearchBar
        placeholder={t('placeholders.search-restaurant')}
        getCurrentLocation={getCurrentLocation}
      />

      <FlashList
        data={offers}
        showsVerticalScrollIndicator={false}
        keyExtractor={({ uid }) => uid}
        onRefresh={onRefresh}
        contentContainerStyle={{ paddingTop: 80, paddingBottom: 30 }}
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
