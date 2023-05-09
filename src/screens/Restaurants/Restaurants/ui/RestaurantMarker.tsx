import { Restaurant } from 'api';
import React, { useState } from 'react';
import { LatLng, Marker } from 'react-native-maps';
import styled from 'styled-components/native';
import { Images } from 'themes';

interface RestaurantMarkerProps {
  restaurant: Restaurant;
  zIndex: number;
  onPress?: () => void;
}

const StyledImage = styled.Image`
  width: 50px;
  height: 50px;
`;

export const RestaurantMarker: React.FC<RestaurantMarkerProps> = ({
  restaurant,
  onPress,
  zIndex,
}) => {
  const [tracksViewChanges, setTracksViewChanges] = useState(true);

  const coordinate = {
    latitude: restaurant?.location?.latitude || restaurant?.geolocation?.latitude,
    longitude: restaurant?.location?.longitude || restaurant?.geolocation?.longitude,
  } as LatLng;

  return (
    <Marker
      coordinate={coordinate}
      onPress={onPress}
      zIndex={zIndex}
      tracksViewChanges={tracksViewChanges}
    >
      <StyledImage source={Images.BusinessMarker} resizeMode="contain" onLoadEnd={() => setTracksViewChanges(false)} />
    </Marker>
  );
};
