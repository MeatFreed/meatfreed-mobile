import React, { useCallback } from 'react';
import { useTypedDispatch, useTypedSelector } from 'stores';
import { placeSelectors, setCurrentLocation, setLocationDelta } from 'stores/place';
import { StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Region } from 'react-native-maps';
import { MapStyles } from 'themes';
import { Restaurant } from 'api';
import { isIOS } from 'helpers';
import { RouteService } from 'services';
import { Routes } from 'navigation';
import { GeoPosition } from 'react-native-geolocation-service';
import { userSelectors } from 'stores/user';
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
  const dispatch = useTypedDispatch();

  const hasLocation = useTypedSelector(placeSelectors.hasLocation);
  const currentLocation = useTypedSelector(placeSelectors.currentLocation);
  const locationDelta = useTypedSelector(placeSelectors.locationDelta);
  const userId = useTypedSelector(userSelectors.userId);

  const coordinates = {
    ...locationDelta,
    latitude: currentLocation?.latitude || defaultLocation.latitude,
    longitude: currentLocation?.longitude || defaultLocation.longitude,
  };

  const onRestaurantDetails = (contentId: string) => {
    if (userId) {
      RouteService.navigate(Routes.RESTAURANT_NAVIGATOR, {
        screen: Routes.RESTAURANT_DETAILS, params: { contentId },
      });

      return;
    }

    RouteService.reset(Routes.WELCOME);
  };
  const onRegionChangeComplete = useCallback((region: Region) => {
    dispatch(setCurrentLocation({
      coords: {
        latitude: region.latitude,
        longitude: region.longitude,
      },
    } as GeoPosition));

    dispatch(setLocationDelta({
      latitudeDelta: region.latitudeDelta,
      longitudeDelta: region.longitudeDelta,
    }));
  }, []);

  return (
    <MapView
      userInterfaceStyle="light"
      showsUserLocation
      showsMyLocationButton={false}
      customMapStyle={MapStyles}
      initialRegion={!hasLocation ? defaultLocation : {
        ...locationDelta,
        latitude: Number(currentLocation?.latitude),
        longitude: Number(currentLocation?.longitude),
      }}
      region={coordinates}
      onRegionChangeComplete={onRegionChangeComplete}
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
