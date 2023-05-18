import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box, Colors, FontFamily, Text,
} from 'themes';

interface CodeProps {
  code: string;
}

export const Code: React.FC<CodeProps> = ({ code }) => {
  const { t } = useTranslation();

  return (
    <Box p={[16]} h="90px" ai="center" jc="center" br="16px" bgc={Colors.primary_100}>
      <Text lh={32} fs={24} fnw="500" ff={FontFamily.PoppinsSemiMedium} color={Colors.primary_500}>{code}</Text>

      <Text mt={8} fnw="500" ff={FontFamily.PoppinsMedium} color={Colors.primary_500}>{t('referral.code')}</Text>
    </Box>
  );
};
