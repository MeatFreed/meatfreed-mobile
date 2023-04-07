import { touchableConfig } from 'helpers';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Box, Colors, Text } from 'themes';
import { Icon } from 'ui';

interface ActionButtonProps {
  iconName: string;
  label: string;
  onPress?: () => void;
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  iconName, label, onPress,
}) => (
  <Box mb={16}>
    <TouchableOpacity {...touchableConfig} onPress={onPress}>
      <Box fd="row" ai="center">
        <Icon name={iconName} size={24} color={Colors.tertiary} />

        <Text fnw="500" m={[2, 0, 0, 12]} color={Colors.primary_secondary}>{label}</Text>
      </Box>
    </TouchableOpacity>
  </Box>
);
