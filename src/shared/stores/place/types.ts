interface Location {
  latitude: number;
  longitude: number;
}

export interface PlaceReducer {
  currentLocation: Location;
}

export interface PlaceState {
  place: PlaceReducer;
}
