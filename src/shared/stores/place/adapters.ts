import { LatLng } from 'react-native-maps';
import { GeoPosition } from 'react-native-geolocation-service';

export const getAdaptedCoords = (location: GeoPosition | null) => ({
  center: {
    latitude: Number(location?.coords?.latitude?.toFixed(8)) || 0,
    longitude: Number(location?.coords?.longitude?.toFixed(8)) || 0,
  },
  heading: Number(location?.coords.heading),
  pitch: 50,
  zoom: 20,
  altitude: Number(location?.coords.altitude),
});

export const getAdaptedRegion = (location: GeoPosition | null, defaultLocation?: LatLng) => ({
  latitude: Number(location?.coords?.latitude?.toFixed(8))
    || Number(defaultLocation?.latitude?.toFixed(8)),
  longitude: Number(location?.coords?.longitude?.toFixed(8))
    || Number(defaultLocation?.longitude?.toFixed(8)),
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
});
