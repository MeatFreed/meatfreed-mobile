/* eslint-disable @typescript-eslint/no-unused-vars */
import { usePosition, useRestaurantActions } from 'hooks';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTypedSelector } from 'stores';
import { placeSelectors } from 'stores/place';
import styled from 'styled-components/native';
import { Box, Colors, Text } from 'themes';
import {
  ActivityIndicator,
  Button,
  Loader,
  MapSearchBar,
  StatusBar,
} from 'ui';
import { useIsFocused } from '@react-navigation/native';
import { Map, RestaurantPanel } from './ui';

const StyledBar = styled.View`
  position: absolute;
  top: 10px;
  right: 25px;
  z-index: 9999;
`;

const StyledLayout = styled.View`
  position: absolute;
  bottom: 30px;
  right: 25px;
  z-index: 9999;
`;

export const Search: React.FC = () => {
  const { t } = useTranslation();

  const isFocused = useIsFocused();

  const { getCurrentLocation } = usePosition();

  const {
    onRestaurant, placeId, details, isLoading,
  } = useRestaurantActions();

  const hasLocation = useTypedSelector(placeSelectors.hasLocation);

  return (
    <Box f={1} bgc={Colors.basic_100}>
      <StatusBar />

      <ActivityIndicator isVisible={isLoading} />

      <Box bgc={Colors.basic_200}>
        <Text ta="center" p={[10, 0]} fs={14} color={Colors.watermelon}>{t('search.description')}</Text>
      </Box>

      <Box f={1}>
        {!hasLocation && (
          <Box f={1} ai="center" jc="center">
            <Loader size="large" />
          </Box>
        )}

        <StyledBar>
          <MapSearchBar placeholder={t('placeholders.search-restaurant')} />
        </StyledBar>

        {hasLocation && (
          <StyledLayout>
            <Button type="action" iconName="my-location" onPress={getCurrentLocation} />
          </StyledLayout>
        )}

        {hasLocation && (
          <Map onRestaurant={(placeId: string) => onRestaurant(placeId)} />
        )}

        {isFocused && placeId && details && (
          <RestaurantPanel details={details} placeId={placeId} />
        )}
      </Box>
    </Box>
  );
};
