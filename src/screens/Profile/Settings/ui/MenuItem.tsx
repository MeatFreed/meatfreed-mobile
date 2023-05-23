import { AnyType, touchableConfig } from 'helpers';
import styled from 'styled-components/native';
import React from 'react';
import {
  Box, Colors, Text, FontFamily,
} from 'themes';
import { Icon as IconComponent } from 'ui';
import { Dimensions } from 'react-native';

const StyledButton = styled.TouchableOpacity`
  align-items: center;
  background-color: ${Colors.basic_100};
  height: 56px;
`;

interface MenuItemProps {
  title: string;
  Icon: AnyType;
  onPress?: () => void
  hasLine?: boolean;
}

const { width } = Dimensions.get('window');

export const MenuItem: React.FC<MenuItemProps> = ({
  title, onPress, Icon, hasLine = true,
}) => (
  <StyledButton {...touchableConfig} onPress={onPress}>
    <Box w={`${width - 32}px`} m={[0, 16]} h="56px" f={1} fd="row" ai="center">
      <Box f={1} mt={-2} fd="row" ai="center">
        {Icon || null}

        <Text ml={12} fnw="500" ff={FontFamily.PoppinsSemiMedium} fs={16}>
          {title}
        </Text>
      </Box>

      <IconComponent name="chevron-right" size={24} color={Colors.basic_600} />
    </Box>

    {hasLine && (
      <Box w={`${width - 24}px`} h="1px" bgc={Colors.basic_400} />
    )}
  </StyledButton>
);
