import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box, Colors, FontFamily, Text,
} from 'themes';

interface VoucherTitleProps {
  title?: string;
}

export const VoucherTitle: React.FC<VoucherTitleProps> = ({ title = '' }) => {
  const { t } = useTranslation();

  return (
    <Box p={[16, 16, 0]}>
      <Text fs={20} color={Colors.basic_800} fnw="700" ff={FontFamily.PoppinsBold}>{title}</Text>

      <Text mt={10} fs={13} fnw="500" ff={FontFamily.PoppinsMedium} color={Colors.basic_600}>
        {t('offers.can-redeemed-once')}
      </Text>
    </Box>
  );
};
