import { LatLng } from 'react-native-maps';

export interface Delta {
  latitudeDelta: number;
  longitudeDelta: number;
}

export interface PlaceReducer {
  location: LatLng | null;
  delta: Delta
}

export interface PlaceState {
  place: PlaceReducer;
}
