import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box, Colors, FontFamily, Text,
} from 'themes';

interface OfferDescriptionProps {
  description: string;
}

export const OfferDescription: React.FC<OfferDescriptionProps> = ({ description }) => {
  const { t } = useTranslation();

  return (
    <Box p={[0, 16]}>
      <Text fs={16} color={Colors.basic_800} fnw="500" ff={FontFamily.PoppinsMedium}>{t('offers.about-offer')}</Text>

      <Text mt={10} fs={16} fnw="500" ff={FontFamily.PoppinsMedium} color={Colors.basic_600}>{description}</Text>
    </Box>
  );
};
