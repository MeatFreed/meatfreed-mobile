import React from 'react';
import {
  Box, Colors, FontFamily, Text,
} from 'themes';

interface VoucherTitleProps {
  title?: string;
  subtitle?: string;
}

export const VoucherTitle: React.FC<VoucherTitleProps> = ({ title = '', subtitle }) => (
  <Box p={[16, 16, 0]}>
    <Text fs={20} color={Colors.basic_800} fnw="700" ff={FontFamily.PoppinsBold}>{title}</Text>

    {!!subtitle && (
      <Text mt={10} fs={13} fnw="500" ff={FontFamily.PoppinsMedium} color={Colors.basic_600}>
        {subtitle}
      </Text>
    )}
  </Box>
);
