export interface NotificationContent {
  orderId: string;
  userId: string;

}

export interface NotificationResponse {
  uuid: string;
  content: NotificationContent;
  created_at: string;
  isRead?: boolean;
}

export interface Notification extends NotificationContent {
  uuid: string;
  createdAt: string;
}
