import React from 'react';
import { Box, Colors, Text } from 'themes';

interface PriceLevelProps {
  level: number;
}

export const PriceLevel: React.FC<PriceLevelProps> = ({ level }) => (
  <Box ml={12} br="20px" p={[2, 8]} fd="row" bgc={Colors.primary_50}>
    {Array.from(Array(3).keys()).map((item) => (
      <Text fs={13} color={level >= item + 1 ? Colors.primary_600 : Colors.primary_200}>$</Text>
    ))}
  </Box>
);
