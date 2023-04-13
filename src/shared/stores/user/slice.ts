import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserReducer } from './types';

const initialState: UserReducer = {
  uid: '',
  firstName: '',
  lastName: '',
  email: '',
  referrer: '',
  referralsCount: 0,
  provider: '',
  photoURL: '',
};

const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (_, { payload }: PayloadAction<UserReducer>) => payload,
    setPhotoUrl: (state, action: PayloadAction<string>) => {
      state.photoURL = action.payload;
    },
    resetUser: () => initialState,
  },
});

export const {
  reducer: userReducer, actions: {
    setPhotoUrl,
    setUser,
    resetUser,
  },
} = user;
