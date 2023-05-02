import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GeoPosition } from 'react-native-geolocation-service';
import { PlaceReducer } from './types';

const initialState: PlaceReducer = {
  currentLocation: null,
};

const place = createSlice({
  name: 'place',
  initialState,
  reducers: {
    setCurrentLocation: (state, { payload }: PayloadAction<GeoPosition>) => {
      state.currentLocation = {
        latitude: payload?.coords?.latitude,
        longitude: payload?.coords?.longitude,
      };
    },
    resetPlaceState: () => initialState,
  },
});

export const {
  reducer: placeReducer,
  actions: { setCurrentLocation, resetPlaceState },
} = place;
