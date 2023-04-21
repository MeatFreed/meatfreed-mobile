import React from 'react';
import {
  Box, Colors, FontFamily, Text,
} from 'themes';
import { Button } from 'ui';

interface ActionProps {
  iconName: string;
  value: string;
  label: string;
  buttonTitle: string;
  onPress?: () => void;
}

export const Action: React.FC<ActionProps> = ({
  iconName, value, label, buttonTitle, onPress,
}) => (
  <Box mt={20}>
    <Text ta="center" fnw="500" ff={FontFamily.PoppinsMedium}>{label}</Text>

    <Box m={[8, 0]} h="40px" ai="center" jc="center">
      <Text ttd="underline" ttds="solid" ttdc={Colors.basic_600} ta="center" color={Colors.basic_600}>{value}</Text>
    </Box>

    <Button title={buttonTitle} iconName={iconName} onPress={onPress} />
  </Box>
);
