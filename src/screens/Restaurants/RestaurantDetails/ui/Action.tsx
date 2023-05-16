import { touchableConfig } from 'helpers';
import React from 'react';
import styled from 'styled-components/native';
import {
  Box, Colors, FontFamily, Text,
} from 'themes';
import { Icon } from 'ui';

interface ActionProps {
  iconName: string;
  label: string;
  isPrimaryColor?: boolean;
  onPress?: () => void;
}

const StyledButton = styled.TouchableOpacity`
  padding: 16px 16px 0px;
`;

export const Action: React.FC<ActionProps> = ({
  label,
  onPress,
  iconName,
  isPrimaryColor = false,
}) => (
  <StyledButton {...touchableConfig} onPress={onPress}>
    <Box fd="row" ai="center">
      <Icon name={iconName} size={20} color={Colors.primary_500} />

      <Box f={1}>
        <Text ml={12} fnw="500" ff={FontFamily.PoppinsMedium} color={isPrimaryColor ? Colors.primary_500 : Colors.basic_800}>{label}</Text>
      </Box>
    </Box>

    <Box mt={16} w="100%" h="1px" bgc={Colors.basic_400} />
  </StyledButton>
);
