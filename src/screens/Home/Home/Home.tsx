import { useGetRestaurants, usePosition } from 'hooks';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTypedSelector } from 'stores';
import { placeSelectors } from 'stores/place';
import styled from 'styled-components/native';
import { Box, Colors } from 'themes';
import {
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

export const Home: React.FC = () => {
  const { t } = useTranslation();

  const isFocused = useIsFocused();

  const { getCurrentLocation } = usePosition();

  const { restaurants } = useGetRestaurants();

  const hasLocation = useTypedSelector(placeSelectors.hasLocation);

  return (
    <Box f={1} bgc={Colors.basic_100}>
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

        {hasLocation && (
          <Map restaurants={restaurants} />
        )}

        {isFocused && hasLocation && !!restaurants.length && (
          <RestaurantPanel restaurants={restaurants} />
        )}
      </Box>
    </Box>
  );
};
