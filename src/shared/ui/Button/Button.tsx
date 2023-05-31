/* eslint-disable no-nested-ternary */
import React from 'react';
import styled from 'styled-components/native';
import { touchableConfig } from 'helpers';
import {
  Colors, FontFamily, FontSizes, Spaces, shadow,
} from 'themes';
import { Loader } from 'ui';
import { StyleSheet, TouchableOpacity } from 'react-native';
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
  type?: 'label' | 'default' | 'secondary' | 'icon' | 'action' | 'border' | 'danger' | 'header' | 'secondary';
  reversed?: boolean;
  shadowed?: boolean;
  accent?: boolean;
}

const constructColor = (
  disabled?: boolean,
) => (disabled ? Colors.purple : Colors.white);

const constructBackgroundColor = (
  isLoading?: boolean,
  disabled?: boolean,
) => (isLoading || disabled ? Colors.primary_100 : Colors.purple);

const constructSecondaryBackgroundColor = (
  isLoading?: boolean,
  disabled?: boolean,
) => (isLoading || disabled ? Colors.primary_100 : Colors.pink);

const StyledButton = styled.TouchableOpacity<{isLoading?: boolean, disabled?: boolean, reversed?: boolean}>`
  background-color: ${({ isLoading, disabled }) => constructBackgroundColor(isLoading, disabled)};
  height: 48px;
  border-radius: 25px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const SecondaryButton = styled(StyledButton)<{isLoading?: boolean, disabled?: boolean, reversed?: boolean}>`
  background-color: ${({ isLoading, disabled }) => constructSecondaryBackgroundColor(isLoading, disabled)};
  height: 48px;
  border-radius: 25px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const StyledButtonText = styled.Text<{isLoading?: boolean, disabled?: boolean, reversed?: boolean}>`
  font-size: ${FontSizes.md}px;
  font-family: ${FontFamily.PoppinsSemiMedium};
  font-weight: 700;
  color: ${({ disabled }) => constructColor(disabled)};
`;

const SecondaryText = styled(StyledButtonText)<{isLoading?: boolean, disabled?: boolean, reversed?: boolean}>`
  color: ${Colors.basic_800};
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
  font-family: ${FontFamily.PoppinsMedium};
  margin: 0px 6px;
`;

const BorderStyledButton = styled(StyledButton)<{ reversed?: boolean }>`
  height: 48px;
  padding: 0px 10px;
  justify-content: center;
  align-items: center;
  border-radius: 25px;
  border: 2px solid ${Colors.purple};
  background-color: transparent;
`;

const IconButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
`;

const LabelButtonText = styled.Text<{ reversed?: boolean, accent?: boolean }>`
  font-size: ${FontSizes.sm}px;
  font-family: ${FontFamily.PoppinsMedium};
  font-weight: 700;
  color: ${({ reversed, accent }) => (reversed ? Colors.basic_100 : accent ? Colors.info_600 : Colors.primary_500)};
`;

const styles = StyleSheet.create({
  icon: {
    marginRight: Spaces.sm,
  },
});

export const Button: React.FC<ButtonProps> = ({
  type = 'default', title, isLoading, onPress, onLongPress, iconColor, reversed, disabled, iconName, accent,
}) => {
  if (type === 'label') {
    return (
      <TouchableOpacity {...touchableConfig} disabled={disabled} onPress={onPress}>
        <LabelButtonText reversed={reversed} accent={accent}>{title}</LabelButtonText>
      </TouchableOpacity>
    );
  }

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

  if (type === 'icon') {
    return (
      <IconButton {...touchableConfig} onPress={onPress}>
        {iconName && (
          <IconComponent
            name={iconName}
            size={24}
            color={iconColor || Colors.basic_100}
            style={styles.icon}
          />
        )}
      </IconButton>
    );
  }

  if (type === 'secondary') {
    return (
      <SecondaryButton
        {...touchableConfig}
        onPress={onPress}
        onLongPress={onLongPress}
        disabled={isLoading || disabled}
      >
        {isLoading ? (
          <Loader color={Colors.primary_500} />
        ) : (
          <>
            {iconName && !disabled && (
              <IconComponent
                name={iconName}
                size={24}
                color={iconColor || Colors.basic_100}
                style={styles.icon}
              />
            )}

            <SecondaryText isLoading={isLoading} disabled={disabled}>
              {title}
            </SecondaryText>
          </>
        )}
      </SecondaryButton>
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
        <Loader color={Colors.primary_500} />
      ) : (
        <>
          {iconName && !disabled && (
            <IconComponent
              name={iconName}
              size={24}
              color={iconColor || Colors.basic_100}
              style={styles.icon}
            />
          )}

          <StyledButtonText isLoading={isLoading} disabled={disabled}>
            {title}
          </StyledButtonText>
        </>
      )}
    </StyledButton>
  );
};
