import React from 'react';
import { useTranslation } from 'react-i18next';
import { Dimensions } from 'react-native';
import {
  Box, Colors, FontFamily, Images, Text,
} from 'themes';

const { width } = Dimensions.get('window');

const IMAGE_SIZE = width / 4;

interface EmptyStateProps {
  index: number;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ index }) => {
  const { t } = useTranslation();

  const size = !index ? 50 : IMAGE_SIZE;

  return (
    <Box f={1} ai="center" jc="center">
      <Images.EmptyState width={size} height={size} color={Colors.basic_100} />

      <Text mt={10} color={Colors.primary_500} fnw="500" ff={FontFamily.PoppinsMedium} ta="center">{t('home.empty-state-title')}</Text>

      <Text mt={10} color={Colors.primary_500} ta="center">{t('home.empty-state-description')}</Text>
    </Box>
  );
};
