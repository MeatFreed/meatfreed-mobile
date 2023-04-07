import React from 'react';
import { useTypedSelector } from 'stores';
import { placeSelectors } from 'stores/place';
import { useGetRestaurants } from 'hooks';
import { StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { RestaurantMarker } from './RestaurantMarker';

interface MapProps {
  onRestaurant: (placeId: string) => void;
}

const defaultLocation = {
  latitude: 50.1632921,
  longitude: -5.128192,
  latitudeDelta: 0.05,
  longitudeDelta: 0.05,
};

export const Map: React.FC<MapProps> = ({ onRestaurant }) => {
  const currentLocation = useTypedSelector(placeSelectors.currentLocation);

  const { restaurants } = useGetRestaurants();

  return (
    <MapView
      userInterfaceStyle="light"
      showsUserLocation
      showsMyLocationButton={false}
      region={{
        ...defaultLocation,
        latitude: currentLocation?.latitude || defaultLocation.latitude,
        longitude: currentLocation?.longitude || defaultLocation.longitude,
      }}
      style={StyleSheet.absoluteFillObject}
      showsCompass={false}
      provider={PROVIDER_GOOGLE}
    >
      {restaurants.map((restaurant, index) => (
        <RestaurantMarker
          key={restaurant.uid}
          zIndex={index + 1}
          restaurant={restaurant}
          onPress={() => onRestaurant(restaurant.place_id)}
        />
      ))}
    </MapView>
  );
};
