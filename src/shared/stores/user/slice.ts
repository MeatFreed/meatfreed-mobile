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
};

const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, { payload }: PayloadAction<UserReducer>) => {
      state.uid = payload.uid;
    },
    resetUser: () => initialState,
  },
});

export const {
  reducer: userReducer, actions: {
    setUser,
    resetUser,
  },
} = user;
