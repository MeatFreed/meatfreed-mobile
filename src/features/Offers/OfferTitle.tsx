import { OfferType } from 'api';
import { getBasicDateFormat } from 'helpers';
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box, Colors, FontFamily, HorizontalDivider, Text,
} from 'themes';

interface OfferTitleProps {
  title: string;
  endDate: string;
  type: OfferType;
}

export const OfferTitle: React.FC<OfferTitleProps> = ({ title, endDate, type }) => {
  const { t } = useTranslation();

  const isVoucher = type === OfferType.VOUCHER;

  return (
    <Box p={[16, 16, 0]}>
      <Text fs={20} color={Colors.basic_800} fnw="700" ff={FontFamily.PoppinsBold}>{title}</Text>

      <Text mt={10} fs={13} fnw="500" ff={FontFamily.PoppinsMedium} color={Colors.basic_600}>
        {isVoucher ? t('offers.can-redeemed-once') : t('offers.draw-closes-in', { date: getBasicDateFormat(endDate) })}
      </Text>

      <HorizontalDivider />
    </Box>
  );
};
