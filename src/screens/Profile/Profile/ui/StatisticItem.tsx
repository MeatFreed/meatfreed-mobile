import React from 'react';
import {
  Box, Colors, Text, FontFamily, FontSizes,
} from 'themes';

interface StatisticItemProps {
  color: string;
  value?: number;
  title: string
}

export const StatisticItem: React.FC<StatisticItemProps> = ({ value = 0, title, color }) => (
  <Box ai="center" f={1}>
    <Text
      ff={FontFamily.RalewayBold}
      color={value ? color : Colors.basic_500}
      fs={FontSizes.xl}
      lh={30}
    >
      {value}
    </Text>

    <Text mt={4} fs={FontSizes.sm} color={Colors.basic_600} ta="center">{title}</Text>
  </Box>
);
