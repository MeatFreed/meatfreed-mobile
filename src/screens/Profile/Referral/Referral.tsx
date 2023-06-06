import { useAnalytics } from 'hooks';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTypedSelector } from 'stores';
import { userSelectors } from 'stores/user';
import Clipboard from '@react-native-clipboard/clipboard';
import QRCode from 'react-native-qrcode-svg';
import Share from 'react-native-share';
import {
  Box, Colors, FontFamily, Images, Text,
} from 'themes';
import { StatusBar } from 'ui';
import { ScrollView } from 'react-native';
import { ToastService } from 'services';
import { EventTypes } from 'helpers';
import dayjs from 'dayjs';
import { Action, Code } from './ui';

export const Referral: React.FC = () => {
  const { t } = useTranslation();

  const { onLogEvent } = useAnalytics();

  const user = useTypedSelector(userSelectors.user);
  const referralLink = useTypedSelector(userSelectors.referralLink);

  const onClipboard = () => {
    if (!user) {
      return;
    }

    Clipboard.setString(user?.referrer);

    ToastService.onSuccess({ title: t('referral.clipboard'), position: 'bottom' });

    onLogEvent(EventTypes.REFERRAL_CODE_SHARED, {
      userId: user?.uid,
      referrerCode: user.referrer,
      event: EventTypes.REFERRAL_CODE_SHARED,
      createdAt: dayjs().valueOf(),
    });
  };

  const onShare = async (url: string | null) => {
    if (!url || !user?.referrer) {
      return;
    }

    try {
      const response = await Share.open({
        title: 'MeatFreed',
        message: `${t('referral.share', { code: user.referrer })}`,
        url,
        failOnCancel: false,
      });

      if (response.success) {
        onLogEvent(EventTypes.REFERRAL_LINK_SHARED, {
          userId: user.uid,
          link: url,
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
      <Box f={1} bgc={Colors.basic_150} wdp>
        <StatusBar />

        <Box wdp bgc={Colors.basic_100} br="8px">
          {referralLink && (
            <Box ai="center">
              <Text fnw="500" ff={FontFamily.PoppinsMedium} ta="center" color={Colors.basic_700} mb={20}>{t('referral.qr-code')}</Text>

              <QRCode size={150} value={referralLink} />
            </Box>
          )}
        </Box>

        <Text ta="center" fnw="500" ff={FontFamily.PoppinsMedium} m={[16, 0]}>{t('referral.other-methods')}</Text>

        {user?.referrer && (
          <Code code={user?.referrer} />
        )}

        <Action
          Icon={<Images.Copy />}
          title={t('buttons.copy-code')}
          onPress={onClipboard}
        />

        <Action
          Icon={<Images.Share />}
          title={t('buttons.invite-link')}
          onPress={() => onShare(referralLink)}
        />
      </Box>
    </ScrollView>
  );
};
