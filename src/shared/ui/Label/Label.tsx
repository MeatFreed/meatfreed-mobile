import React from 'react';
import {
  Box, Text, FontSizes, FontFamily, Colors, Spaces,
} from 'themes';

interface LabelProps {
  label?: string;
  isError?: boolean;
  isWhiteLabel?: boolean
}

export const Label: React.FC<LabelProps> = ({
  label,
  isError,
  isWhiteLabel,
}) => {
  const defaultColor = isWhiteLabel ? Colors.basic_100 : Colors.basic_650;

  return (
    <Box fd="row" jc="space-between" w="100%">
      {!!label && (
        <Box fd="row">
          <Text
            ff={FontFamily.PoppinsMedium}
            fs={FontSizes.xs}
            mb={Spaces['2xs']}
            fnw="500"
            color={isError ? Colors.danger_500 : defaultColor}
          >
            {label}
          </Text>
        </Box>
      )}
    </Box>
  );
};
