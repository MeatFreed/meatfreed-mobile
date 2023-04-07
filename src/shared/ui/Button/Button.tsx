/* eslint-disable no-nested-ternary */
import React from 'react';
import styled from 'styled-components/native';
import { touchableConfig } from 'helpers';
import { Colors, shadow } from 'themes';
import { Icon as IconComponent } from '../Icon/Icon';

interface ButtonProps {
  onPress?: () => void;
  onLongPress?: () => void;
  title?: string;
  isLoading?: boolean;
  disabled?: boolean;
  Icon?: React.ReactNode;
  iconName?: string;
  iconColor?: string;
  type?: 'label' | 'default' | 'secondary' | 'icon' | 'action' | 'border' | 'danger' | 'header';
  reversed?: boolean;
  shadowed?: boolean;
  accent?: boolean;
}

const ActionButton = styled.TouchableOpacity`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  align-items: center;
  justify-content: center;
  background-color: ${Colors.white};
  ${{ shadow }};
`;

export const Button: React.FC<ButtonProps> = ({
  onPress, iconColor, iconName,
}) => (
  <ActionButton {...touchableConfig} onPress={onPress}>
    {iconName && (
    <IconComponent
      name={iconName}
      size={24}
      color={iconColor || Colors.basic_800}
    />
    )}
  </ActionButton>
);
