import { LatLng } from 'react-native-maps';

export interface PlaceReducer {
  currentLocation: LatLng | null;
}

export interface PlaceState {
  place: PlaceReducer;
}
