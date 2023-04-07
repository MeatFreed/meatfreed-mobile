import React from 'react';
import {
  Box, Text, FontSizes, FontFamily, Colors, Spaces,
} from 'themes';

interface LabelProps {
  label?: string;
  isImportant?: boolean;
  isError?: boolean;
  description?: string;
}

export const Label: React.FC<LabelProps> = ({
  label,
  isImportant,
  description,
  isError,
}) => (
  <Box fd="row" jc="space-between" w="100%">
    {!!label && (
      <Box fd="row">
        <Text
          ff={FontFamily.Regular}
          fs={FontSizes.xs}
          mb={Spaces['2xs']}
          color={isError ? Colors.danger_500 : Colors.basic_600}
        >
          {label}
        </Text>

        {isImportant && (
          <Text
            ff={FontFamily.Regular}
            fs={FontSizes.sm}
            mb={Spaces['2xs']}
            color={Colors.danger_500}
          >
            {' *'}
          </Text>
        )}
      </Box>
    )}

    {!!description && (
      <Text
        ff={FontFamily.Regular}
        fs={FontSizes.xs}
        mb={Spaces['2xs']}
        color={Colors.basic_500}
      >
        {description}

      </Text>
    )}
  </Box>
);
