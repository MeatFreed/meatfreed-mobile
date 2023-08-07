import React from 'react';
import { useTranslation } from 'react-i18next';
import { Dimensions } from 'react-native';
import {
  Box, Colors, FontFamily, Images, Text,
} from 'themes';

const { width } = Dimensions.get('window');

const IMAGE_SIZE = width / 3;

export const FavoriteEmptyState: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Box f={1} mt={width / 2} ai="center" jc="center">
      <Images.EmptyState width={IMAGE_SIZE} height={IMAGE_SIZE} color={Colors.basic_150} />

      <Text mt={16} fs={18} color={Colors.basic_800} fnw="500" ff={FontFamily.PoppinsMedium} ta="center">{t('restaurant-details.not-found')}</Text>
    </Box>
  );
};
