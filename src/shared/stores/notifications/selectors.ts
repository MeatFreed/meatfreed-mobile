import { NotificationsState } from './types';

const data = (state: NotificationsState) => state.notifications;

const notifications = (state: NotificationsState) => data(state).notifications;

export const notificationsSelectors = {
  notifications,
};
