import { useGetOffers, useOfferActions, usePosition } from 'hooks';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Colors, HorizontalDivider } from 'themes';
import { Loader, SearchBar, StatusBar } from 'ui';
import { FlatList, ListRenderItem } from 'react-native';
import { Offer } from 'api';
import { GlobalOfferCard, RegularOfferCard } from './ui';

export const Offers: React.FC = () => {
  const { t } = useTranslation();
  const { offers, onRefresh, isLoading } = useGetOffers();

  const { onRegular, onGlobal } = useOfferActions();

  const { getCurrentLocation } = usePosition();

  const renderItem: ListRenderItem<Offer> = useCallback(({ item: offer }) => {
    if (offer?.refer) {
      return <GlobalOfferCard offer={offer} onPress={onGlobal} />;
    }

    return <RegularOfferCard offer={offer} onPress={() => onRegular(offer)} />;
  }, [onGlobal, onRegular]);

  return (
    <Box f={1} bgc={Colors.basic_100}>
      <StatusBar />

      <SearchBar
        placeholder={t('placeholders.search-restaurant')}
        getCurrentLocation={getCurrentLocation}
      />

      <FlatList
        data={offers}
        showsVerticalScrollIndicator={false}
        keyExtractor={({ uid }) => uid}
        onRefresh={onRefresh}
        contentContainerStyle={{ paddingTop: 80, paddingBottom: 30 }}
        refreshing={!!offers.length && isLoading}
        renderItem={renderItem}
        ItemSeparatorComponent={() => (
          <Box m={[0, 16]}>
            <HorizontalDivider />
          </Box>
        )}
        ListEmptyComponent={isLoading && !!offers.length ? (
          <Loader color={Colors.purple} size="large" />
        ) : null}
      />
    </Box>
  );
};
