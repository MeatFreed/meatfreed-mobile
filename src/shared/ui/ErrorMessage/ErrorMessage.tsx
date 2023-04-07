import React from 'react';
import {
  Colors, FontSizes, Spaces, Text,
} from 'themes';

interface ErrorMessageProps {
  accent?: boolean;
  error?: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  accent,
  error = '',
}) => (
  <Text
    mt={Spaces['2xs']}
    fs={FontSizes.xs}
    color={accent ? Colors.white : Colors.danger_500}
  >
    {error}
  </Text>
);
