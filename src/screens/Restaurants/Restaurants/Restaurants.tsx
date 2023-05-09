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
import { isIOS } from 'helpers';
import { RestaurantPanel, Map } from './ui';

const StyledLayout = styled.View`
  position: absolute;
  bottom: ${isIOS ? '28%' : '32%'};
  right: 16px;
  z-index: 9999;
`;

export const Restaurants: React.FC = () => {
  const { t } = useTranslation();

  const isFocused = useIsFocused();

  const hasLocation = useTypedSelector(placeSelectors.hasLocation);

  const { getCurrentLocation, onShowMyLocation } = usePosition();

  const { restaurants, onEndReached } = useGetRestaurants();

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
            <Button type="action" iconName="my-location" onPress={onShowMyLocation} />
          </StyledLayout>
        )}

        {isFocused && <Map restaurants={restaurants} />}

        {isFocused && (
          <RestaurantPanel restaurants={restaurants} onEndReached={onEndReached} />
        )}
      </Box>
    </Box>
  );
};
