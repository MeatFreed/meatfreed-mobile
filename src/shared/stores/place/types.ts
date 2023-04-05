import { GeoPosition } from 'react-native-geolocation-service';

export interface PlaceReducer {
  currentLocation: GeoPosition | null;
}

export interface PlaceState {
  place: PlaceReducer;
}
