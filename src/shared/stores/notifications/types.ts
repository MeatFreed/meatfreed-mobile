import { Notification } from 'api';

export interface NotificationsReducer {
  notifications: Notification[];
}

export interface NotificationsState {
  notifications: NotificationsReducer;
}
