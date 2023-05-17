import React, { useRef } from 'react';
import { useTypedSelector } from 'stores';
import { placeSelectors } from 'stores/place';
import { Image, StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Region, Marker } from 'react-native-maps';
import { Images, MapStyles } from 'themes';
import { Restaurant } from 'api';
import { useGetPositionActions, useGetRestaurantActions } from 'hooks';
import { AnyType, defaultLocation } from 'helpers';
import { MapService } from 'services';
import { RestaurantMarker } from './RestaurantMarker';

interface MapProps {
  restaurants: Restaurant[];
}

export const Map: React.FC<MapProps> = ({ restaurants }) => {
  const hasLocation = useTypedSelector(placeSelectors.hasLocation);
  const location = useTypedSelector(placeSelectors.currentLocation);
  const selectLocation = useTypedSelector(placeSelectors.selectLocation);
  const delta = useTypedSelector(placeSelectors.delta);

  const time = useRef<AnyType>();

  const { onRestaurantDetails } = useGetRestaurantActions();

  const { onRegionChangeComplete } = useGetPositionActions();

  const initialRegion = !hasLocation ? defaultLocation : {
    ...delta,
    latitude: selectLocation?.latitude || location?.latitude || 0,
    longitude: selectLocation?.longitude || location?.longitude || 0,
  };

  const region = !hasLocation ? defaultLocation : {
    ...delta,
    latitude: selectLocation?.latitude || location?.latitude || 0,
    longitude: selectLocation?.longitude || location?.longitude || 0,
  };

  const onRegionChange = (region: Region) => {
    if (time.current) {
      clearTimeout(time.current);
    }

    time.current = setTimeout(() => {
      onRegionChangeComplete(region);
    }, 1000);
  };

  return (
    <MapView
      ref={MapService.mapRef}
      userInterfaceStyle="light"
      showsUserLocation={false}
      showsMyLocationButton={false}
      customMapStyle={MapStyles}
      initialRegion={initialRegion}
      region={region}
      onRegionChange={onRegionChange}
      style={StyleSheet.absoluteFillObject}
      showsCompass={false}
      provider={PROVIDER_GOOGLE}
    >
      <Marker zIndex={9999} coordinate={region}>
        <Image style={{ width: 20, height: 20, borderRadius: 10 }} source={Images.Pin} />
      </Marker>

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
