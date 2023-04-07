import { PlaceState } from './types';

const all = (state: PlaceState) => state.place;

const currentLocation = (state: PlaceState) => all(state).currentLocation;

const hasLocation = (state: PlaceState) => !!all(state).currentLocation?.latitude
                                      && !!all(state).currentLocation?.longitude;

export const placeSelectors = {
  currentLocation,
  hasLocation,
};
