import { Restaurant } from 'api';
import React from 'react';
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
  const { placeDetails: details } = restaurant;

  const coordinate = {
    latitude: details.geometry.location.lat,
    longitude: details.geometry.location.lng,
  } as LatLng;

  return (
    <Marker coordinate={coordinate} onPress={onPress} zIndex={zIndex}>
      <StyledImage source={Images.BusinessMarker} resizeMode="contain" />
    </Marker>
  );
};
