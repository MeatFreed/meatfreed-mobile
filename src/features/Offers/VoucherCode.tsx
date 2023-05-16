import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box, Colors, FontFamily, Text,
} from 'themes';

interface VoucherCodeProps {
  code: string;
}

export const VoucherCode: React.FC<VoucherCodeProps> = ({ code }) => {
  const { t } = useTranslation();

  return (
    <Box m={[10, 16, 0]} p={[16]} h="90px" ai="center" jc="center" br="16px" bgc={Colors.primary_100}>
      <Text lh={32} fs={24} fnw="500" ff={FontFamily.PoppinsSemiMedium} color={Colors.primary_500}>{code}</Text>

      <Text mt={8} fnw="500" ff={FontFamily.PoppinsMedium} color={Colors.primary_500}>{t('offers.show-code')}</Text>
    </Box>
  );
};
