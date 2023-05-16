import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GeoPosition } from 'react-native-geolocation-service';
import { resetUser } from 'stores/user';
import { isIOS } from 'helpers';
import { LatLng } from 'react-native-maps';
import { PlaceReducer, Delta } from './types';

const initialState: PlaceReducer = {
  location: null,
  selectLocation: null,
  delta: {
    latitudeDelta: isIOS ? 0.1 : 0.2,
    longitudeDelta: isIOS ? 0.1 : 0.2,
  },
};

const place = createSlice({
  name: 'place',
  initialState,
  reducers: {
    setCurrentLocation: (state, { payload }: PayloadAction<GeoPosition>) => {
      state.location = {
        latitude: payload?.coords?.latitude,
        longitude: payload?.coords?.longitude,
      };
    },
    setSelectLocation: (state, { payload }: PayloadAction<LatLng | null>) => {
      state.selectLocation = payload;
    },
    setLocationDelta: (state, { payload }: PayloadAction<Delta>) => {
      state.delta = payload;
    },
    onChangeRegion: (state, {
      payload,
    }: PayloadAction<{ selectLocation: LatLng | null, delta: Delta }>) => {
      state.selectLocation = payload.selectLocation;
      state.delta = payload.delta;
    },
    resetPlaceState: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(resetUser, () => initialState);
  },
});

export const {
  reducer: placeReducer,
  actions: {
    setCurrentLocation, resetPlaceState, setLocationDelta, onChangeRegion, setSelectLocation,
  },
} = place;
