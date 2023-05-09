import React, { useCallback } from 'react';
import { useTypedDispatch, useTypedSelector } from 'stores';
import { placeSelectors, setLocationDelta, setSelectLocation } from 'stores/place';
import { StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Region } from 'react-native-maps';
import { MapStyles } from 'themes';
import { Restaurant } from 'api';
import { GeoPosition } from 'react-native-geolocation-service';
import { useGetRestaurantActions } from 'hooks';
import { defaultLocation } from 'helpers';
import { MapService } from 'services';
import { RestaurantMarker } from './RestaurantMarker';

interface MapProps {
  restaurants: Restaurant[];
}

export const Map: React.FC<MapProps> = ({ restaurants }) => {
  const dispatch = useTypedDispatch();

  const hasLocation = useTypedSelector(placeSelectors.hasLocation);
  const currentLocation = useTypedSelector(placeSelectors.currentLocation);
  const selectLocation = useTypedSelector(placeSelectors.selectLocation);
  const delta = useTypedSelector(placeSelectors.delta);

  const coordinates = {
    ...delta,
    latitude: selectLocation?.latitude || currentLocation?.latitude || defaultLocation.latitude,
    longitude: selectLocation?.longitude || currentLocation?.longitude || defaultLocation.longitude,
  };
  const onRegionChangeComplete = useCallback((region: Region) => {
    dispatch(setSelectLocation({
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
      ref={MapService.mapRef}
      userInterfaceStyle="light"
      showsUserLocation
      showsMyLocationButton={false}
      customMapStyle={MapStyles}
      initialRegion={!hasLocation ? defaultLocation : {
        ...delta,
        latitude: Number(selectLocation?.latitude || 0) || Number(currentLocation?.latitude),
        longitude: Number(selectLocation?.longitude || 0) || Number(currentLocation?.longitude),
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
