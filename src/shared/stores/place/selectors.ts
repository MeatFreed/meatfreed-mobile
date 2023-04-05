import { PlaceState } from './types';

const all = (state: PlaceState) => state.place;

const currentLocation = (state: PlaceState) => all(state).currentLocation;

const hasLocation = (state: PlaceState) => !!all(state).currentLocation?.coords?.latitude
                                      && !!all(state).currentLocation?.coords?.longitude;

export const placeSelectors = {
  currentLocation,
  hasLocation,
};
