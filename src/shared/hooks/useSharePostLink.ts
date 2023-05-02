import Config from 'react-native-config';
import {
  AnyType, generateShareLink, isIOS, withDelay,
} from 'helpers';
import Share from 'react-native-share';
import { ToastService } from 'services/ToastService/ToastService';
import { useTranslation } from 'react-i18next';

const { FIREBASE_POST_URL } = Config as AnyType;

export const useSharePostLink = () => {
  const { t } = useTranslation();

  const onShareLink = async (contentId: string, message: string) => {
    try {
      const link = await generateShareLink(FIREBASE_POST_URL, 'contentId', contentId);

      await withDelay(isIOS ? 7500 : 1000);

      await Share.open({
        title: 'MeatFreed',
        message,
        url: link,
        failOnCancel: false,
      });
    } catch (error: AnyType) {
      ToastService.onDanger({ title: error?.message || t('errors.server-unable') });
    }
  };

  return {
    onShareLink,
  };
};
