import React, { useCallback } from 'react';
import { useTypedDispatch, useTypedSelector } from 'stores';
import { placeSelectors, setCurrentLocation, setLocationDelta } from 'stores/place';
import { StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Region } from 'react-native-maps';
import { MapStyles } from 'themes';
import { Restaurant } from 'api';
import { isIOS } from 'helpers';
import { GeoPosition } from 'react-native-geolocation-service';
import { useGetRestaurantActions } from 'hooks';
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

  const coordinates = {
    ...locationDelta,
    latitude: currentLocation?.latitude || defaultLocation.latitude,
    longitude: currentLocation?.longitude || defaultLocation.longitude,
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

  const { onRestaurantDetails } = useGetRestaurantActions();

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
          key={restaurant.uuid}
          zIndex={index + 1}
          restaurant={restaurant}
          onPress={() => onRestaurantDetails(restaurant.uuid)}
        />
      ))}
    </MapView>
  );
};
