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
  referralLink: '',
};

const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (_, { payload }: PayloadAction<UserReducer>) => payload,
    setPhotoUrl: (state, { payload }: PayloadAction<string>) => {
      state.photoURL = payload;
    },
    setReferralLink: (state, { payload }: PayloadAction<string>) => {
      state.referralLink = payload;
    },
    resetUser: () => initialState,
  },
});

export const {
  reducer: userReducer, actions: {
    setPhotoUrl,
    setUser,
    resetUser,
    setReferralLink,
  },
} = user;
