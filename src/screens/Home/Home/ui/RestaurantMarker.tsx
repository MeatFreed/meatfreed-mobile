import { Restaurant } from 'api';
import React from 'react';
import { LatLng, Marker } from 'react-native-maps';
import { Images } from 'themes';

interface RestaurantMarkerProps {
  restaurant: Restaurant;
  zIndex: number;
  onPress?: () => void;
}

export const RestaurantMarker: React.FC<RestaurantMarkerProps> = ({
  restaurant,
  onPress,
  zIndex,
}) => {
  const coordinate = {
    latitude: restaurant?.location?.latitude || restaurant?.geolocation?.latitude,
    longitude: restaurant?.location?.longitude || restaurant?.geolocation?.longitude,
  } as LatLng;

  return (
    <Marker
      coordinate={coordinate}
      image={Images.BusinessMarker}
      onPress={onPress}
      zIndex={zIndex}
    />
  );
};
