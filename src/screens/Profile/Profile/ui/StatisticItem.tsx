import React from 'react';
import { Dimensions } from 'react-native';
import {
  Box, Text, FontFamily, FontSizes,
} from 'themes';

interface StatisticItemProps {
  color: string;
  value?: number;
  title: string
  bgc: string;
}

const { width } = Dimensions.get('window');

const ITEM_WIDTH = (width - 42) / 2;

export const StatisticItem: React.FC<StatisticItemProps> = ({
  value = 0, title, color, bgc,
}) => (
  <Box ai="center" jc="center" br="16px" w={`${ITEM_WIDTH}px`} h="120px" bgc={bgc}>
    <Text
      ff={FontFamily.PoppinsBold}
      color={color}
      fs={40}
      lh={50}
    >
      {value}
    </Text>

    <Text mt={-4} fs={FontSizes.sm} color={color} ta="center">{title}</Text>
  </Box>
);
