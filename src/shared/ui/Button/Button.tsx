/* eslint-disable no-nested-ternary */
import React from 'react';
import styled from 'styled-components/native';
import { touchableConfig } from 'helpers';
import {
  Colors, FontFamily, FontSizes, Spaces, shadow,
} from 'themes';
import { Loader } from 'ui';
import { StyleSheet } from 'react-native';
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

const constructColor = (
  reversed?: boolean,
) => (reversed ? Colors.purple : Colors.white);

const constructBackgroundColor = (
  isLoading?: boolean,
  disabled?: boolean,
  reversed?: boolean,
) => {
  const defaultColor = reversed ? Colors.white : Colors.purple;

  const loadingColor = reversed ? Colors.white : Colors.primary_light;

  return isLoading || disabled ? loadingColor : defaultColor;
};

const StyledButton = styled.TouchableOpacity<{isLoading?: boolean, disabled?: boolean, reversed?: boolean}>`
  background-color: ${({ isLoading, disabled, reversed }) => constructBackgroundColor(isLoading, disabled, reversed)};
  height: 48px;
  border-radius: 12px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const StyledButtonText = styled.Text<{isLoading?: boolean, disabled?: boolean, reversed?: boolean}>`
  font-size: ${FontSizes.md}px;
  font-family: ${FontFamily.Bold};
  font-weight: 700;
  color: ${({ reversed }) => constructColor(reversed)};
`;

const ActionButton = styled.TouchableOpacity`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  align-items: center;
  justify-content: center;
  background-color: ${Colors.white};
  ${{ shadow }};
`;

const BorderButtonText = styled.Text<{ reversed?: boolean }>`
  color: ${Colors.purple};
  font-size: ${FontSizes.md}px;
  font-family: ${FontFamily.Medium};
  margin: 0px 6px;
`;

const BorderStyledButton = styled(StyledButton)<{ reversed?: boolean }>`
  height: 48px;
  padding: 0px 10px;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  border: 2px solid ${Colors.purple};
  background-color: transparent;
`;

const styles = StyleSheet.create({
  icon: {
    marginLeft: Spaces.sm,
  },
});

export const Button: React.FC<ButtonProps> = ({
  type = 'default', title, isLoading, onPress, onLongPress, iconColor, reversed, disabled, iconName,
}) => {
  if (type === 'action') {
    return (
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
  }

  if (type === 'border') {
    return (
      <BorderStyledButton
        reversed={reversed}
        {...touchableConfig}
        onPress={onPress}
      >
        <BorderButtonText reversed={reversed}>{title}</BorderButtonText>
      </BorderStyledButton>
    );
  }

  return (
    <StyledButton
      {...touchableConfig}
      onPress={onPress}
      onLongPress={onLongPress}
      disabled={isLoading || disabled}
    >
      {isLoading ? (
        <Loader color={Colors.white} />
      ) : (
        <>
          <StyledButtonText isLoading={isLoading} disabled={disabled}>
            {title}
          </StyledButtonText>

          {iconName && (
            <IconComponent
              name={iconName}
              size={24}
              color={iconColor || Colors.basic_100}
              style={styles.icon}
            />
          )}
        </>
      )}
    </StyledButton>
  );
};
