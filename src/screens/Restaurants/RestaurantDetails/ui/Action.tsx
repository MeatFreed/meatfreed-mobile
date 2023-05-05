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
  onPress?: () => void;
}

const StyledButton = styled.TouchableOpacity`
  padding: 16px 16px 0px;
`;

export const Action: React.FC<ActionProps> = ({ label, onPress, iconName }) => (
  <StyledButton {...touchableConfig} onPress={onPress}>
    <Box fd="row" ai="center">
      <Icon name={iconName} size={20} color={Colors.primary_500} />

      <Box f={1}>
        <Text m={[0, 12]} fnw="500" ff={FontFamily.PoppinsMedium} color={Colors.basic_800}>{label}</Text>
      </Box>
    </Box>

    <Box mt={16} w="100%" h="1px" bgc={Colors.basic_400} />
  </StyledButton>
);
