/* eslint-disable @typescript-eslint/no-unused-vars */
import { AnyType, withDelay } from 'helpers';
import { Routes } from 'navigation/Routes';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RouteService, ToastService } from 'services';
import auth from '@react-native-firebase/auth';
import {
  Box, Colors, FontFamily, Text,
} from 'themes';
import { Button, Modal } from 'ui';
import { useTypedDispatch } from 'stores';
import { resetUser } from 'stores/user';

interface DeleteAccountModalProps {
  isModalVisible: boolean;
  onModalClose: () => void;
}

export const DeleteAccountModal: React.FC<DeleteAccountModalProps> = ({
  isModalVisible,
  onModalClose,
}) => {
  const [isLoading, setLoading] = useState(false);

  const { t } = useTranslation();
  const dispatch = useTypedDispatch();

  const onDeleteAccount = async () => {
    setLoading(true);

    try {
      const { currentUser } = auth();

      if (!currentUser?.uid) {
        return;
      }

      await auth().currentUser?.getIdToken(true);
      await currentUser?.delete();

      dispatch(resetUser());

      RouteService.navigate(Routes.HOME_NAVIGATOR);
    } catch (error: AnyType) {
      if (error.code === 'auth/requires-recent-login') {
        RouteService.reset(Routes.SIGN_IN);

        await auth().signOut();

        dispatch(resetUser());

        ToastService.onWarning({ title: t('errors.reauthenticate') });
      }
    } finally {
      setLoading(false);

      onModalClose();

      await withDelay(500);
    }
  };

  return (
    <Modal
      isModalVisible={isModalVisible}
      onModalClose={onModalClose}
      onBackdropPress={onModalClose}
    >
      <Box>
        <Text mb={16} ta="center" fs={22} color={Colors.basic_800} ff={FontFamily.PoppinsMedium} fnw="500">{t('delete-profile.title')}</Text>

        <Text fs={14} lh={24} mb={32} ta="center">{t('delete-profile.description')}</Text>

        <Button title={t('buttons.delete-my-account')} isLoading={isLoading} onPress={onDeleteAccount} />
      </Box>
    </Modal>
  );
};
