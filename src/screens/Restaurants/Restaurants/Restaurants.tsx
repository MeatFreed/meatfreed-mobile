import { useGetRestaurants, usePosition } from 'hooks';
import React from 'react';
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
import { RestaurantPanel, Map } from './ui';

const StyledLayout = styled.View`
  position: absolute;
  bottom: 30px;
  right: 25px;
  z-index: 9999;
`;

export const Restaurants: React.FC = () => {
  const { t } = useTranslation();

  const isFocused = useIsFocused();

  const hasLocation = useTypedSelector(placeSelectors.hasLocation);

  const { getCurrentLocation } = usePosition();

  const { restaurants, isLoading } = useGetRestaurants();

  return (
    <Box f={1} bgc={Colors.basic_100}>
      {isFocused && <ActivityIndicator isVisible={isLoading} />}

      <StatusBar />

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

        {isFocused && <Map restaurants={restaurants} />}

        {isFocused && (
          <RestaurantPanel restaurants={restaurants} />
        )}
      </Box>
    </Box>
  );
};
