import React from 'react';
import {
  Box, Text, FontSizes, FontFamily, Colors, Spaces,
} from 'themes';

interface LabelProps {
  label?: string;
  isError?: boolean;
}

export const Label: React.FC<LabelProps> = ({
  label,
  isError,
}) => (
  <Box fd="row" jc="space-between" w="100%">
    {!!label && (
      <Box fd="row">
        <Text
          ff={FontFamily.PoppinsMedium}
          fs={FontSizes.xs}
          mb={Spaces['2xs']}
          fnw="500"
          color={isError ? Colors.danger_500 : Colors.basic_600}
        >
          {label}
        </Text>

      </Box>
    )}
  </Box>
);
