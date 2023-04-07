import { Restaurant } from 'api';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { LatLng, Marker } from 'react-native-maps';
import { Box, Colors, Text } from 'themes';

interface RestaurantMarkerProps {
  restaurant: Restaurant;
  zIndex: number;
  onPress?: () => void;
}

const styles = StyleSheet.create({
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderBottomWidth: 5,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: Colors.marker,
    transform: [{ rotate: '180deg' }],
  },
});

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
    <Marker coordinate={coordinate} onPress={onPress} zIndex={zIndex}>
      <Box ai="center">
        <Box bgc={Colors.marker} br="4px" p={[8, 4]}>
          <Text color={Colors.basic_100} fs={12} w="145px" ta="center" fnw="700">{restaurant.name}</Text>
        </Box>

        <View style={styles.triangle} />
      </Box>
    </Marker>
  );
};
