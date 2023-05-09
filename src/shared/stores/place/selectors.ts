import { PlaceState } from './types';

const all = (state: PlaceState) => state.place;

const currentLocation = (state: PlaceState) => all(state).location;

const selectLocation = (state: PlaceState) => all(state).selectLocation;

const hasLocation = (state: PlaceState) => !!all(state).location?.latitude
                                      && !!all(state).location?.longitude;

const delta = (state: PlaceState) => all(state).delta;

export const placeSelectors = {
  currentLocation,
  hasLocation,
  delta,
  selectLocation,
};
