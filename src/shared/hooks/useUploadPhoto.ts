/* eslint-disable @typescript-eslint/no-unused-vars */
import firestore from '@react-native-firebase/firestore';
import { useState } from 'react';
import { userSelectors, setPhotoUrl } from 'stores/user';
import { useTypedSelector, useTypedDispatch } from 'stores';
import { ImagePickerService, ToastService } from 'services';
import storage from '@react-native-firebase/storage';
import { t } from 'i18next';
import { AnyType, uuid } from 'helpers';

export const useUploadPhoto = () => {
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useTypedDispatch();

  const userId = useTypedSelector(userSelectors.userId);

  const onUploadPhoto = async () => {
    try {
      const params = await ImagePickerService.launchSingleImage();

      setIsLoading(true);

      if (params?.uri) {
        const ref = storage().ref(`users/${uuid()}`);

        await ref.putFile(params.uri);

        const photoURL = await ref.getDownloadURL();

        await firestore().collection('users').doc(userId).update({
          photoURL,
        });

        dispatch(setPhotoUrl(photoURL));
      }
    } catch (error: AnyType) {
      if (error?.code !== 'E_PICKER_CANCELLED') {
        ToastService.onDanger({ title: t('errors.server-unable') });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    onUploadPhoto,
    isLoading,
  };
};
