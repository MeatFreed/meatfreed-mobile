/* eslint-disable @typescript-eslint/no-unused-vars */
import { usePosition, useRestaurantActions } from 'hooks';
import React, { useTransition } from 'react';
import { useTranslation } from 'react-i18next';
import { useTypedSelector } from 'stores';
import { placeSelectors } from 'stores/place';
import styled from 'styled-components/native';
import { Box, Colors } from 'themes';
import {
  ActivityIndicator,
  Button,
  SearchBar,
  StatusBar,
} from 'ui';
import { useIsFocused } from '@react-navigation/native';
import { Map, RestaurantPanel } from './ui';

const StyledBar = styled(Box)`
  position: absolute;
  left: 0px;
  right: 0px;
  top: 0px;
`;

const StyledLayout = styled.View`
  position: absolute;
  bottom: 30px;
  right: 25px;
  z-index: 9999;
`;

export const Home: React.FC = () => {
  const { t } = useTranslation();

  const isFocused = useIsFocused();

  const { getCurrentLocation } = usePosition();

  const {
    placeId, details, isLoading, getRestaurant,
  } = useRestaurantActions();

  const hasLocation = useTypedSelector(placeSelectors.hasLocation);

  return (
    <Box f={1} bgc={Colors.basic_100}>
      <StatusBar />

      <ActivityIndicator isVisible={isLoading || !hasLocation} />

      <Box f={1}>
        <SearchBar
          placeholder={t('placeholders.search-restaurant')}
          getCurrentLocation={getCurrentLocation}
        />

        {hasLocation && (
          <StyledLayout>
            <Button type="action" iconName="my-location" onPress={getCurrentLocation} />
          </StyledLayout>
        )}

        {hasLocation && (
          <Map onRestaurant={(placeId: string) => getRestaurant(placeId)} />
        )}

        {isFocused && details && placeId && (
          <RestaurantPanel details={details} placeId={placeId} />
        )}
      </Box>
    </Box>
  );
};
