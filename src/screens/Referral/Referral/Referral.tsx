import { useAnalytics, useGetUserByUserId } from 'hooks';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTypedSelector } from 'stores';
import { userSelectors } from 'stores/user';
import Clipboard from '@react-native-clipboard/clipboard';
import QRCode from 'react-native-qrcode-svg';
import Share from 'react-native-share';
import {
  Box, Colors, FontFamily, FontSizes, Spaces, Text,
} from 'themes';
import { ActivityIndicator, StatusBar } from 'ui';
import { ScrollView } from 'react-native';
import { ToastService } from 'services';
import { EventTypes } from 'helpers';
import dayjs from 'dayjs';
import { Action } from './ui';

export const Referral: React.FC = () => {
  const { t } = useTranslation();

  const { onLogEvent } = useAnalytics();

  const userId = useTypedSelector(userSelectors.userId);

  const { user, link, isLoading } = useGetUserByUserId(userId);

  if (isLoading) {
    return <ActivityIndicator isVisible />;
  }

  const onClipboard = () => {
    if (!user) {
      return;
    }

    Clipboard.setString(user?.referrer);

    ToastService.onSuccess({ title: t('my-referral.clipboard'), position: 'bottom' });

    onLogEvent(EventTypes.REFERRAL_CODE_SHARED, {
      userId,
      referrerCode: user.referrer,
      event: EventTypes.REFERRAL_CODE_SHARED,
      createdAt: dayjs().valueOf(),
    });
  };

  const onShare = async (url: string) => {
    if (!url || !user?.referrer) {
      return;
    }

    try {
      const response = await Share.open({
        title: 'MeatFreed',
        message: t('my-referral.share'),
        url,
        failOnCancel: false,
      });

      if (response.success) {
        onLogEvent(EventTypes.REFERRAL_LINK_SHARED, {
          userId,
          link,
          referrerCode: user.referrer,
          event: EventTypes.REFERRAL_LINK_SHARED,
          createdAt: dayjs().valueOf(),
        });
      }
    } catch (error) {
      /** empty */
    }
  };

  return (
    <ScrollView
      style={{ backgroundColor: Colors.white }}
      contentContainerStyle={{ flex: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <Box f={1} wdbg wdp>
        <StatusBar />

        <Text ta="center" fs={FontSizes['4xl']} fnw="600" color={Colors.purple}>{t('my-referral.members', { count: user?.referralsCount || 0 })}</Text>

        <Text ta="center" fs={20} fnw="500" color={Colors.purple} mb={Spaces.xl}>{t('my-referral.registered')}</Text>

        {link && (
          <Box ai="center">
            <Text fnw="500" ff={FontFamily.PoppinsMedium} ta="center" color={Colors.basic_700} mb={20}>{t('my-referral.scan')}</Text>

            <QRCode size={120} value={link} />
          </Box>
        )}

        {user?.referrer && (
          <Action
            value={user.referrer}
            label={t('my-referral.code').toUpperCase()}
            iconName="copy-outline"
            buttonTitle={t('buttons.copy')}
            onPress={onClipboard}
          />
        )}

        {link && (
          <Action
            value={link}
            label={t('my-referral.link').toUpperCase()}
            iconName="share-outline"
            buttonTitle={t('buttons.refer')}
            onPress={() => onShare(link)}
          />
        )}
      </Box>
    </ScrollView>
  );
};
