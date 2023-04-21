import { AnyType, touchableConfig } from 'helpers';
import styled from 'styled-components/native';
import React from 'react';
import {
  Box, Colors, Text, FontFamily,
} from 'themes';
import { Dimensions } from 'react-native';
import { Icon } from 'ui';

const { width } = Dimensions.get('window');

const StyledButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0px 12px;
  height: 56px;
  width: ${width - 32}px;
  margin: 16px 16px 0px;
  border-radius: 8px;
  background-color: ${Colors.basic_100};
  border: 1px solid ${Colors.basic_300};
`;

interface MenuItemProps {
  title: string;
  iconName: AnyType;
  onPress?: () => void
}

export const MenuItem: React.FC<MenuItemProps> = ({
  title, onPress, iconName,
}) => (
  <StyledButton {...touchableConfig} onPress={onPress}>
    <Box f={1} mt={-2} fd="row" ai="center">
      {iconName && <Icon name={iconName} size={24} color={Colors.basic_600} />}

      <Text
        ff={FontFamily.PoppinsBold}
        ml={12}
        fnw="700"
        fs={14}
      >
        {title}
      </Text>

    </Box>

    <Icon name="arrow-forward" size={24} color={Colors.basic_600} />
  </StyledButton>
);
