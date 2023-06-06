import { useGetRestaurants, useGetPositionActions } from 'hooks';
import React, { useCallback, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/native';
import { Box, Colors } from 'themes';
import {
  Button,
  SearchBar,
  StatusBar,
} from 'ui';
import { useIsFocused } from '@react-navigation/native';
import { AnyType, hasNotch } from 'helpers';
import { RestaurantPanel, Map } from './ui';

const StyledLayout = styled.View`
  position: absolute;
  bottom: ${hasNotch ? '28%' : '32%'};
  right: 16px;
  z-index: 9999;
`;

export const Restaurants: React.FC = () => {
  const { t } = useTranslation();

  const [searchQuery, setSearchQuery] = useState('');

  const isFocused = useIsFocused();

  const { onShowMyLocation } = useGetPositionActions();

  const { restaurants } = useGetRestaurants();

  const ref = useRef<AnyType>();

  const onReset = useCallback(() => {
    ref?.current?.setAddressText?.('');
    setSearchQuery('');
  }, []);

  const onLocation = useCallback(() => {
    onReset();
    onShowMyLocation();
  }, []);

  return (
    <Box f={1} bgc={Colors.basic_100}>
      <StatusBar />

      <Box f={1}>
        <SearchBar
          ref={ref}
          placeholder={t('placeholders.search-restaurant')}
          onReset={onReset}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        <StyledLayout>
          <Button type="action" iconName="my-location" onPress={onLocation} />
        </StyledLayout>

        <Map restaurants={restaurants} />

        {isFocused && (
          <RestaurantPanel restaurants={restaurants} />
        )}
      </Box>
    </Box>
  );
};
