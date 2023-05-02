interface Location {
  latitude: number;
  longitude: number;
}

export interface PlaceReducer {
  currentLocation: Location | null;
}

export interface PlaceState {
  place: PlaceReducer;
}
