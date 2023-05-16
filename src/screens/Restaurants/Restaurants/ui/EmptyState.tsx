import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box, Colors, FontFamily, Text,
} from 'themes';

export const EmptyState: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Box f={1} ai="center" jc="center">
      <Text mt={16} color={Colors.primary_500} fnw="500" ff={FontFamily.PoppinsMedium} ta="center">{t('home.empty-state-title')}</Text>

      <Text mt={4} color={Colors.primary_500} ta="center">{t('home.empty-state-description')}</Text>
    </Box>
  );
};
