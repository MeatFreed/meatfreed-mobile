import React from 'react';
import { useTranslation } from 'react-i18next';
import { Dimensions } from 'react-native';
import {
  Box, Colors, FontFamily, Images, Text,
} from 'themes';

const { width } = Dimensions.get('window');

const IMAGE_SIZE = width / 3;

export const EmptyState: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Box f={1} wdbg ai="center" jc="center">
      <Images.EmptyState width={IMAGE_SIZE} height={IMAGE_SIZE} color={Colors.basic_100} />

      <Text mt={10} color={Colors.primary_500} fnw="500" ff={FontFamily.PoppinsMedium} ta="center">{t('posts.empty-state')}</Text>
    </Box>
  );
};
