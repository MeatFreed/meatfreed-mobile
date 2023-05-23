import { PreferenceStatus } from 'api';
import { useGetPreferencesQuery, useUpdatePreferenceMutation } from 'api/preferences/preferencesApi';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AnyType } from 'helpers';
import Courier from '@trycourier/courier-react-native';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ToastService } from 'services';
import { useTypedSelector } from 'stores';
import { userSelectors } from 'stores/user';
import {
  Box, Colors, FontFamily, FontSizes, Spaces, Text,
} from 'themes';
import { InfoBlock, Switch } from 'ui';
import { useIsFocused } from '@react-navigation/native';
import { useAppStateEvent } from '@lumitech/mobile-hooks';

const { OPTED_IN, OPTED_OUT } = PreferenceStatus;

export const Notifications: React.FC = () => {
  const { t } = useTranslation();

  const [hasPermission, setPermission] = useState(false);

  const isFocused = useIsFocused();

  const userId = useTypedSelector(userSelectors.userId);

  const { data: preferences } = useGetPreferencesQuery(userId);

  const [updatePreference] = useUpdatePreferenceMutation();

  const onUpdatePreference = async (topicId: string, isEnabled: boolean) => {
    const status = isEnabled ? OPTED_IN : OPTED_OUT;

    try {
      await updatePreference({ topicId, userId, status }).unwrap();
    } catch (error: AnyType) {
      ToastService.onDanger({ title: error?.message || t('errors.server-unable') });
    }
  };

  const checkPermission = async () => {
    const status = await Courier.notificationPermissionStatus;

    setPermission(status === 'authorized');
  };

  useAppStateEvent({
    onForeground: checkPermission,
  });

  useEffect(() => {
    if (isFocused) {
      checkPermission();
    }
  }, [isFocused]);

  if (!preferences?.length) {
    return null;
  }

  return (
    <Box mb={Spaces.md}>
      <Text m={[0, Spaces.md, Spaces.md]} fs={FontSizes.lg} fnw="700" ff={FontFamily.PoppinsMedium}>{t('settings.notifications')}</Text>

      <Box p={[0, 16]} bgc={Colors.basic_100}>
        {!hasPermission && (
          <Box m={[16, 0]}>
            <InfoBlock iconName="bell-outline" type="warning" title={t('notifications.warning')} />
          </Box>
        )}

        {preferences?.map((preference) => (
          <Switch
            key={preference.topic_id}
            title={preference.topic_name}
            value={preference.status === OPTED_IN}
            onValueChange={(isEnabled) => onUpdatePreference(preference.topic_id, isEnabled)}
          />
        ))}
      </Box>
    </Box>
  );
};
