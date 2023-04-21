import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Linking } from 'react-native';
import {
  Box, Colors, FontFamily, Text,
} from 'themes';

export const Policy: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Box m={[32, 0]}>
      <Trans
        i18nKey="authorization.agree"
        parent={Text}
        ta="center"
        ff={FontFamily.PoppinsRegular}
        color={Colors.purple}
        values={{
          terms: t('authorization.terms'),
          policy: t('authorization.policy'),
        }}
        components={[
          <Text
            ff={FontFamily.PoppinsMedium}
            color={Colors.purple}
            ttd="underline"
            ttds="solid"
            ttdc={Colors.purple}
            onPress={() => Linking.openURL(
              'https://www.meatfreed.com/termsandconditions/',
            )}
          />,
          <Text
            ff={FontFamily.PoppinsMedium}
            color={Colors.purple}
            ttd="underline"
            ttds="solid"
            ttdc={Colors.purple}
            onPress={() => Linking.openURL(
              'https://www.meatfreed.com/privacypolicy/',
            )}
          />,
        ]}
      />
    </Box>
  );
};
