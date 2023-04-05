import { usePosition } from 'hooks';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { useTypedSelector } from 'stores';
import { placeSelectors } from 'stores/place';
import styled from 'styled-components/native';
import { Box, Colors, Text } from 'themes';
import { Loader, MapSearchBar } from 'ui';

const defaultLocation = {
  latitude: 50.1632921,
  longitude: -5.128192,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
};

const StyledBar = styled.View`
  position: absolute;
  top: 10px;
  right: 25px;
  z-index: 9999;
`;

export const Search: React.FC = () => {
  const { t } = useTranslation();

  usePosition();

  const currentLocation = useTypedSelector(placeSelectors.currentLocation);
  const hasLocation = useTypedSelector(placeSelectors.hasLocation);

  return (
    <Box f={1} bgc={Colors.basic_100}>
      <Box bgc={Colors.basic_150}>
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
          <MapView
            userInterfaceStyle="light"
            showsUserLocation
            showsMyLocationButton={false}
            region={{
              ...defaultLocation,
              latitude: currentLocation?.coords.latitude || defaultLocation.latitude,
              longitude: currentLocation?.coords.longitude || defaultLocation.longitude,
            }}
            style={StyleSheet.absoluteFillObject}
            showsCompass={false}
            provider={PROVIDER_GOOGLE}
          />
        )}
      </Box>
    </Box>
  );
};
