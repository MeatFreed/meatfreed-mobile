import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { NotificationResponse } from './models';

export const adaptNotifications = (
  snapshot: FirebaseFirestoreTypes.QuerySnapshot<FirebaseFirestoreTypes.DocumentData>,
) => {
  const notifications = snapshot.docs.map((doc) => doc.data()) as NotificationResponse[];

  const adaptNotifications = notifications.map((notification) => ({
    uuid: notification.uuid,
    createdAt: notification.created_at,
    userId: notification.content.userId,
    orderId: notification.content.orderId,
    isRead: notification?.isRead || false,
  }));

  return adaptNotifications.filter((notification) => !notification.isRead);
};
