import { useGetRestaurants, useGetPositionActions } from 'hooks';
import React, { useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/native';
import { Box, Colors } from 'themes';
import {
  Button,
  Icon,
  StatusBar,
  Input,
} from 'ui';
import { useIsFocused } from '@react-navigation/native';
import { AnyType, hasNotch } from 'helpers';
import { useTypedSelector } from 'stores';
import { userSelectors } from 'stores/user';
import { useWindowDimensions } from 'react-native';
import { RouteService } from 'services';
import { Routes } from 'navigation';
import { RestaurantPanel, Map } from './ui';

const StyledLayout = styled.View`
  position: absolute;
  bottom: ${hasNotch ? '28%' : '32%'};
  right: 16px;
  z-index: 9999;
`;

const StyledFavorite = styled.TouchableOpacity`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
`;

export const Restaurants: React.FC = () => {
  const { t } = useTranslation();

  const isFocused = useIsFocused();

  const { onShowMyLocation } = useGetPositionActions();

  const { results, searchQuery, setSearchQuery } = useGetRestaurants();

  const userId = useTypedSelector(userSelectors.userId);

  const ref = useRef<AnyType>();

  const { width } = useWindowDimensions();

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
        <Box jc="space-between" fd="row" bgc={Colors.white} pb={12}>
          <Box w={`${width - 32}px`} p={[0, 16]}>
            <Input
              value={searchQuery}
              onChangeText={(value) => setSearchQuery(value)}
              placeholder={t('placeholders.search-restaurant')}
              fullWidth
              onRightPress={() => setSearchQuery('')}
              LeftIcon={<Icon name="search-outline" size={24} color={Colors.basic_700} />}
              RightIcon={searchQuery ? <Icon name="close" size={24} color={Colors.basic_700} /> : null}
            />
          </Box>

          {!!userId && (
            <StyledFavorite onPress={() => RouteService.navigate(Routes.RESTAURANT_FAVORITES)}>
              <Icon size={24} color={Colors.basic_800} name="heart-outline" />
            </StyledFavorite>
          )}
        </Box>

        <StyledLayout>
          <Button type="action" iconName="my-location" onPress={onLocation} />
        </StyledLayout>

        <Map restaurants={results} />

        {isFocused && (
          <RestaurantPanel restaurants={results} />
        )}
      </Box>
    </Box>
  );
};
