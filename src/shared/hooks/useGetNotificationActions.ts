import firestore from '@react-native-firebase/firestore';

const notificationCollection = firestore().collection('notifications_storyblock');

export const useGetNotificationActions = () => {
  const onReadNotification = async (uuid: string) => {
    try {
      await notificationCollection.doc(uuid).update({
        isRead: true,
      });
    } catch (error) { /** empty */ }
  };

  return {
    onReadNotification,
  };
};
