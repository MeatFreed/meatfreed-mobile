import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GeoPosition } from 'react-native-geolocation-service';
import { PlaceReducer } from './types';

const initialState: PlaceReducer = {
  currentLocation: {
    latitude: 50.1632921,
    longitude: -5.128192,
  },
};

const place = createSlice({
  name: 'place',
  initialState,
  reducers: {
    setCurrentLocation: (state, { payload }: PayloadAction<GeoPosition>) => {
      state.currentLocation = {
        latitude: payload?.coords?.latitude || 50.1632921,
        longitude: payload?.coords?.longitude || -5.128192,
      };
    },
    resetPlaceState: () => initialState,
  },
});

export const {
  reducer: placeReducer,
  actions: { setCurrentLocation, resetPlaceState },
} = place;
