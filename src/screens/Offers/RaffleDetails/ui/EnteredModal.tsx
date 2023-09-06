import { getBasicDateFormat, withDelay } from 'helpers';
import { Routes } from 'navigation';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { RouteService } from 'services';
import { Box, FontFamily, Text } from 'themes';
import { Modal, Button } from 'ui';

interface EnteredModalProps {
  isModalVisible: boolean;
  onModalClose: () => void;
  endDate?: string;
}

export const EnteredModal: React.FC<EnteredModalProps> = ({
  isModalVisible, onModalClose, endDate,
}) => {
  const { t } = useTranslation();

  const onMyWallet = async () => {
    onModalClose();

    await withDelay(100);

    RouteService.reset(Routes.BOTTOM_TAB_BAR_NAVIGATOR, {
      screen: Routes.MY_WALLET_NAVIGATOR,
    });
  };

  const onViewMoreRaffles = async () => {
    onModalClose();

    await withDelay(100);

    RouteService.reset(Routes.BOTTOM_TAB_BAR_NAVIGATOR, {
      screen: Routes.OFFERS_NAVIGATOR,
    });
  };

  return (
    <Modal
      isModalVisible={isModalVisible}
      onModalClose={onModalClose}
      onBackdropPress={onModalClose}
    >
      <Box>
        <Text mb={16} ta="center" fs={22} color={Colors.basic_800} ff={FontFamily.PoppinsMedium} fnw="500">{t('raffle-details.modal-title')}</Text>

        <Text fs={14} lh={24} mb={32} ta="center">{t('raffle-details.modal-description', { date: getBasicDateFormat(endDate) })}</Text>

        <Button title={t('buttons.my-wallet')} onPress={onMyWallet} />

        <Box mt={16} />

        <Button type="other" title={t('buttons.view-more-raffles')} onPress={onViewMoreRaffles} />
      </Box>
    </Modal>
  );
};
