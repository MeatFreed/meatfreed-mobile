import React from 'react';
import { useTypedSelector } from 'stores';
import { placeSelectors } from 'stores/place';
import { StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { MapStyles } from 'themes';
import { Restaurant } from 'api';
import { RouteService } from 'services';
import { Routes } from 'navigation';
import { userSelectors } from 'stores/user';
import { isIOS } from 'helpers';
import { RestaurantMarker } from './RestaurantMarker';

interface MapProps {
  restaurants: Restaurant[];
}

const defaultLocation = {
  latitude: 50.1632921,
  longitude: -5.128192,
  latitudeDelta: isIOS ? 0.05 : 0.1,
  longitudeDelta: isIOS ? 0.05 : 0.1,
};

export const Map: React.FC<MapProps> = ({ restaurants }) => {
  const hasLocation = useTypedSelector(placeSelectors.hasLocation);
  const currentLocation = useTypedSelector(placeSelectors.currentLocation);
  const userId = useTypedSelector(userSelectors.userId);

  const onRestaurantDetails = (contentId: string) => {
    if (userId) {
      RouteService.navigate(Routes.RESTAURANT_NAVIGATOR, {
        screen: Routes.RESTAURANT_DETAILS, params: { contentId },
      });

      return;
    }

    RouteService.reset(Routes.WELCOME);
  };

  return (
    <MapView
      userInterfaceStyle="light"
      showsUserLocation
      showsMyLocationButton={false}
      customMapStyle={MapStyles}
      initialRegion={!hasLocation ? defaultLocation : {
        ...defaultLocation,
        latitude: Number(currentLocation?.latitude),
        longitude: Number(currentLocation?.longitude),
      }}
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
          onPress={() => onRestaurantDetails(restaurant.place_id)}
        />
      ))}
    </MapView>
  );
};
