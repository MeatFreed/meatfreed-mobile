import { resetUser } from 'stores/user';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { SettingsReducer } from './types';

const initialState: SettingsReducer = {
  totalMilesConvertedToMeters: 24140,
};

const settings = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setSettings: (state, { payload }: PayloadAction<number>) => {
      state.totalMilesConvertedToMeters = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(resetUser, () => initialState);
  },
});

export const {
  reducer: settingsReducer,
  actions: { setSettings },
} = settings;
