import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box, Colors, FontFamily, Text,
} from 'themes';

export const RestaurantEmptyState: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Box f={1} ai="center" jc="center">
      <Text mt={32} fs={18} color={Colors.basic_800} fnw="500" ff={FontFamily.PoppinsMedium} ta="center">{t('restaurant-details.not-found')}</Text>

      <Text mt={4} color={Colors.basic_600} ta="center">{t('home.empty-state-description')}</Text>
    </Box>
  );
};
