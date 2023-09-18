import { resetUser } from 'stores/user';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Notification } from 'api';
import { NotificationsReducer } from './types';

const initialState: NotificationsReducer = {
  notifications: [],
};

const notifications = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setNotifications: (state, { payload }: PayloadAction<Notification[]>) => {
      state.notifications = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(resetUser, () => initialState);
  },
});

export const {
  reducer: notificationsReducer,
  actions: { setNotifications },
} = notifications;
